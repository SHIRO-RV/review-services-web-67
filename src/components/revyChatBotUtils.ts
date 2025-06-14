
/**
 * Utility functions and constants for RevyChatBot.
 */

import { pipeline } from '@huggingface/transformers';

export const FAQS = [
  {
    q: [
      "what does review ai do",
      "what do you do",
      "what services do you offer",
      "who are you",
      "tell me about your company",
      "about your company",
      "who is review ai",
      "what are your main services",
      "company info",
    ],
    a: "ReView AI is a web solutions agency creating custom software, apps, AI-powered tools, UI/UX design, and consulting to help your business grow!",
  },
  {
    q: [
      "how can i contact you",
      "contact details",
      "how to get in touch",
      "email",
      "phone number",
      "how do i reach you",
    ],
    a: "You can contact us via email at reviewrv25@gmail.com or WhatsApp/call at +91 8341105135. For a quick response, use our Contact form!",
  },
  {
    q: [
      "do you build ecommerce sites",
      "can you make an ecommerce website",
      "do you build online stores",
      "ecommerce solutions",
    ],
    a: "Yes! We build robust and beautiful eCommerce websites with custom features, shopping carts, and payment gateways.",
  },
  {
    q: [
      "do you offer website redesign",
      "website redesign",
      "refresh my website",
      "can you improve my existing website",
    ],
    a: "Absolutely! We modernize and redesign websites to boost results and provide a fresh digital experience.",
  },
  {
    q: [
      "how long does it take to build a website",
      "website timeline",
      "how fast is your delivery",
      "how long does a project take",
    ],
    a: "Typical project timelines range from 2 to 6 weeks, depending on complexity. We'll always work closely to meet your deadlines.",
  },
  {
    q: [
      "do you support after launch",
      "site maintenance",
      "do you provide maintenance",
      "support after launch",
      "do you offer hosting support",
    ],
    a: "Yes, we provide ongoing support, updates, maintenance, and can help with hosting for your project after launch.",
  },
  {
    q: [
      "do you make mobile apps",
      "app development",
      "can you build an app",
      "do you do mobile development",
    ],
    a: "We offer mobile app development for both Android and iOS, along with cross-platform web apps tailored for your business.",
  }
];

export function findAnswer(question: string): string | null {
  const normalized = question.toLowerCase().replace(/[^a-z0-9 ]/g, "");
  for (const item of FAQS) {
    for (const q of item.q) {
      if (normalized.includes(q)) return item.a;
    }
  }
  // Try keyword match (very basic)
  if (normalized.includes("price") || normalized.includes("cost")) {
    return "We offer customized quotes based on your project needs. Get in touch for a free consultation!";
  }
  if (normalized.includes("portfolio") || normalized.includes("examples")) {
    return "You can view our recent work in the Portfolio section on the website!";
  }
  return null;
}

// Initialize the text generation pipeline (cached after first load)
let textGenerator: any = null;

export async function getHuggingFaceResponse(question: string, conversationHistory: {role: string, content: string}[]): Promise<string> {
  try {
    console.log('Initializing Hugging Face AI model...');
    
    // Initialize the model if not already done
    if (!textGenerator) {
      textGenerator = await pipeline(
        'text-generation',
        'microsoft/DialoGPT-small',
        { 
          device: 'cpu',
          dtype: 'fp32'
        }
      );
    }

    // Create context from conversation history
    const context = conversationHistory
      .slice(-6) // Keep last 6 messages for context
      .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    // Create a prompt with ReView AI context
    const prompt = `You are Revy, a helpful AI assistant for ReView AI, a web solutions agency that creates custom software, apps, AI-powered tools, UI/UX design, and consulting services. Be friendly, concise, and helpful.

Context: ${context}
Human: ${question}
Assistant:`;

    const response = await textGenerator(prompt, {
      max_new_tokens: 100,
      temperature: 0.7,
      do_sample: true,
      pad_token_id: 50256
    });

    // Extract the generated text
    let generatedText = response[0].generated_text;
    
    // Clean up the response to get just the assistant's reply
    const assistantIndex = generatedText.lastIndexOf('Assistant:');
    if (assistantIndex !== -1) {
      generatedText = generatedText.substring(assistantIndex + 10).trim();
    }

    // Remove any remaining conversation artifacts
    generatedText = generatedText.split('\n')[0].trim();
    
    // Ensure it's not empty and makes sense
    if (!generatedText || generatedText.length < 10) {
      return "I'm here to help with any questions about ReView AI's services! Feel free to ask about our web development, app creation, or AI solutions.";
    }

    return generatedText;
  } catch (error) {
    console.error("Failed to get response from Hugging Face AI:", error);
    return "I'm currently loading my AI capabilities. In the meantime, I can help with frequently asked questions about ReView AI!";
  }
}

export async function getPerplexityResponse(question: string, apiKey: string, conversationHistory: {role: string, content: string}[]): Promise<string> {
  try {
    const messagesForApi = [
      {
        role: 'system',
        content: "You are Revy, a helpful AI assistant for ReView AI, a web solutions agency. Be friendly, concise, and helpful. If you don't know an answer, say so politely. Do not make up information about ReView AI's specific projects or internal details unless it's in the FAQS or general knowledge you are programmed with."
      },
      ...conversationHistory,
      {
        role: 'user',
        content: question
      }
    ];

    const maxHistoryLength = 10;
    if (messagesForApi.length > maxHistoryLength) {
        messagesForApi.splice(1, messagesForApi.length - maxHistoryLength);
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: messagesForApi,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Perplexity API Error:", errorData);
      throw new Error(`Perplexity API Error: ${response.status} ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Failed to get response from Perplexity AI:", error);
    if (error instanceof Error && error.message.includes("401")) {
        return "It seems there's an issue with your Perplexity API key. Please check it and try again.";
    }
    return "Sorry, I encountered an issue trying to connect to the AI. Please try again later.";
  }
}
