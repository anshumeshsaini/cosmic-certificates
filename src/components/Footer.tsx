
import React from 'react';
import { Award, Facebook, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cyberpunk-black border-t border-blue-400/20 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold tracking-wider text-white">PROFESSIONAL CERTIFICATES</h3>
            </div>
            <p className="text-white/70 mb-4">
              Create professional certificates with our powerful and easy-to-use certificate generator.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Templates</a></li>
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li>
                <a href="mailto:support@professionalcertificates.com" className="text-white/70 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-400/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Professional Certificates. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/50 text-sm hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 text-sm hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 text-sm hover:text-blue-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
