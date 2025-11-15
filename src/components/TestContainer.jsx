import { useState, useEffect, useCallback, useRef } from "react";
import Testimonial from "./Testimonial";

function TestContainer() {
  const reviews = [
    {
      id: "review-001",
      name: "Fatima",
      city: "Islamabad",
      desc: "RentRush made my car rental experience so easy! The online booking was seamless, and I loved the flexibility in pick-up locations. Highly recommended!",
      rating: 5,
      date: "2 weeks ago",
      verified: true
    },
    {
      id: "review-002",
      name: "Saif",
      city: "Lahore",
      desc: "Fantastic service! I loved the variety of cars available and the quick booking process. RentRush is my go-to for rentals!",
      rating: 5,
      date: "1 month ago",
      verified: true
    },
    {
      id: "review-003",
      name: "Abdullah",
      city: "Karachi",
      desc: "I couldn't be happier with my experience at RentRush. The team was friendly, and I found the perfect car at an unbeatable price!",
      rating: 5,
      date: "1 month ago",
      verified: true
    },
    {
      id: "review-004",
      name: "Sara",
      city: "Quetta",
      desc: "The rental experience was excellent, the car was in perfect condition, and the process was quick and easy.",
      rating: 4,
      date: "2 months ago",
      verified: true
    },
    {
      id: "review-005",
      name: "Hassan",
      city: "Peshawar",
      desc: "Great service, affordable prices, and the booking was smooth! I'll definitely use RentRush again.",
      rating: 5,
      date: "2 months ago",
      verified: true
    },
    {
      id: "review-006",
      name: "Ayesha",
      city: "Multan",
      desc: "RentRush saved my day! I needed a car urgently, and the service was fast and reliable. Highly recommend!",
      rating: 5,
      date: "3 months ago",
      verified: true
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialsPerPage, setTestimonialsPerPage] = useState(
    typeof window !== 'undefined' 
      ? window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3
      : 3
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleResize = useCallback(
    debounce(() => {
      const newTestimonialsPerPage = 
        window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
      
      if (newTestimonialsPerPage !== testimonialsPerPage) {
        setTestimonialsPerPage(newTestimonialsPerPage);
        setCurrentIndex(0);
      }
    }, 250),
    [testimonialsPerPage]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        handleNext(true);
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, autoPlay, testimonialsPerPage]);

  const handleNext = useCallback((isAuto = false) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      
      if (currentIndex + testimonialsPerPage >= reviews.length) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(prev => prev + testimonialsPerPage);
      }
      
      setTimeout(() => setIsTransitioning(false), 300);
      
      if (!isAuto) {
        setAutoPlay(false);
      }
    }
  }, [currentIndex, testimonialsPerPage, isTransitioning, reviews.length]);

  const handlePrevious = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      
      if (currentIndex === 0) {
        setCurrentIndex(Math.max(0, reviews.length - testimonialsPerPage));
      } else {
        setCurrentIndex(prev => prev - testimonialsPerPage);
      }
      
      setTimeout(() => setIsTransitioning(false), 300);
      setAutoPlay(false);
    }
  }, [currentIndex, testimonialsPerPage, isTransitioning, reviews.length]);

  const goToPage = useCallback((index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index * testimonialsPerPage);
      setTimeout(() => setIsTransitioning(false), 300);
      setAutoPlay(false);
    }
  }, [testimonialsPerPage, isTransitioning]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="relative">
        {/* Main Carousel Container */}
        <div className="overflow-hidden py-4">
          <div 
            className={`flex transition-all duration-500 ease-in-out ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {reviews
              .slice(currentIndex, currentIndex + testimonialsPerPage)
              .map((card) => (
                <div 
                  key={card.id} 
                  className={`w-full px-3 ${
                    testimonialsPerPage === 1 
                      ? "md:w-full" 
                      : testimonialsPerPage === 2 
                        ? "md:w-1/2" 
                        : "md:w-1/3"
                  }`}
                >
                  <Testimonial 
                    name={card.name}
                    city={card.city}
                    desc={card.desc}
                    rating={card.rating}
                    date={card.date}
                    verified={card.verified}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          disabled={isTransitioning}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 
            bg-white backdrop-blur-sm bg-opacity-90 rounded-full p-3 shadow-xl 
            hover:bg-opacity-100 hover:scale-110 hover:shadow-2xl
            transition-all duration-300 group
            ${isTransitioning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          aria-label="Previous testimonials"
        >
          <svg
            className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        
        <button
          onClick={() => handleNext(false)}
          disabled={isTransitioning}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 
            bg-white backdrop-blur-sm bg-opacity-90 rounded-full p-3 shadow-xl 
            hover:bg-opacity-100 hover:scale-110 hover:shadow-2xl
            transition-all duration-300 group
            ${isTransitioning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          aria-label="Next testimonials"
        >
          <svg
            className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <div className="flex gap-2">
          {Array.from({
            length: Math.ceil(reviews.length / testimonialsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`relative rounded-full transition-all duration-300 
                ${currentIndex === index * testimonialsPerPage 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-3 shadow-lg" 
                  : "bg-gray-300 hover:bg-gray-400 w-3 h-3 hover:scale-125"
                }`}
              aria-label={`Go to testimonial set ${index + 1}`}
              aria-current={currentIndex === index * testimonialsPerPage ? "true" : "false"}
            >
              {currentIndex === index * testimonialsPerPage && (
                <span className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></span>
              )}
            </button>
          ))}
        </div>
        
        {/* Auto-play toggle */}
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label={autoPlay ? "Pause auto-play" : "Start auto-play"}
        >
          {autoPlay ? (
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default TestContainer;