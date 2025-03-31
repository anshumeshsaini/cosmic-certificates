
import React from 'react';
import { Cpu, Globe, Heart } from 'lucide-react';

const Header = () => {
  return (
      <header className="border-b border-cyberpunk-cyan/20 bg-cyberpunk-black/90 backdrop-blur-md py-4 px-6">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 " />

            <h1 className="text-xl font-bold tracking-wider neon-text">CertiProX </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-sm text-cyberpunk-cyan/70">
              <Cpu className="w-4 h-4" />
              <span>AI Powered</span>
            </div>




          </div>
        </div>
      </header>
  );
};

export default Header;
