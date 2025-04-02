
import React from 'react';
import Header from '@/components/Header';
import CertificateWorkspace from '@/components/CertificateWorkspace';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Download, FileCheck, Shield, Users } from 'lucide-react';

const Index = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <Header />

            <main className="flex-1 container py-6 px-4">
                <div className="grid grid-cols-1 gap-8">
                    {/* Hero Section */}
                    <section className="py-12 md:py-20">
                        <div className="max-w-4xl mx-auto text-center">
                            <Badge variant="outline" className="mb-4 bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
                                <Crown className="w-3 h-3 mr-1" /> Professional Certificate Generator
                            </Badge>
                            
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 bg-clip-text text-transparent">
                                CertiProX – Premium Certification Platform
                            </h1>
                            
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                                The next-generation, AI-driven certificate creation platform.
                                No backend. No data storage. Your privacy is our priority.
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                    Start Creating <Download className="ml-2 h-4 w-4" />
                                </Button>
                                <Button size="lg" variant="outline" className="border-blue-300">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section className="py-10 bg-white dark:bg-blue-900/20 rounded-xl shadow-sm mb-8">
                        <div className="container px-4 mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-blue-800 dark:text-blue-300">
                                Why Choose CertiProX?
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-6 border border-blue-100 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                                    <Shield className="h-10 w-10 text-blue-600 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Secure & Private</h3>
                                    <p className="text-gray-600 dark:text-gray-300">All processing happens in your browser. No data is sent to servers.</p>
                                </div>
                                
                                <div className="p-6 border border-blue-100 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                                    <FileCheck className="h-10 w-10 text-blue-600 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Bulk Processing</h3>
                                    <p className="text-gray-600 dark:text-gray-300">Generate hundreds of personalized certificates in seconds.</p>
                                </div>
                                
                                <div className="p-6 border border-blue-100 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                                    <Users className="h-10 w-10 text-blue-600 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Team Collaboration</h3>
                                    <p className="text-gray-600 dark:text-gray-300">Share templates and work together on certificate projects.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <CertificateWorkspace />
                    
                    {/* Testimonials Section */}
                    <section className="py-10 bg-white dark:bg-blue-900/20 rounded-xl shadow-sm">
                        <div className="container px-4 mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-blue-800 dark:text-blue-300">
                                What Our Users Say
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 border border-blue-100 dark:border-blue-800 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                                            JS
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">John Smith</h4>
                                            <p className="text-sm text-gray-500">Education Director</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        "CertiProX saved us countless hours generating certificates for our online courses. 
                                        The AI-powered positioning is incredibly accurate!"
                                    </p>
                                </div>
                                
                                <div className="p-6 border border-blue-100 dark:border-blue-800 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                                            LM
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Lisa Martinez</h4>
                                            <p className="text-sm text-gray-500">HR Manager</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        "We use CertiProX for all our employee recognition certificates. 
                                        It's fast, professional, and the customization options are excellent."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <AIAssistant />

            <footer className="border-t border-blue-200 dark:border-blue-800 py-8 bg-white dark:bg-blue-950 text-center">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="text-left">
                            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">CertiProX</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                The ultimate platform for creating professional certificates with AI-powered precision.
                            </p>
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">Features</h3>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 mr-2 text-blue-500" /> Bulk Generation
                                </li>
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 mr-2 text-blue-500" /> Smart Positioning
                                </li>
                                <li className="flex items-center">
                                    <Check className="w-4 h-4 mr-2 text-blue-500" /> Template Library
                                </li>
                            </ul>
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">Contact</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Have questions? Reach out to our support team.
                            </p>
                            <Button variant="link" className="p-0 mt-2 text-blue-600 dark:text-blue-400">
                                Contact Support
                            </Button>
                        </div>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm pt-4 border-t border-blue-100 dark:border-blue-800">
                        Powered by AI · Premium Certificate Generator · Pure Magic
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Index;
