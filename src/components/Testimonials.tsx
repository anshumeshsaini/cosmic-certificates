
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "Global Enterprises",
      comment: "This certificate generator has transformed how we recognize employee achievements. The bulk generation feature saves us hours every month.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      name: "Michael Chen",
      role: "Event Coordinator",
      company: "Tech Conference",
      comment: "We needed to create 500 certificates for our conference attendees, and this tool made it incredibly simple. The professional templates impressed everyone.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Emma Rodriguez",
      role: "Training Manager",
      company: "Education First",
      comment: "The customization options are incredible. We can match our certificates perfectly to our brand guidelines. Highly recommended!",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "David Wilson",
      role: "University Professor",
      company: "Westlake University",
      comment: "I use this to generate certificates for my students after course completion. The ability to import spreadsheets is a game changer for large classes.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Lisa Thompson",
      role: "Conference Organizer",
      company: "Tech Summit",
      comment: "The QR code feature adds a professional touch to our certificates. Attendees can verify their participation easily, which adds credibility.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
      name: "Robert Davis",
      role: "CEO",
      company: "Startup Accelerator",
      comment: "We've tried several certificate tools, but this one offers the best balance of ease of use and professional output. Worth every penny.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/12.jpg"
    }
  ];

  // Calculate how many testimonials to show per page based on screen size
  const getTestimonialsPerPage = () => {
    // For mobile, we'll show 1, tablet 2, desktop 3
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return 3;
  };

  const testimonialsPerPage = getTestimonialsPerPage();
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  
  const visibleTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage, 
    (currentPage + 1) * testimonialsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-cyberpunk-black to-blue-900/20 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            What Our Customers Say
          </span>
        </h2>
        
        <div className="relative">
          {/* Navigation buttons for larger screens */}
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-cyberpunk-black/50 border-blue-400/30 hover:bg-blue-500/20 -ml-4"
              onClick={goToPrevPage}
            >
              <ChevronLeft className="h-5 w-5 text-blue-400" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-cyberpunk-black/50 border-blue-400/30 hover:bg-blue-500/20 -mr-4"
              onClick={goToNextPage}
            >
              <ChevronRight className="h-5 w-5 text-blue-400" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card relative overflow-hidden transition-all duration-300 transform hover:scale-102 hover:shadow-[0_0_15px_rgba(30,144,255,0.3)]"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-blue-400/30">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-white/70 text-sm">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
              </div>
            ))}
          </div>
          
          {/* Mobile pagination indicators and controls */}
          <div className="flex justify-center items-center mt-8 md:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              className="mr-4 bg-cyberpunk-black/50 border-blue-400/30 hover:bg-blue-500/20"
              onClick={goToPrevPage}
            >
              <ChevronLeft className="h-5 w-5 text-blue-400" />
            </Button>
            
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === currentPage 
                      ? 'bg-blue-500' 
                      : 'bg-blue-500/30'
                  }`}
                  onClick={() => setCurrentPage(i)}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="ml-4 bg-cyberpunk-black/50 border-blue-400/30 hover:bg-blue-500/20"
              onClick={goToNextPage}
            >
              <ChevronRight className="h-5 w-5 text-blue-400" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
