import React, { useState, useRef } from "react";
import { MessageSquare } from "lucide-react";

const FAQS = [
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
    a: "ReView AI is a web solutions agency creating custom software, apps, AI-powered tools, UI/UX design, and consulting to help your business grow!"
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
    a: "You can contact us via email at reviewrv25@gmail.com or WhatsApp/call at +91 8341105135. For a quick response, use our Contact form!"
  },
  {
    q: [
      "do you build ecommerce sites",
      "can you make an ecommerce website",
      "do you build online stores",
      "ecommerce solutions",
    ],
    a: "Yes! We build robust and beautiful eCommerce websites with custom features, shopping carts, and payment gateways."
  },
  {
    q: [
      "do you offer website redesign",
      "website redesign",
      "refresh my website",
      "can you improve my existing website",
    ],
    a: "Absolutely! We modernize and redesign websites to boost results and provide a fresh digital experience."
  },
  {
    q: [
      "how long does it take to build a website",
      "website timeline",
      "how fast is your delivery",
      "how long does a project take",
    ],
    a: "Typical project timelines range from 2 to 6 weeks, depending on complexity. We'll always work closely to meet your deadlines."
  },
  {
    q: [
      "do you support after launch",
      "site maintenance",
      "do you provide maintenance",
      "support after launch",
      "do you offer hosting support",
    ],
    a: "Yes, we provide ongoing support, updates, maintenance, and can help with hosting for your project after launch."
  },
  {
    q: [
      "do you make mobile apps",
      "app development",
      "can you build an app",
      "do you do mobile development",
    ],
    a: "We offer mobile app development for both Android and iOS, along with cross-platform web apps tailored for your business."
  }
];

function findAnswer(question) {
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

const WHATSAPP_NUMBER = "918341105135";

const RevyChatBot = () => {
  const [open, setOpen] = useState(false);
  // Fix: Allow message "text" to be string or React.ReactNode (e.g. JSX)
  const [messages, setMessages] = useState<{ from: string; text: string | React.ReactNode; }[]>([
    {
      from: "bot",
      text: "Hi! I'm Revy 🤖. Ask me anything about our company, our services, or your web project!"
    }
  ]);
  const [input, setInput] = useState("");
  const [lastUserQuestion, setLastUserQuestion] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when a new message comes in
  React.useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Handle user input submission
  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setLastUserQuestion(trimmed);

    setMessages(prev => [
      ...prev,
      { from: "user", text: trimmed }
    ]);
    setInput("");

    setTimeout(() => {
      const answer = findAnswer(trimmed);
      if (answer) {
        setMessages(prev => [...prev, { from: "bot", text: answer }]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            from: "bot",
            text: (
              <>
                Sorry, I couldn't answer that.<br />
                <span>
                  <button
                    onClick={() => {
                      const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(trimmed)}`;
                      window.open(link, "_blank");
                    }}
                    className="mt-3 inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
                  >
                    Message on WhatsApp
                  </button>
                </span>
              </>
            )
          }
        ]);
      }
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl rounded-full w-16 h-16 flex items-center justify-center text-white text-3xl hover:scale-110 transition-all border-4 border-white"
        onClick={() => setOpen(v => !v)}
        aria-label="Open chat with Revy"
        style={{ boxShadow: "0 4px 24px rgba(110, 93, 185, 0.2)" }}
      >
        <MessageSquare size={36} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-80 max-w-[92vw] bg-white border border-blue-200 rounded-xl shadow-2xl flex flex-col animate-fade-in-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl">
            <span className="font-bold text-white text-lg flex items-center gap-2">
              <MessageSquare className="inline mr-1" size={22} /> Revy
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl px-2 focus:outline-none"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="flex-1 px-4 py-3 overflow-y-auto max-h-96" style={{ minHeight: 200 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-xl px-4 py-2 shadow
                    ${msg.from === "bot"
                    ? "bg-blue-50 text-gray-800"
                    : "bg-purple-600 text-white"}
                  `}
                  style={{ maxWidth: "85%" }}
                >
                  {/* Fix: Render string or ReactNode */}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-blue-100 bg-gray-50 rounded-b-xl flex gap-2"
            autoComplete="off"
          >
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              maxLength={300}
              autoFocus
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 focus:outline-none transition-all"
              disabled={!input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RevyChatBot;
