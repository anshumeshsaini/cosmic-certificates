
import React from 'react';
import { Award, Download, FileText, Key, Lock, Upload, Users, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <FileText className="w-10 h-10 text-blue-400 mb-4" />,
      title: "Custom Templates",
      description: "Access a wide range of professionally designed certificate templates for any occasion."
    },
    {
      icon: <Users className="w-10 h-10 text-blue-400 mb-4" />,
      title: "Bulk Generation",
      description: "Generate thousands of certificates at once using Excel spreadsheets."
    },
    {
      icon: <Award className="w-10 h-10 text-blue-400 mb-4" />,
      title: "Professional Design",
      description: "Create stunning certificates with our easy-to-use design tools."
    },
    {
      icon: <Zap className="w-10 h-10 text-blue-400 mb-4" />,
      title: "AI-Powered",
      description: "Leverage AI to create and customize certificates faster than ever."
    },
    {
      icon: <Download className="w-10 h-10 text-blue-400 mb-4" />,
      title: "Easy Export",
      description: "Export your certificates as PDFs or download them in bulk as a ZIP file."
    },
    {
      icon: <Lock className="w-10 h-10 text-blue-400 mb-4" />,
      title: "Secure",
      description: "All your data is processed securely in your browser. Nothing is sent to servers."
    },
    {
      icon: <Upload className="w-10 h-10 text-blue-400 mb-4" />,
      title: "Cloud Storage",
      description: "Save your templates and access them from anywhere."
    },
    {
      icon: <Key className="w-10 h-10 text-blue-400 mb-4" />,
      title: "Verification",
      description: "Add QR codes for certificate verification and authenticity checks."
    }
  ];

  return (
    <section id="features" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Powerful Features
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="pro-card text-center">
              <div className="flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
