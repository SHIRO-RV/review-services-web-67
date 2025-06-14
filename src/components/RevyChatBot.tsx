import React, { useState, useRef } from "react";
import { MessageSquare } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { FAQS, findAnswer } from "./revyChatBotUtils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Added Avatar imports

const WHATSAPP_NUMBER = "918341105135";

const RevyChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string | React.ReactNode; }[]>([
    {
      from: "bot",
      text: "Hi! I'm Revy 🤖. Ask me anything about our company, our services, or your web project!"
    }
  ]);
  const [input, setInput] = useState("");
  const [lastUserQuestion, setLastUserQuestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null); // Changed from messagesEndRef to inputRef as messagesEndRef is already defined below
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
                  <WhatsAppButton
                    message={trimmed}
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
              <Avatar className="h-7 w-7 border-2 border-white/50">
                <AvatarImage src="/lovable-uploads/e386a7d6-7e49-4326-9a62-5226b96d6577.png" alt="Revy Chatbot" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              Revy
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
              ref={inputRef} // Changed from messagesEndRef to inputRef for consistency
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
