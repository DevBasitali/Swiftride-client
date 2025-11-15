import React, { useState, useEffect } from "react";
import Card from "./whyUsCard";

function Reason() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: "feature-001",
      title: "24/7 Customer Support",
      desc: "At RentRush, our dedicated customer support team is here to assist you with your car rental management round the clock.",
      img: "icon1",
      icon: "support",
      stats: "99.9% Satisfaction",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "feature-002",
      title: "Many Locations",
      desc: "Accessible rentals across various locations. Flexible Book and Return Locations nationwide.",
      img: "icon2",
      icon: "location",
      stats: "100+ Locations",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "feature-003",
      title: "Best Price Guaranteed",
      desc: "At RentRush, we offer the Best Price Guarantee. If you find a lower price elsewhere, we'll match it and give you an additional discount.",
      img: "icon3",
      icon: "price",
      stats: "Save up to 40%",
      color: "from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("why-choose");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const getIcon = (iconType) => {
    const icons = {
      support: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      location: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      price: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    return icons[iconType] || icons.support;
  };

  return (
    <section 
      id="why-choose" 
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-10 animate-float"
              style={{
                width: Math.random() * 4 + 'px',
                height: Math.random() * 4 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: (Math.random() * 10 + 10) + 's'
              }}
            />
          ))}
        </div>
      </div>

      {/* Optional: Keep your original background image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="/src/assets/choose/bg.png"
          className="w-full h-full object-cover"
          alt="Background"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white/90">Why RentRush?</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Why Choose
            </span>
            <span className="block mt-2 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              RentRush
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose RentRush for our unbeatable prices, extensive location options,
            and a commitment to exceptional customer service that sets us apart.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-gray-400">Daily Rentals</div>
            </div>
            <div className="text-center border-x border-gray-700">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15k+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-gray-400">Car Models</div>
            </div>
          </div>
        </div>

        {/* Main Content - Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Decorative Element */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              {/* Car Image or Illustration */}
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Your Journey Awaits</h3>
                  <p className="text-gray-300">Premium cars, unbeatable service</p>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-50 blur-xl"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="space-y-6">
            {features.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-700 transform ${
                  isVisible 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150 + 500}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative group ${
                  hoveredCard === index ? 'scale-105' : ''
                } transition-transform duration-300`}>
                  {/* Card Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                  
                  {/* Card Content */}
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      {/* Icon Container */}
                      <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {getIcon(item.icon)}
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {item.title}
                          </h3>
                          <span className="text-xs px-3 py-1 bg-white/20 rounded-full text-white font-medium">
                            {item.stats}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {item.desc}
                        </p>
                        
                        {/* Learn More Link */}
                        <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group">
                          <span>Learn More</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Index Number - Decorative */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              View All Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reason;