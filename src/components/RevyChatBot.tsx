
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, SendHorizontal } from "lucide-react"; // Added SendHorizontal, kept MessageSquare in case it's needed elsewhere (though not in this version)
import WhatsAppButton from "./WhatsAppButton";
import { findAnswer } from "./revyChatBotUtils"; // Removed FAQS as it's not directly used here
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations

const WHATSAPP_NUMBER = "918341105135";
const REVY_LOGO_URL = "/lovable-uploads/e386a7d6-7e49-4326-9a62-5226b96d6577.png";

const RevyChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string | React.ReactNode; }[]>([
    {
      from: "bot",
      text: "Hi! I'm Revy 🤖. Ask me anything about our company, our services, or your web project!"
    }
  ]);
  const [input, setInput] = useState("");
  // const [lastUserQuestion, setLastUserQuestion] = useState(""); // This state wasn't used, removing it
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showAskRevyTooltip, setShowAskRevyTooltip] = useState(false);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    let tooltipTimeoutId: NodeJS.Timeout | undefined;
    let intervalId: NodeJS.Timeout | undefined;

    if (!open) {
      // Initial display after a short delay to avoid immediate pop-up on load
      tooltipTimeoutId = setTimeout(() => {
        setShowAskRevyTooltip(true);
        tooltipTimeoutId = setTimeout(() => setShowAskRevyTooltip(false), 3000); // Show for 3s
      }, 2000); // Show initial tooltip after 2 seconds


      intervalId = setInterval(() => {
        setShowAskRevyTooltip(true);
        tooltipTimeoutId = setTimeout(() => setShowAskRevyTooltip(false), 3000); // Show for 3s
      }, 8000 + 3000); // Every 8s (plus 3s display time to ensure 8s gap)
    } else {
      setShowAskRevyTooltip(false); // Hide if chat opens
      if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [open]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // setLastUserQuestion(trimmed); // This was for the unused state

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
                  <WhatsAppButton
                    message={trimmed} // Passing the original user question
                    number={WHATSAPP_NUMBER}
                  />
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
        aria-label={open ? "Close chat with Revy" : "Open chat with Revy"}
        style={{ boxShadow: "0 4px 24px rgba(110, 93, 185, 0.2)" }}
      >
        {/* <MessageSquare size={36} /> */}
        <img src={REVY_LOGO_URL} alt="Revy Chat Icon" className="w-10 h-10 rounded-full object-cover" />
      </button>

      {/* "Ask Revy" Tooltip */}
      <AnimatePresence>
        {showAskRevyTooltip && !open && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.3 }}
            className="fixed z-40 bottom-9 right-24 bg-white text-sm text-slate-800 px-3 py-2 rounded-lg shadow-xl border border-slate-200 whitespace-nowrap font-medium"
          >
            Ask Revy 🤖
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-80 max-w-[92vw] bg-white border border-blue-200 rounded-xl shadow-2xl flex flex-col animate-fade-in-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl">
            <span className="font-bold text-white text-lg flex items-center gap-2">
              <Avatar className="h-7 w-7 border-2 border-white/50">
                <AvatarImage src={REVY_LOGO_URL} alt="Revy Chatbot" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              Revy
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl px-2 focus:outline-none hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="flex-1 px-4 py-3 overflow-y-auto max-h-96" style={{ minHeight: 200 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex items-end ${msg.from === "user" ? "justify-end" : "justify-start gap-2"}`}
              >
                {msg.from === "bot" && (
                  <Avatar className="h-8 w-8 border border-blue-100 self-end flex-shrink-0">
                    <AvatarImage src={REVY_LOGO_URL} alt="Revy" />
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-xl px-4 py-2 shadow-sm
                    ${msg.from === "bot"
                    ? "bg-blue-50 text-gray-800"
                    : "bg-purple-600 text-white"}
                  `}
                  style={{ maxWidth: msg.from === 'bot' ? 'calc(100% - 2.75rem)' : '85%'}} // 2rem avatar + 0.5rem gap + 0.25rem buffer
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-blue-100 bg-gray-50 rounded-b-xl flex items-center gap-2"
            autoComplete="off"
          >
            <input
              ref={inputRef}
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none transition-all flex items-center justify-center aspect-square"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <SendHorizontal size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RevyChatBot;
