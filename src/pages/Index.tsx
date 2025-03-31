
import React from 'react';
import Header from '@/components/Header';
import CertificateWorkspace from '@/components/CertificateWorkspace';
import AIAssistant from '@/components/AIAssistant';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6 px-4">
        <div className="grid grid-cols-1 gap-6">
          <div className="cyberpunk-card bg-gradient-to-r from-cyberpunk-black/80 to-cyberpunk-black/90">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyberpunk-cyan via-white to-cyberpunk-purple bg-clip-text text-transparent">
              Cosmic Certificate Generator
            </h1>
            <p className="text-cyberpunk-cyan/70 max-w-3xl">
              The next-generation, hyper-intelligent, fully frontend-based, AI-driven certificate creation platform.
              No backend. No waiting. Just futuristic innovation.
            </p>
          </div>
          
          <CertificateWorkspace />
        </div>
      </main>
      
      <AIAssistant />
      
      <footer className="border-t border-cyberpunk-cyan/20 py-4 text-center text-cyberpunk-cyan/50 text-sm">
        <div className="container">
          Powered by AI · 100% Frontend · Pure Magic
        </div>
      </footer>
    </div>
  );
};

export default Index;
