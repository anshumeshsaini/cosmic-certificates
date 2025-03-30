
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Type, Download, Cpu, Upload as UploadIcon } from 'lucide-react';
import { toast } from 'sonner';

const CertificateWorkspace = () => {
  const [certificateImage, setCertificateImage] = useState<string | null>(null);
  const [textElements, setTextElements] = useState<Array<{id: string, text: string, x: number, y: number}>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCertificateImage(event.target?.result as string);
      toast.success('Certificate template uploaded!');
      
      // Simulate AI analysis
      simulateAIAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const simulateAIAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulating AI processing delay
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Add suggested text elements
      setTextElements([
        { id: 'name', text: 'RECIPIENT NAME', x: 50, y: 40 },
        { id: 'course', text: 'COURSE TITLE', x: 50, y: 55 },
        { id: 'date', text: 'ISSUE DATE', x: 50, y: 70 }
      ]);
      
      toast.success('AI analysis complete! Detected optimal text placement areas');
    }, 2000);
  };

  const handleAddText = () => {
    const newElement = {
      id: `text-${Date.now()}`,
      text: 'New Text',
      x: 50,
      y: 50
    };
    
    setTextElements([...textElements, newElement]);
    toast.success('Text element added');
  };

  const handleTextDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const id = e.dataTransfer.getData('text/plain');
    const element = textElements.find(el => el.id === id);
    
    if (!element || !workspaceRef.current) return;
    
    // Calculate position relative to workspace
    const rect = workspaceRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTextElements(textElements.map(el => 
      el.id === id ? { ...el, x, y } : el
    ));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const generateCertificates = () => {
    toast.success('Generating certificates...');
    // In a real app, this would handle the actual certificate generation
    setTimeout(() => {
      toast.success('Certificate generated successfully!');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="grid md:grid-cols-5 gap-6 flex-1">
        {/* Main workspace */}
        <div className="md:col-span-4 cyberpunk-card flex flex-col h-full min-h-[60vh]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-cyberpunk-cyan">Workspace</h2>
            <div className="flex gap-2">
              <button onClick={handleAddText} className="cyberpunk-button text-sm flex items-center gap-1">
                <Type className="w-4 h-4" />
                <span>Add Text</span>
              </button>
              <button onClick={triggerFileInput} className="cyberpunk-button text-sm flex items-center gap-1">
                <ImageIcon className="w-4 h-4" />
                <span>Template</span>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>
          
          <div 
            ref={workspaceRef}
            className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 to-cyberpunk-black border border-cyberpunk-blue/20 rounded-lg overflow-hidden relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {isAnalyzing && (
              <div className="absolute inset-0 flex items-center justify-center bg-cyberpunk-black/80 z-10">
                <div className="text-center">
                  <Cpu className="w-12 h-12 text-cyberpunk-cyan mx-auto animate-spin" />
                  <p className="text-cyberpunk-cyan mt-4 animate-pulse">AI Analyzing Certificate...</p>
                </div>
              </div>
            )}
            
            {certificateImage ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={certificateImage} 
                  alt="Certificate template" 
                  className="max-w-full max-h-full object-contain"
                />
                
                {textElements.map((element) => (
                  <div 
                    key={element.id}
                    className="absolute cursor-move bg-cyberpunk-black/40 backdrop-blur-sm border border-cyberpunk-cyan px-3 py-1 rounded text-white font-medium"
                    style={{ 
                      left: `${element.x}%`, 
                      top: `${element.y}%`, 
                      transform: 'translate(-50%, -50%)'
                    }}
                    draggable
                    onDragStart={(e) => handleTextDragStart(e, element.id)}
                  >
                    {element.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6">
                <Upload className="w-20 h-20 text-cyberpunk-cyan/40 mx-auto mb-4" />
                <p className="text-cyberpunk-cyan/60 text-lg">Upload a certificate template to begin</p>
                <p className="text-cyberpunk-cyan/40 text-sm mt-2">AI will automatically detect text placement areas</p>
                <button onClick={triggerFileInput} className="cyberpunk-button mt-4">
                  Upload Template
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar controls */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="cyberpunk-card">
            <h3 className="text-lg font-semibold text-cyberpunk-cyan mb-4">Data Upload</h3>
            <div className="border border-dashed border-cyberpunk-blue/40 rounded-lg p-4 text-center">
              <UploadIcon className="w-10 h-10 text-cyberpunk-cyan/40 mx-auto mb-2" />
              <p className="text-sm text-cyberpunk-cyan/60 mb-2">Upload Excel or CSV</p>
              <button className="cyberpunk-button text-sm w-full">
                Select File
              </button>
            </div>
          </div>
          
          <div className="cyberpunk-card">
            <h3 className="text-lg font-semibold text-cyberpunk-cyan mb-4">Export Options</h3>
            <div className="space-y-2">
              <button className="cyberpunk-button w-full text-sm justify-center flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Export as PNG</span>
              </button>
              <button className="cyberpunk-button w-full text-sm justify-center">PDF</button>
              <button className="cyberpunk-button w-full text-sm justify-center">Bulk Generate</button>
            </div>
          </div>
          
          <div className="cyberpunk-card mt-auto">
            <button 
              className="w-full bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-cyan text-white font-bold py-3 rounded-md hover:shadow-[0_0_15px_rgba(0,255,200,0.7)] transition-all"
              onClick={generateCertificates}
            >
              Generate Certificates
            </button>
            <p className="text-center text-cyberpunk-cyan/40 text-xs mt-2">AI optimized generation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateWorkspace;
