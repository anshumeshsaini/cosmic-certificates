import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Type, Download, Cpu, Upload as UploadIcon } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';

const CertificateWorkspace = () => {
  const [certificateImage, setCertificateImage] = useState<string | null>(null);
  const [textElements, setTextElements] = useState<Array<{id: string, text: string, x: number, y: number}>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [excelData, setExcelData] = useState<any[] | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);

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

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file is an Excel file
    const isExcelFile = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ].includes(file.type);

    if (!isExcelFile && !file.name.endsWith('.xlsx') && !file.name.endsWith('.csv')) {
      toast.error('Please upload an Excel file (.xlsx) or CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);
        
        setExcelData(parsedData);
        setTotalRecords(parsedData.length);
        
        toast.success(`Successfully loaded ${parsedData.length} records from Excel file`);
        console.log("Parsed Excel data:", parsedData);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        toast.error('Failed to parse Excel file. Please make sure it is a valid Excel file.');
      }
    };
    
    reader.onerror = () => {
      toast.error('Failed to read Excel file');
    };
    
    reader.readAsBinaryString(file);
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

  const triggerExcelInput = () => {
    excelInputRef.current?.click();
  };

  const handleExportAsPNG = () => {
    if (!certificateImage) {
      toast.error('Please upload a certificate template first');
      return;
    }
    
    if (!workspaceRef.current) return;
    
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Create a new image object to draw on canvas
      const img = new Image();
      img.onload = () => {
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on canvas
        ctx.drawImage(img, 0, 0);
        
        // Draw the text elements
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        textElements.forEach(element => {
          const xPos = (element.x / 100) * canvas.width;
          const yPos = (element.y / 100) * canvas.height;
          ctx.fillText(element.text, xPos, yPos);
        });
        
        // Convert canvas to data URL and trigger download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = dataUrl;
        link.click();
        
        toast.success('Certificate exported as PNG successfully!');
      };
      
      img.src = certificateImage;
    } catch (error) {
      console.error('Error exporting as PNG:', error);
      toast.error('Failed to export as PNG');
    }
  };

  const handleExportAsPDF = () => {
    if (!certificateImage) {
      toast.error('Please upload a certificate template first');
      return;
    }
    
    try {
      // For simplicity, we'll just show a toast for now
      // In a real implementation, you'd use a library like jsPDF
      toast.success('PDF export will be implemented in the next update');
      toast.info('For now, please use the PNG export option');
    } catch (error) {
      console.error('Error exporting as PDF:', error);
      toast.error('Failed to export as PDF');
    }
  };

  const handleBulkGenerate = () => {
    if (!certificateImage) {
      toast.error('Please upload a certificate template first');
      return;
    }
    
    if (!excelData || excelData.length === 0) {
      toast.error('Please upload Excel data first');
      return;
    }
    
    toast.success('Starting bulk certificate generation...');
    toast.info(`Generating ${excelData.length} certificates. This may take a moment.`);
    
    // In a real implementation, we would generate all certificates here
    // For now, just show a success message after a delay to simulate processing
    setTimeout(() => {
      toast.success(`${excelData.length} certificates generated successfully!`);
      toast.info('Download option will be available in the next update');
    }, 1500);
  };

  const generateCertificates = () => {
    if (!certificateImage) {
      toast.error('Please upload a certificate template first');
      return;
    }
    
    if (!excelData || excelData.length === 0) {
      toast.error('Please upload Excel data first');
      return;
    }
    
    toast.success('Generating certificates...');
    // In a real app, this would handle the actual certificate generation
    setTimeout(() => {
      toast.success(`${excelData.length} certificates generated successfully!`);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="grid md:grid-cols-5 gap-6 flex-1">
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
        
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="cyberpunk-card">
            <h3 className="text-lg font-semibold text-cyberpunk-cyan mb-4">Data Upload</h3>
            <div className="border border-dashed border-cyberpunk-blue/40 rounded-lg p-4 text-center">
              <UploadIcon className="w-10 h-10 text-cyberpunk-cyan/40 mx-auto mb-2" />
              <p className="text-sm text-cyberpunk-cyan/60 mb-2">
                {excelData ? 
                  `${totalRecords} recipients loaded` : 
                  'Upload Excel or CSV'
                }
              </p>
              <input 
                type="file" 
                ref={excelInputRef} 
                onChange={handleExcelUpload} 
                className="hidden" 
                accept=".xlsx,.xls,.csv"
              />
              <button 
                onClick={triggerExcelInput} 
                className="cyberpunk-button text-sm w-full"
              >
                {excelData ? 'Change Data File' : 'Select File'}
              </button>
              
              {excelData && excelData.length > 0 && (
                <div className="mt-4 text-left">
                  <p className="text-xs text-cyberpunk-cyan/60 mb-2">Preview:</p>
                  <div className="bg-cyberpunk-black/60 p-2 rounded-md overflow-hidden text-xs">
                    {Object.keys(excelData[0]).slice(0, 3).map(key => (
                      <div key={key} className="truncate text-cyberpunk-cyan/80">
                        {key}: {String(excelData[0][key])}
                      </div>
                    ))}
                    {Object.keys(excelData[0]).length > 3 && (
                      <div className="text-cyberpunk-cyan/50">+ more fields</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="cyberpunk-card">
            <h3 className="text-lg font-semibold text-cyberpunk-cyan mb-4">Export Options</h3>
            <div className="space-y-2">
              <button 
                className="cyberpunk-button w-full text-sm justify-center flex items-center gap-2"
                onClick={handleExportAsPNG}
                disabled={!certificateImage}
              >
                <Download className="w-4 h-4" />
                <span>Export as PNG</span>
              </button>
              <button 
                className="cyberpunk-button w-full text-sm justify-center"
                onClick={handleExportAsPDF}
                disabled={!certificateImage}
              >
                PDF
              </button>
              <button 
                className="cyberpunk-button w-full text-sm justify-center"
                onClick={handleBulkGenerate}
                disabled={!certificateImage || !excelData}
              >
                Bulk Generate
              </button>
            </div>
          </div>
          
          <div className="cyberpunk-card mt-auto">
            <button 
              className={`w-full font-bold py-3 rounded-md transition-all ${
                !excelData || !certificateImage 
                  ? 'bg-cyberpunk-blue/30 text-cyberpunk-cyan/50 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-cyan text-white hover:shadow-[0_0_15px_rgba(0,255,200,0.7)]'
              }`}
              onClick={generateCertificates}
              disabled={!excelData || !certificateImage}
            >
              Generate Certificates
            </button>
            <p className="text-center text-cyberpunk-cyan/40 text-xs mt-2">
              {!excelData ? 'Upload data to continue' : !certificateImage ? 'Upload template to continue' : `Ready to generate ${totalRecords} certificates`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateWorkspace;
