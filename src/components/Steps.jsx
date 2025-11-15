import React, { useState, useEffect } from "react";

function Steps() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: 1,
      title: "Choose Location",
      description: "Enable car rentals across various locations",
      details: "Flexible Book and Return Locations",
      icon: "gps",
      emoji: "📍",
      color: "from-blue-500 to-cyan-500",
      features: ["100+ Locations", "24/7 Availability", "GPS Tracking"],
      time: "2 min"
    },
    {
      id: 2,
      title: "Pick-up Date",
      description: "Any time, Anywhere, Pick your Date and Enjoy your Trip",
      details: "Select your pick-up date for your rental car",
      icon: "celender",
      emoji: "📅",
      color: "from-purple-500 to-pink-500",
      features: ["Flexible Timing", "Instant Booking", "Date Change Option"],
      time: "1 min"
    },
    {
      id: 3,
      title: "Book your car",
      description: "Offer updated car information and models",
      details: "Allow users to choose their preferred car models",
      icon: "caricon",
      emoji: "🚗",
      color: "from-orange-500 to-red-500",
      features: ["50+ Models", "Real-time Availability", "Best Price"],
      time: "3 min"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateSteps();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("howitwork");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const animateSteps = () => {
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, step.id]);
      }, (index + 1) * 500);
    });
  };

  return (
    <section 
      id="howitwork" 
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        {/* Original Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/how it works.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-float"
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.3 + 0.1,
                animationDelay: Math.random() * 5 + 's',
                animationDuration: (Math.random() * 10 + 15) + 's'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-white">Simple 3-Step Process</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get on the road in just 3 simple steps with our streamlined car rental process
          </p>

          {/* Total Time Estimate */}
          <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            <span className="text-white font-medium">Total time: ~6 minutes</span>
          </div>
        </div>

        {/* Progress Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white/10 transform -translate-y-1/2 z-0">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 transition-all duration-2000 ease-out"
            style={{ 
              width: `${(completedSteps.length / steps.length) * 100}%`,
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
            }}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative transition-all duration-700 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200 + 300}ms` }}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Connection Line for Mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent"></div>
              )}

              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                  completedSteps.includes(step.id) ? 'animate-bounce' : ''
                }`}>
                  {completedSteps.includes(step.id) ? '✓' : step.id}
                </div>
              </div>

              {/* Card */}
              <div className={`group relative h-full ${
                activeStep === step.id ? 'scale-105' : ''
              } transition-transform duration-300`}>
                {/* Card Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                
                {/* Card Content */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                  {/* Icon Container */}
                  <div className="mb-6 relative">
                    <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <span className="text-3xl">{step.emoji}</span>
                    </div>
                    {/* Pulse Effect */}
                    {completedSteps.includes(step.id) && (
                      <div className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br ${step.color} rounded-2xl animate-ping opacity-30`}></div>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white text-center mb-4">
                    {step.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 text-center mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Time Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 font-medium">
                      ⏱️ {step.time}
                    </span>
                  </div>

                  {/* Hover Action */}
                  <div className="mt-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-sm font-medium text-white hover:text-white/80 transition-colors inline-flex items-center gap-2">
                      Learn more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="max-w-2xl mx-auto">
            {/* Success Message */}
            {completedSteps.length === steps.length && (
              <div className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-400 font-medium">Ready to get started!</span>
              </div>
            )}

            <p className="text-xl text-gray-300 mb-8">
              Experience the easiest car rental process today
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Start Booking Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                Watch Demo Video
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white">30k+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-400">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;