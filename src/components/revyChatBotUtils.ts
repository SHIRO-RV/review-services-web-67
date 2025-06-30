
/**
 * Utility functions and constants for RevyChatBot.
 */

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
      "about review ai"
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
      "contact info"
    ],
    a: "You can contact us via email at reviewrv25@gmail.com or WhatsApp/call at +91 8341105135. For a quick response, use our Contact form!",
  },
  {
    q: [
      "do you build ecommerce sites",
      "can you make an ecommerce website",
      "do you build online stores",
      "ecommerce solutions",
      "online store development"
    ],
    a: "Yes! We build robust and beautiful eCommerce websites with custom features, shopping carts, and payment gateways.",
  },
  {
    q: [
      "do you offer website redesign",
      "website redesign",
      "refresh my website",
      "can you improve my existing website",
      "modernize my website"
    ],
    a: "Absolutely! We modernize and redesign websites to boost results and provide a fresh digital experience.",
  },
  {
    q: [
      "how long does it take to build a website",
      "website timeline",
      "how fast is your delivery",
      "how long does a project take",
      "project duration",
      "development time"
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
      "ongoing support"
    ],
    a: "Yes, we provide ongoing support, updates, maintenance, and can help with hosting for your project after launch.",
  },
  {
    q: [
      "do you make mobile apps",
      "app development",
      "can you build an app",
      "do you do mobile development",
      "mobile app creation"
    ],
    a: "We offer mobile app development for both Android and iOS, along with cross-platform web apps tailored for your business.",
  },
  {
    q: [
      "pricing",
      "cost",
      "how much",
      "price",
      "budget",
      "quote"
    ],
    a: "We offer customized quotes based on your project needs. Get in touch for a free consultation and detailed pricing!",
  },
  {
    q: [
      "portfolio",
      "examples",
      "previous work",
      "case studies",
      "your work"
    ],
    a: "You can view our recent work and case studies in the Portfolio section on our website. We've helped businesses across various industries achieve their digital goals!",
  }
];

export function findAnswer(question: string): string | null {
  const normalized = question.toLowerCase().replace(/[^a-z0-9 ]/g, "");
  
  for (const item of FAQS) {
    for (const q of item.q) {
      if (normalized.includes(q)) {
        return item.a;
      }
    }
  }
  
  return null;
}

// Simple pattern-based AI responses (fallback when models don't work)
export function getSimpleAIResponse(question: string): string {
  const normalized = question.toLowerCase();
  
  // Greeting patterns
  if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("hey")) {
    return "Hello! I'm Revy, your AI assistant for ReView AI. How can I help you today?";
  }
  
  // Help patterns
  if (normalized.includes("help") || normalized.includes("what can you do")) {
    return "I can help you with questions about ReView AI's services, including web development, mobile apps, AI solutions, and consulting. What would you like to know?";
  }
  
  // Thank you patterns
  if (normalized.includes("thank") || normalized.includes("thanks")) {
    return "You're welcome! Is there anything else I can help you with regarding ReView AI's services?";
  }
  
  // Technology questions
  if (normalized.includes("technology") || normalized.includes("tech stack") || normalized.includes("technologies")) {
    return "We work with modern technologies including React, Node.js, Python, mobile development frameworks, and AI/ML tools to build cutting-edge solutions.";
  }
  
  // Generic business questions
  if (normalized.includes("why choose") || normalized.includes("why review ai")) {
    return "ReView AI combines technical expertise with creative design to deliver custom solutions that drive business growth. We focus on quality, innovation, and client satisfaction.";
  }
  
  // Process questions
  if (normalized.includes("process") || normalized.includes("how do you work")) {
    return "Our process involves understanding your needs, planning the solution, developing with regular updates, testing thoroughly, and providing ongoing support.";
  }
  
  return null; // Return null if no pattern matches
}

export async function getHuggingFaceResponse(question: string, conversationHistory: {role: string, content: string}[]): Promise<string> {
  try {
    console.log('Attempting to find answer for:', question);
    
    // First try FAQ
    const faqAnswer = findAnswer(question);
    if (faqAnswer) {
      console.log('Found FAQ answer');
      return faqAnswer;
    }
    
    // Then try simple pattern matching
    const simpleResponse = getSimpleAIResponse(question);
    if (simpleResponse) {
      console.log('Found simple AI response');
      return simpleResponse;
    }
    
    // If no patterns match, return null to trigger fallback
    console.log('No matching patterns found');
    return null;
    
  } catch (error) {
    console.error("AI processing error:", error);
    return null;
  }
}

export async function getPerplexityResponse(question: string, apiKey: string, conversationHistory: {role: string, content: string}[]): Promise<string> {
  try {
    // First check FAQ for immediate answers
    const faqAnswer = findAnswer(question);
    if (faqAnswer) {
      return faqAnswer;
    }

    const messagesForApi = [
      {
        role: 'system',
        content: "You are Revy, a helpful AI assistant for ReView AI, a web solutions agency. Be friendly, concise, and helpful. Focus on providing accurate information about web development, mobile apps, AI solutions, and digital services. If you don't know something specific about ReView AI, be honest about it. Keep responses under 100 words when possible."
      },
      ...conversationHistory,
      {
        role: 'user',
        content: question
      }
    ];

    const maxHistoryLength = 8;
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
        temperature: 0.3,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Perplexity API Error:", errorData);
      return null;
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Validate the response quality
    if (aiResponse && aiResponse.length > 20 && !aiResponse.toLowerCase().includes("i don't know")) {
      return aiResponse;
    }
    
    return null;
  } catch (error) {
    console.error("Failed to get response from Perplexity AI:", error);
    return null;
  }
}
