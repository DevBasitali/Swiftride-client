import React, { useState, useEffect } from "react";
import TestContainer from "./TestContainer";

function TestimonialsSection() {
  const [stats, setStats] = useState({
    customers: 0,
    rating: 0,
    satisfaction: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("testimonials");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        customers: Math.floor(15000 * progress),
        rating: (4.9 * progress).toFixed(1),
        satisfaction: Math.floor(98 * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepTime);
  };

  return (
    <section 
      id="testimonials" 
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Main Header */}
        <div className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-100 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-blue-700">Customer Reviews</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trusted by Thousands of Happy Customers
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            RentRush is proud to be trusted by thousands of satisfied customers,
            ensuring quality and reliability in every rental.
          </p>

          {/* Stats Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 
            transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {stats.customers.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center items-center mb-2">
                <span className="text-4xl font-bold text-gray-800 mr-2">{stats.rating}</span>
                <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {stats.satisfaction}%
              </div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Testimonials Container */}
        <div className={`mt-12 transition-all duration-1000 delay-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <TestContainer />
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;