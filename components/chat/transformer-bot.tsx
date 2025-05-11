"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function TransformerBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "bot" | "user" }[]>([
    { text: "Hello! I'm your Transformer assistant. How can I help you today?", sender: "bot" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isMounted) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isMounted])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: inputValue, sender: "user" }])

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "I'm here to assist with your portfolio needs!",
        "Would you like to know more about the Transformers theme?",
        "You can customize this portfolio with your own content.",
        "Feel free to ask about any section of the portfolio.",
        "The Transformers universe is vast and exciting!",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { text: randomResponse, sender: "bot" }])
    }, 1000)

    setInputValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Bot toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
        style={{ boxShadow: "0 0 15px rgba(239,68,68,0.5)" }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-black border border-red-500/30 rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-red-500 p-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 relative mr-2">
                  <Image src="/images/autobot-logo.png" alt="Transformer Bot" fill className="object-contain" />
                </div>
                <h3 className="text-white font-orbitron">Transformer Bot</h3>
              </div>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>

            {/* Chat body */}
            {!isMinimized && (
              <>
                <div className="h-64 overflow-y-auto p-3 bg-gray-900">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-red-500 text-white"
                            : "bg-gray-800 border border-red-500/30 text-gray-200"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat input */}
                <div className="p-3 border-t border-gray-800 bg-gray-900">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-red-500 text-white rounded-r-md px-3 py-2 hover:bg-red-600 transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
