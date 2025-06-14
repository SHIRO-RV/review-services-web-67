
import React from "react";

interface WhatsAppButtonProps {
  message: string;
  number: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ message, number }) => (
  <button
    onClick={() => {
      const link = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      window.open(link, "_blank");
    }}
    className="mt-3 inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
  >
    Message on WhatsApp
  </button>
);

export default WhatsAppButton;
