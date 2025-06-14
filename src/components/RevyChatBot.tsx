import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, Settings, MessageSquare } from "lucide-react"; // Added Settings
import WhatsAppButton from "./WhatsAppButton";
import { findAnswer, getPerplexityResponse } from "./revyChatBotUtils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Added Button
import { Input } from "@/components/ui/input"; // Added Input
import { toast } from "sonner"; // Added toast
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "918341105135";
const REVY_LOGO_URL = "/lovable-uploads/e386a7d6-7e49-4326-9a62-5226b96d6577.png"; // Using the uploaded image

interface Message {
  from: "user" | "bot";
  text: string | React.ReactNode;
  type?: "typing" | "error"; // Added type for special messages
}

const RevyChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi! I'm Revy 🤖. Ask me anything about our company, our services, or your web project! For advanced AI answers, please provide a Perplexity API key via the settings icon in the header."
    }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showAskRevyTooltip, setShowAskRevyTooltip] = useState(false);

  const [perplexityApiKey, setPerplexityApiKey] = useState<string | null>(null);
  const [tempApiKey, setTempApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("perplexityApiKey");
    if (storedApiKey) {
      setPerplexityApiKey(storedApiKey);
      setTempApiKey(storedApiKey); // Pre-fill input if key exists
    }
  }, []);

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


  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem("perplexityApiKey", tempApiKey.trim());
      setPerplexityApiKey(tempApiKey.trim());
      setShowApiKeyInput(false);
      toast.success("Perplexity API Key saved!");
      setMessages(prev => [...prev, {from: "bot", text: "API Key saved. I can now use advanced AI!"}]);
    } else {
      localStorage.removeItem("perplexityApiKey");
      setPerplexityApiKey(null);
      toast.info("Perplexity API Key removed.");
       setMessages(prev => [...prev, {from: "bot", text: "API Key removed. My AI capabilities are now limited to FAQs."}]);
    }
  };
  
  const getConversationHistory = (): {role: string, content: string}[] => {
    return messages
      .filter(msg => typeof msg.text === 'string' && msg.type !== 'typing' && msg.type !== 'error') // Filter out non-string messages and special types
      .map(msg => ({
        role: msg.from === 'user' ? 'user' : 'assistant',
        content: msg.text as string, // We've filtered to ensure text is string
      }));
  };


  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages(prev => [...prev, { from: "user", text: trimmedInput }]);
    setInput("");
    setIsAiThinking(true);
    setMessages(prev => [...prev, { from: "bot", text: "Revy is thinking...", type: "typing" }]);

    let botResponse: string | React.ReactNode | null = null;
    const conversationHistory = getConversationHistory();

    if (perplexityApiKey) {
      botResponse = await getPerplexityResponse(trimmedInput, perplexityApiKey, conversationHistory.slice(0, -1)); // Exclude the current user message from history for this call as it's passed as 'question'
    }
    
    // Remove "thinking" message
    setMessages(prev => prev.filter(msg => msg.type !== "typing"));
    setIsAiThinking(false);

    if (botResponse && !botResponse.startsWith("Sorry, I encountered an issue") && !botResponse.startsWith("It seems there's an issue with your Perplexity API key")) {
      setMessages(prev => [...prev, { from: "bot", text: botResponse }]);
    } else {
      if (botResponse && (botResponse.startsWith("Sorry, I encountered an issue") || botResponse.startsWith("It seems there's an issue with your Perplexity API key"))) {
         setMessages(prev => [...prev, { from: "bot", text: botResponse, type: "error" }]);
      }
      // Fallback to FAQ
      const faqAnswer = findAnswer(trimmedInput);
      if (faqAnswer) {
        setMessages(prev => [...prev, { from: "bot", text: faqAnswer }]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            from: "bot",
            text: (
              <>
                Sorry, I couldn't answer that based on my current knowledge or FAQs.
                <br />
                <span>
                  <WhatsAppButton
                    message={trimmedInput}
                    number={WHATSAPP_NUMBER}
                  />
                </span>
              </>
            ),
            type: "error",
          }
        ]);
      }
    }
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
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setShowApiKeyInput(prev => !prev)}
                    className="text-white hover:text-gray-200 transition-colors"
                    aria-label="API Key Settings"
                >
                    <Settings size={20} />
                </button>
                <button
                onClick={() => setOpen(false)}
                className="text-white text-xl px-1 focus:outline-none hover:text-gray-200 transition-colors"
                aria-label="Close chat"
                >
                ×
                </button>
            </div>
          </div>

          {showApiKeyInput && (
            <div className="p-3 border-b border-blue-100 bg-gray-50">
              <label htmlFor="perplexityApiKey" className="block text-sm font-medium text-gray-700 mb-1">
                Perplexity API Key
              </label>
              <div className="flex gap-2">
                <Input
                  type="password" // Use password type to obscure key
                  id="perplexityApiKey"
                  placeholder="Enter your API key"
                  value={tempApiKey}
                  onChange={e => setTempApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSaveApiKey} size="sm">Save</Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Get your key from Perplexity Labs. Stored in local browser storage.
              </p>
            </div>
          )}

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
                    ? (msg.type === "error" ? "bg-red-100 text-red-700" : "bg-blue-50 text-gray-800")
                    : "bg-purple-600 text-white"}
                  `}
                  style={{ maxWidth: msg.from === 'bot' ? 'calc(100% - 2.75rem)' : '85%'}}
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
              disabled={isAiThinking} // Disable input while AI is thinking
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none transition-all flex items-center justify-center aspect-square"
              disabled={!input.trim() || isAiThinking} // Disable button while AI is thinking
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
