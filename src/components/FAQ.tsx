
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "How do I generate certificates in bulk?",
      answer: "Upload an Excel file with recipient names, then select your template and customize as needed. Our system will automatically generate a certificate for each person in your spreadsheet."
    },
    {
      question: "Can I create my own custom certificate design?",
      answer: "Yes! You can start with one of our templates and fully customize it, or create your own design from scratch using our intuitive editor."
    },
    {
      question: "What file formats can I export certificates in?",
      answer: "You can export certificates as PDF files individually or download them all at once in a ZIP archive."
    },
    {
      question: "Is my data secure when using this tool?",
      answer: "Absolutely. All processing happens directly in your browser. Your data never leaves your computer, ensuring complete privacy and security."
    },
    {
      question: "Can I add verification features to my certificates?",
      answer: "Yes, you can add QR codes to your certificates that link to verification pages, making your certificates more secure and verifiable."
    },
    {
      question: "How many certificates can I generate at once?",
      answer: "Our system can handle thousands of certificates at once, though very large batches may take a bit longer to process in your browser."
    }
  ];

  return (
    <section id="faq" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="faq-item">
              <AccordionTrigger className="text-white text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-white/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
