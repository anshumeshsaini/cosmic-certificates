
import React from 'react';
import Header from '@/components/Header';
import CertificateWorkspace from '@/components/CertificateWorkspace';
import AIAssistant from '@/components/AIAssistant';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { ArrowRight, Check } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Professional Certificate Generation
                  </span>
                  <br />
                  <span className="text-white">Made Simple</span>
                </h1>
                
                <p className="text-white/80 text-lg mb-8 max-w-lg">
                  Create stunning certificates in minutes with our powerful, AI-driven platform. 
                  Perfect for businesses, schools, and organizations of all sizes.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Create certificates in bulk from Excel spreadsheets",
                    "Choose from professional templates or design your own",
                    "Download as individual PDFs or ZIP archives",
                    "100% secure, browser-based processing"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3 bg-blue-500/20 rounded-full p-1">
                        <Check className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="cyberpunk-button flex items-center justify-center gap-2">
                    <span>Start Creating</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="cyberpunk-button flex items-center justify-center gap-2 bg-transparent hover:bg-blue-500/20">
                    <span>View Templates</span>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-blue-400/20 to-blue-500/20 rounded-lg blur-xl opacity-70"></div>
                <div className="relative bg-cyberpunk-black/80 backdrop-blur-sm p-8 rounded-lg border border-blue-400/30">
                  <h2 className="text-2xl font-bold mb-6 text-white">Try the Certificate Generator</h2>
                  <CertificateWorkspace />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <Features />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* FAQ Section */}
        <FAQ />
        
        {/* CTA Section */}
        <section className="py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-blue-600/20 z-0"></div>
          <div className="container mx-auto relative z-10">
            <div className="cyberpunk-card max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Create Professional Certificates?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses and organizations that trust our platform for their certificate needs.
              </p>
              <button className="cyberpunk-button mx-auto">
                Get Started Now
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <AIAssistant />
      <Footer />
    </div>
  );
};

export default Index;
