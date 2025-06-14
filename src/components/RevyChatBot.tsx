
import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, Settings, MessageSquare, Sparkles } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { findAnswer, getHuggingFaceResponse, getPerplexityResponse } from "./revyChatBotUtils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "918341105135";
const REVY_LOGO_URL = "/lovable-uploads/e386a7d6-7e49-4326-9a62-5226b96d6577.png";

interface Message {
  from: "user" | "bot";
  text: string | React.ReactNode;
  type?: "typing" | "error" | "ai-powered" | "fallback";
}

const RevyChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi! I'm Revy 🤖. I'm here to help you with questions about ReView AI's services. Ask me anything!",
      type: "ai-powered"
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
  const [aiMode, setAiMode] = useState<'simple' | 'perplexity'>('simple');

  useEffect(() => {
    const storedApiKey = localStorage.getItem("perplexityApiKey");
    if (storedApiKey) {
      setPerplexityApiKey(storedApiKey);
      setTempApiKey(storedApiKey);
      setAiMode('perplexity');
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
      tooltipTimeoutId = setTimeout(() => {
        setShowAskRevyTooltip(true);
        tooltipTimeoutId = setTimeout(() => setShowAskRevyTooltip(false), 3000);
      }, 2000);

      intervalId = setInterval(() => {
        setShowAskRevyTooltip(true);
        tooltipTimeoutId = setTimeout(() => setShowAskRevyTooltip(false), 3000);
      }, 8000 + 3000);
    } else {
      setShowAskRevyTooltip(false);
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
      setAiMode('perplexity');
      setShowApiKeyInput(false);
      toast.success("Perplexity API Key saved! Now using Perplexity AI.");
      setMessages(prev => [...prev, {from: "bot", text: "API Key saved. I'm now using Perplexity AI for enhanced responses!", type: "ai-powered"}]);
    } else {
      localStorage.removeItem("perplexityApiKey");
      setPerplexityApiKey(null);
      setAiMode('simple');
      toast.info("Switched to simple AI mode.");
      setMessages(prev => [...prev, {from: "bot", text: "Switched to simple AI mode. I'm still here to help!", type: "ai-powered"}]);
    }
  };
  
  const getConversationHistory = (): {role: string, content: string}[] => {
    return messages
      .filter(msg => typeof msg.text === 'string' && msg.type !== 'typing' && msg.type !== 'error')
      .map(msg => ({
        role: msg.from === 'user' ? 'user' : 'assistant',
        content: msg.text as string,
      }));
  };

  const isUnsupportedQuery = (question: string): boolean => {
    const normalized = question.toLowerCase();
    
    // Complex technical questions that need human expertise
    const complexPatterns = [
      "how to code",
      "write code for",
      "programming help",
      "debug my code",
      "sql query",
      "database design",
      "algorithm",
      "technical documentation",
      "system architecture",
      "api integration",
      "complex calculation",
      "mathematical formula"
    ];
    
    // Very specific business requests
    const specificBusinessPatterns = [
      "exact pricing",
      "detailed proposal",
      "contract terms",
      "legal advice",
      "specific timeline for my project",
      "custom quote",
      "project estimation"
    ];
    
    return complexPatterns.some(pattern => normalized.includes(pattern)) ||
           specificBusinessPatterns.some(pattern => normalized.includes(pattern));
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages(prev => [...prev, { from: "user", text: trimmedInput }]);
    setInput("");
    setIsAiThinking(true);
    setMessages(prev => [...prev, { 
      from: "bot", 
      text: aiMode === 'simple' ? "🤔 Let me think about that..." : "🤖 Revy is thinking...", 
      type: "typing" 
    }]);

    let botResponse: string | null = null;
    const conversationHistory = getConversationHistory();

    // Check if this is an unsupported query first
    if (isUnsupportedQuery(trimmedInput)) {
      setMessages(prev => prev.filter(msg => msg.type !== "typing"));
      setIsAiThinking(false);
      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: (
            <>
              This looks like a complex question that would be better handled by our expert team! They can provide detailed, personalized assistance.
              <br />
              <span>
                <WhatsAppButton
                  message={`Hi! I have a question: ${trimmedInput}`}
                  number={WHATSAPP_NUMBER}
                />
              </span>
            </>
          ),
          type: "fallback",
        }
      ]);
      return;
    }

    // Try AI response
    if (aiMode === 'perplexity' && perplexityApiKey) {
      botResponse = await getPerplexityResponse(trimmedInput, perplexityApiKey, conversationHistory.slice(0, -1)); 
    } else {
      botResponse = await getHuggingFaceResponse(trimmedInput, conversationHistory.slice(0, -1));
    }
    
    setMessages(prev => prev.filter(msg => msg.type !== "typing"));
    setIsAiThinking(false);

    // Check if AI response indicates an error or inability to help
    if (typeof botResponse === 'string' && 
        (botResponse.includes("having trouble") || 
         botResponse.includes("connect you with our team") ||
         botResponse.includes("API key") ||
         botResponse.length < 20)) {
      
      // Show fallback with WhatsApp option
      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: (
            <>
              I'm not able to provide a good answer for that right now. Our team can help you better with detailed questions!
              <br />
              <span>
                <WhatsAppButton
                  message={`Hi! I need help with: ${trimmedInput}`}
                  number={WHATSAPP_NUMBER}
                />
              </span>
            </>
          ),
          type: "fallback",
        }
      ]);
    } else {
      // Show successful AI response
      setMessages(prev => [...prev, { from: "bot", text: botResponse, type: "ai-powered" }]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 shadow-2xl rounded-full w-16 h-16 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 border-4 border-white/20 hover:border-white/40"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close chat with Revy" : "Open chat with Revy"}
        style={{ 
          boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)" 
        }}
      >
        <div className="relative">
          <img src={REVY_LOGO_URL} alt="Revy Chat Icon" className="w-10 h-10 rounded-full object-cover" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      </button>

      {/* "Ask Revy" Tooltip */}
      <AnimatePresence>
        {showAskRevyTooltip && !open && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.3 }}
            className="fixed z-40 bottom-9 right-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-2 rounded-lg shadow-xl border border-white/20 whitespace-nowrap font-medium"
          >
            Ask Revy 🧠✨
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-80 max-w-[92vw] bg-white border border-blue-200 rounded-xl shadow-2xl flex flex-col animate-fade-in-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 rounded-t-xl">
            <span className="font-bold text-white text-lg flex items-center gap-2">
              <Avatar className="h-7 w-7 border-2 border-white/50">
                <AvatarImage src={REVY_LOGO_URL} alt="Revy Chatbot" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>Revy</span>
                <span className="text-xs opacity-80 flex items-center gap-1">
                  <Sparkles size={10} />
                  {aiMode === 'simple' ? 'Simple AI' : 'Perplexity AI'}
                </span>
              </div>
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
            <div className="p-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <label htmlFor="perplexityApiKey" className="block text-sm font-medium text-gray-700 mb-1">
                Perplexity API Key (Optional)
              </label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  id="perplexityApiKey"
                  placeholder="Enter your API key"
                  value={tempApiKey}
                  onChange={e => setTempApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSaveApiKey} size="sm">Save</Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use simple AI. Add key for enhanced Perplexity AI.
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
                  className={`rounded-xl px-4 py-2 shadow-sm relative
                    ${msg.from === "bot"
                    ? (msg.type === "error" 
                        ? "bg-red-100 text-red-700" 
                        : msg.type === "ai-powered"
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 border border-blue-200"
                        : msg.type === "fallback"
                        ? "bg-gradient-to-r from-orange-50 to-yellow-50 text-gray-800 border border-orange-200"
                        : "bg-blue-50 text-gray-800")
                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"}
                  `}
                  style={{ maxWidth: msg.from === 'bot' ? 'calc(100% - 2.75rem)' : '85%'}}
                >
                  {(msg.type === "ai-powered" || msg.type === "fallback") && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Sparkles size={8} className="text-white" />
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-blue-100 bg-gradient-to-r from-gray-50 to-blue-50 rounded-b-xl flex items-center gap-2"
            autoComplete="off"
          >
            <input
              ref={inputRef}
              type="text"
              className="flex-1 px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              maxLength={300}
              autoFocus
              disabled={isAiThinking}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none transition-all flex items-center justify-center aspect-square shadow-lg hover:shadow-xl disabled:opacity-50"
              disabled={!input.trim() || isAiThinking}
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
