
import React, { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', text: string}>>([
    { type: 'ai', text: 'Hello! I am your AI assistant. How can I help you with certificate generation today?' }
  ]);
  const isMobile = useIsMobile();

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { type: 'user', text: message }]);
    
    // Simulate AI thinking
    toast.info('AI processing your request...');
    
    // Clear input field
    setMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let response = "I'll help you with that! ";
      
      if (message.toLowerCase().includes('template')) {
        response += "You can upload a template by clicking the 'Template' button in the workspace. I'll automatically analyze it for optimal text placement.";
      } else if (message.toLowerCase().includes('excel') || message.toLowerCase().includes('csv')) {
        response += "You can upload your data file in the sidebar. I support Excel, CSV, and Google Sheets formats. I'll automatically map the columns for you.";
      } else if (message.toLowerCase().includes('export') || message.toLowerCase().includes('download')) {
        response += "You can export your certificates in various formats including PNG, PDF, and JPEG. For bulk generation, I'll create a zip file with all certificates.";
      } else {
        response += "For best results, upload a certificate template first, then add your data file, position your text elements, and click 'Generate Certificates'.";
      }
      
      setChatHistory(prev => [...prev, { type: 'ai', text: response }]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={toggleAssistant}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 z-30 ${
          isOpen 
            ? 'bg-cyberpunk-purple text-white rotate-90 transform'
            : 'bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-cyan text-white animate-pulse-glow'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
      
      {/* Chat interface */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-72 sm:w-80 md:w-96 rounded-lg cyberpunk-card shadow-2xl z-30 flex flex-col max-h-[70vh]">
          <div className="bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-white" />
              <h3 className="text-white font-medium">AI Assistant</h3>
            </div>
            <div className="text-xs text-white/70 bg-black/20 px-2 py-0.5 rounded-full">Beta</div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 max-h-[50vh] space-y-4">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-lg ${
                    chat.type === 'user'
                      ? 'bg-cyberpunk-blue/20 text-white'
                      : 'bg-cyberpunk-purple/20 text-white'
                  }`}
                >
                  {chat.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              className="flex-1 bg-cyberpunk-black/60 border border-cyberpunk-cyan/30 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyberpunk-cyan/50 text-sm"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-cyberpunk-cyan p-2 rounded text-cyberpunk-black hover:bg-cyberpunk-cyan/90 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
