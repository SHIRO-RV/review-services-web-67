
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
