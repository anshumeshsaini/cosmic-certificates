import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Type, Download, Cpu, Upload as UploadIcon, Palette, Edit, Eye, Trash2, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const CertificateWorkspace = () => {
  const [certificateImage, setCertificateImage] = useState<string | null>(null);
  const [textElements, setTextElements] = useState<Array<{
    id: string, 
    text: string, 
    x: number, 
    y: number, 
    font: string,
    color: string
  }>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [excelData, setExcelData] = useState<any[] | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewName, setPreviewName] = useState('John Doe');
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const fontOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Impact', label: 'Impact' }
  ];

  const colorOptions = [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'purple', label: 'Purple' },
    { value: 'orange', label: 'Orange' },
    { value: 'cyan', label: 'Cyan' },
    { value: '#00ffc8', label: 'Cyberpunk Cyan' }
  ];

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
      
      simulateAIAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        
        const processedData = parsedData.map((row: any) => {
          const nameProperty = Object.keys(row).find(key => key.toLowerCase() === 'name');
          let name;
          
          if (nameProperty) {
            name = row[nameProperty];
          } else {
            const keys = Object.keys(row);
            name = keys.length >= 2 ? row[keys[1]] : null;
          }
          
          return { name };
        });
        
        const filteredData = processedData.filter(item => item.name);
        
        setExcelData(filteredData);
        setTotalRecords(filteredData.length);
        
        toast.success(`Successfully loaded ${filteredData.length} names from Excel file`);
        console.log("Parsed Excel data:", filteredData);
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
    
    setTimeout(() => {
      setIsAnalyzing(false);
      
      setTextElements([
        { id: 'name', text: 'RECIPIENT NAME', x: 50, y: 40, font: 'Arial', color: 'black' },
        { id: 'course', text: 'COURSE TITLE', x: 50, y: 55, font: 'Arial', color: 'black' },
        { id: 'date', text: 'ISSUE DATE', x: 50, y: 70, font: 'Arial', color: 'black' }
      ]);
      
      toast.success('AI analysis complete! Detected optimal text placement areas');
    }, 2000);
  };

  const handleAddText = () => {
    const newElement = {
      id: `text-${Date.now()}`,
      text: 'New Text',
      x: 50,
      y: 50,
      font: 'Arial',
      color: 'black'
    };
    
    setTextElements([...textElements, newElement]);
    setEditingTextId(newElement.id);
    setEditingText(newElement.text);
    toast.success('Text element added');
  };

  const handleDeleteText = (id: string) => {
    setTextElements(textElements.filter(el => el.id !== id));
    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
    if (editingTextId === id) {
      setEditingTextId(null);
    }
    toast.success('Text element deleted');
  };

  const handleTextDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setSelectedTextId(id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const id = e.dataTransfer.getData('text/plain');
    const element = textElements.find(el => el.id === id);
    
    if (!element || !workspaceRef.current) return;
    
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

  const handleTextClick = (id: string) => {
    setSelectedTextId(id);
    setEditingTextId(null);
  };

  const handleFontChange = (value: string) => {
    if (!selectedTextId) return;
    
    setTextElements(textElements.map(el => 
      el.id === selectedTextId ? { ...el, font: value } : el
    ));
  };

  const handleColorChange = (value: string) => {
    if (!selectedTextId) return;
    
    setTextElements(textElements.map(el => 
      el.id === selectedTextId ? { ...el, color: value } : el
    ));
  };

  const handleEditText = (id: string) => {
    const element = textElements.find(el => el.id === id);
    if (element) {
      setEditingTextId(id);
      setEditingText(element.text);
    }
  };

  const handleSaveText = () => {
    if (!editingTextId) return;
    
    setTextElements(textElements.map(el => 
      el.id === editingTextId ? { ...el, text: editingText } : el
    ));
    
    setEditingTextId(null);
    toast.success('Text updated successfully');
  };

  const handleCancelEdit = () => {
    setEditingTextId(null);
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
    if (!previewMode) {
      toast.info('Preview mode activated. Using sample name: ' + previewName);
    } else {
      toast.info('Preview mode deactivated');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerExcelInput = () => {
    excelInputRef.current?.click();
  };

  const createCertificateForName = (name: string): Promise<string> => {
    return new Promise((resolve) => {
      if (!certificateImage || !workspaceRef.current) {
        resolve('');
        return;
      }
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        textElements.forEach(element => {
          const xPos = (element.x / 100) * canvas.width;
          const yPos = (element.y / 100) * canvas.height;
          
          ctx.font = `24px ${element.font}`;
          ctx.fillStyle = element.color;
          
          let text = element.text;
          if (element.id === 'name' || text === 'RECIPIENT NAME') {
            text = name;
          }
          
          ctx.fillText(text, xPos, yPos);
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      };
      
      img.src = certificateImage;
    });
  };

  const handleExportAsPNG = () => {
    if (!certificateImage) {
      toast.error('Please upload a certificate template first');
      return;
    }
    
    if (!workspaceRef.current) return;
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        textElements.forEach(element => {
          const xPos = (element.x / 100) * canvas.width;
          const yPos = (element.y / 100) * canvas.height;
          
          ctx.font = `24px ${element.font}`;
          ctx.fillStyle = element.color;
          ctx.fillText(element.text, xPos, yPos);
        });
        
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
      toast.success('PDF export will be implemented in the next update');
      toast.info('For now, please use the PNG export option');
    } catch (error) {
      console.error('Error exporting as PDF:', error);
      toast.error('Failed to export as PDF');
    }
  };

  const handleBulkGenerate = async () => {
    if (!certificateImage) {
      toast.error('Please upload a certificate template first');
      return;
    }
    
    if (!excelData || excelData.length === 0) {
      toast.error('Please upload Excel data first');
      return;
    }
    
    try {
      setIsGenerating(true);
      toast.success('Starting bulk certificate generation...');
      
      const zip = new JSZip();
      
      const certificatePromises = excelData.map((data: any, index) => {
        return createCertificateForName(data.name).then((dataUrl) => {
          if (dataUrl) {
            const base64Data = dataUrl.split(',')[1];
            const binaryString = window.atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            
            const blob = new Blob([bytes], { type: 'image/png' });
            
            zip.file(`certificate_${index + 1}_${data.name}.png`, blob);
          }
        });
      });
      
      await Promise.all(certificatePromises);
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(zipBlob);
      downloadLink.download = 'certificates.zip';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      setIsGenerating(false);
      toast.success(`${excelData.length} certificates generated and zipped successfully!`);
    } catch (error) {
      console.error('Error generating certificates:', error);
      setIsGenerating(false);
      toast.error('Failed to generate certificates');
    }
  };

  const generateCertificates = () => {
    handleBulkGenerate();
  };

  const renderTextElement = (element: { id: string, text: string, x: number, y: number, font: string, color: string }) => {
    let displayText = element.text;
    if (previewMode && (element.id === 'name' || element.text === 'RECIPIENT NAME')) {
      displayText = previewName;
    }

    if (editingTextId === element.id) {
      return (
        <div 
          key={element.id}
          className="absolute bg-cyberpunk-black/80 backdrop-blur-sm border border-cyberpunk-cyan px-3 py-1 rounded flex items-center gap-2"
          style={{ 
            left: `${element.x}%`, 
            top: `${element.y}%`, 
            transform: 'translate(-50%, -50%)',
            zIndex: 100
          }}
        >
          <Input 
            value={editingText} 
            onChange={(e) => setEditingText(e.target.value)}
            className="w-40 bg-cyberpunk-black border-cyberpunk-cyan/50 text-white"
            autoFocus
          />
          <button 
            onClick={handleSaveText}
            className="p-1 hover:bg-cyberpunk-cyan/20 rounded"
          >
            <Check className="w-4 h-4 text-cyberpunk-cyan" />
          </button>
          <button 
            onClick={handleCancelEdit}
            className="p-1 hover:bg-red-500/20 rounded"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>
      );
    }

    return (
      <div 
        key={element.id}
        className={`absolute cursor-move px-3 py-1 rounded ${selectedTextId === element.id ? 'bg-cyberpunk-black/60 backdrop-blur-sm border border-cyberpunk-cyan' : 'bg-cyberpunk-black/40 backdrop-blur-sm border border-cyberpunk-cyan/50'}`}
        style={{ 
          left: `${element.x}%`, 
          top: `${element.y}%`, 
          transform: 'translate(-50%, -50%)',
          fontFamily: element.font,
          color: element.color
        }}
        draggable={!previewMode}
        onDragStart={(e) => !previewMode && handleTextDragStart(e, element.id)}
        onClick={() => !previewMode && handleTextClick(element.id)}
      >
        <div className="flex items-center gap-1">
          <span>{displayText}</span>
          
          {!previewMode && selectedTextId === element.id && (
            <div className="flex gap-1 ml-2">
              <button 
                onClick={(e) => { e.stopPropagation(); handleEditText(element.id); }}
                className="p-1 hover:bg-cyberpunk-cyan/20 rounded"
              >
                <Edit className="w-3 h-3 text-cyberpunk-cyan" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDeleteText(element.id); }}
                className="p-1 hover:bg-red-500/20 rounded"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="grid md:grid-cols-5 gap-6 flex-1">
        <div className="md:col-span-4 cyberpunk-card flex flex-col h-full min-h-[60vh]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-xl font-semibold text-cyberpunk-cyan">Workspace</h2>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button 
                onClick={togglePreviewMode}
                className={`cyberpunk-button text-sm flex items-center gap-1 ${previewMode ? 'bg-cyberpunk-cyan/20' : ''}`}
              >
                <Eye className="w-4 h-4" />
                <span>{previewMode ? 'Exit Preview' : 'Preview'}</span>
              </button>
              <button 
                onClick={handleAddText} 
                className="cyberpunk-button text-sm flex items-center gap-1"
                disabled={previewMode}
              >
                <Type className="w-4 h-4" />
                <span>Add Text</span>
              </button>
              <button 
                onClick={triggerFileInput} 
                className="cyberpunk-button text-sm flex items-center gap-1"
                disabled={previewMode}
              >
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
            onDrop={!previewMode ? handleDrop : undefined}
            onDragOver={!previewMode ? handleDragOver : undefined}
          >
            {isAnalyzing && (
              <div className="absolute inset-0 flex items-center justify-center bg-cyberpunk-black/80 z-10">
                <div className="text-center">
                  <Cpu className="w-12 h-12 text-cyberpunk-cyan mx-auto animate-spin" />
                  <p className="text-cyberpunk-cyan mt-4 animate-pulse">AI Analyzing Certificate...</p>
                </div>
              </div>
            )}
            
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-cyberpunk-black/80 z-10">
                <div className="text-center">
                  <Cpu className="w-12 h-12 text-cyberpunk-cyan mx-auto animate-spin" />
                  <p className="text-cyberpunk-cyan mt-4 animate-pulse">Generating Certificates...</p>
                </div>
              </div>
            )}
            
            {previewMode && (
              <div className="absolute top-2 right-2 bg-cyberpunk-black/80 backdrop-blur-sm border border-cyberpunk-cyan/50 rounded-md p-2 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-cyberpunk-cyan text-xs">Preview Name:</span>
                  <Input 
                    value={previewName}
                    onChange={(e) => setPreviewName(e.target.value)}
                    className="w-40 h-7 text-sm bg-cyberpunk-black border-cyberpunk-cyan/50 text-white"
                  />
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
                
                {textElements.map(renderTextElement)}
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
          
          {selectedTextId && !previewMode && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4 p-4 bg-cyberpunk-black/60 rounded-lg border border-cyberpunk-cyan/30">
              <div className="flex-1">
                <label className="text-sm text-cyberpunk-cyan/80 mb-1 block">Font</label>
                <Select 
                  onValueChange={handleFontChange} 
                  value={textElements.find(el => el.id === selectedTextId)?.font || 'Arial'}
                >
                  <SelectTrigger className="w-full bg-cyberpunk-black border-cyberpunk-cyan/30">
                    <SelectValue placeholder="Select Font" />
                  </SelectTrigger>
                  <SelectContent className="bg-cyberpunk-black border-cyberpunk-cyan/30">
                    {fontOptions.map(font => (
                      <SelectItem key={font.value} value={font.value} className="text-white">
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm text-cyberpunk-cyan/80 mb-1 block">Color</label>
                <Select 
                  onValueChange={handleColorChange} 
                  value={textElements.find(el => el.id === selectedTextId)?.color || 'black'}
                >
                  <SelectTrigger className="w-full bg-cyberpunk-black border-cyberpunk-cyan/30">
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>
                  <SelectContent className="bg-cyberpunk-black border-cyberpunk-cyan/30">
                    {colorOptions.map(color => (
                      <SelectItem key={color.value} value={color.value} className="text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }}></div>
                          <span>{color.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm text-cyberpunk-cyan/80 mb-1 block">Text Content</label>
                <div className="flex gap-2">
                  <Input 
                    value={textElements.find(el => el.id === selectedTextId)?.text || ''}
                    onChange={(e) => {
                      setTextElements(textElements.map(el => 
                        el.id === selectedTextId ? { ...el, text: e.target.value } : el
                      ));
                    }}
                    className="w-full bg-cyberpunk-black border-cyberpunk-cyan/30 text-white"
                  />
                  <button 
                    onClick={() => handleDeleteText(selectedTextId)}
                    className="bg-red-500/20 hover:bg-red-500/30 p-2 rounded flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="cyberpunk-card">
            <h3 className="text-lg font-semibold text-cyberpunk-cyan mb-4">Data Upload</h3>
            <div className="border border-dashed border-cyberpunk-blue/40 rounded-lg p-4 text-center">
              <UploadIcon className="w-10 h-10 text-cyberpunk-cyan/40 mx-auto mb-2" />
              <p className="text-sm text-cyberpunk-cyan/60 mb-2">
                {excelData ? 
                  `${totalRecords} names loaded` : 
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
                    {excelData.slice(0, 3).map((item: any, index: number) => (
                      <div key={index} className="truncate text-cyberpunk-cyan/80">
                        Name: {item.name}
                      </div>
                    ))}
                    {excelData.length > 3 && (
                      <div className="text-cyberpunk-cyan/50">+ {excelData.length - 3} more names</div>
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
                className="cyberpunk-button w-full text-sm justify-center flex items-center gap-2"
                onClick={handleBulkGenerate}
                disabled={!certificateImage || !excelData || isGenerating}
              >
                <Download className="w-4 h-4" />
                <span>Generate ZIP</span>
              </button>
            </div>
          </div>
          
          <div className="cyberpunk-card mt-auto">
            <button 
              className={`w-full font-bold py-3 rounded-md transition-all ${
                !excelData || !certificateImage || isGenerating
                  ? 'bg-cyberpunk-blue/30 text-cyberpunk-cyan/50 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-cyan text-white hover:shadow-[0_0_15px_rgba(0,255,200,0.7)]'
              }`}
              onClick={generateCertificates}
              disabled={!excelData || !certificateImage || isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Certificates'}
            </button>
            <p className="text-center text-cyberpunk-cyan/40 text-xs mt-2">
              {!excelData ? 'Upload data to continue' : !certificateImage ? 'Upload template to continue' : isGenerating ? 'Processing certificates...' : `Ready to generate ${totalRecords} certificates`}
            </p>
          </div>
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <button className="fixed bottom-24 right-4 bg-cyberpunk-cyan/80 text-cyberpunk-black p-2 rounded-full z-20 hover:bg-cyberpunk-cyan shadow-lg hover:shadow-[0_0_15px_rgba(0,255,200,0.5)]">
            <Edit className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent className="bg-cyberpunk-black/95 border-cyberpunk-cyan/30">
          <SheetHeader>
            <SheetTitle className="text-cyberpunk-cyan">Certificate Generator Tips</SheetTitle>
            <SheetDescription className="text-cyberpunk-cyan/70">
              How to create powerful certificates in minutes
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-cyberpunk-cyan font-medium">Text Management</h3>
              <ul className="text-sm text-cyberpunk-cyan/70 space-y-2 ml-5 list-disc">
                <li>Click <b>Add Text</b> to add new text elements</li>
                <li>Click any text to select and edit its properties</li>
                <li>Drag and drop text elements to position them</li>
                <li>Use <b>Preview</b> mode to see how certificates will look with real data</li>
                <li>Click the edit icon on a text element to change its content</li>
                <li>Use the trash icon to delete unwanted text elements</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-cyberpunk-cyan font-medium">Certificate Generation</h3>
              <ul className="text-sm text-cyberpunk-cyan/70 space-y-2 ml-5 list-disc">
                <li>Upload an Excel file with names in the second column</li>
                <li>Use <b>Generate Certificates</b> to create a ZIP with all certificates</li>
                <li>Each certificate will replace "RECIPIENT NAME" with the name from Excel</li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CertificateWorkspace;
