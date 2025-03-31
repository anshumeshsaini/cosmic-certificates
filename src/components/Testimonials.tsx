
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "Global Enterprises",
      comment: "This certificate generator has transformed how we recognize employee achievements. The bulk generation feature saves us hours every month.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Event Coordinator",
      company: "Tech Conference",
      comment: "We needed to create 500 certificates for our conference attendees, and this tool made it incredibly simple. The professional templates impressed everyone.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Training Manager",
      company: "Education First",
      comment: "The customization options are incredible. We can match our certificates perfectly to our brand guidelines. Highly recommended!",
      rating: 4
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-cyberpunk-black to-blue-900/20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            What Our Customers Say
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-400" />
                ))}
              </div>
              <p className="text-white/80 mb-4 italic">"{testimonial.comment}"</p>
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-white/70 text-sm">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
