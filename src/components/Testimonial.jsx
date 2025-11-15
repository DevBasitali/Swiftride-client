import React from "react";

function Testimonial({ name, city, desc, rating = 5, date = "Recently", verified = false }) {
  const initials = name.charAt(0).toUpperCase();

  return (
    <div className="h-full">
      <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
        {/* Quote Icon */}
        <div className="absolute -top-3 -left-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4 mt-2">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-200'} fill-current`} 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-700 leading-relaxed mb-6 flex-grow italic">
          "{desc}"
        </p>

        {/* Customer Info */}
        <div className="border-t border-gray-100 pt-4 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {initials}
              </div>
              
              {/* Name and Location */}
              <div>
                <h4 className="font-semibold text-gray-800">{name}</h4>
                <p className="text-sm text-gray-500">{city}</p>
              </div>
            </div>
            
            {/* Verified Badge */}
            {verified && (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;