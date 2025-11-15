import React from "react";

function Card({ title, desc, img, icon, stats, color, index }) {
  const getIcon = (iconType) => {
    const icons = {
      support: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      location: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      price: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      default: (
        <img src={`/src/assets/choose/${img}.png`} alt={title} className="w-10 h-10" />
      )
    };
    return icons[icon] || icons.default;
  };

  return (
    <div className="relative group">
      {/* Card Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${color || 'from-blue-500 to-purple-500'} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300`}></div>
      
      {/* Card Content */}
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
        <div className="flex items-start gap-6">
          {/* Icon Container */}
          <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${color || 'from-blue-500 to-purple-500'} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
            {icon ? getIcon(icon) : <img src={`/src/assets/choose/${img}.png`} alt={title} className="w-12 h-12" />}
          </div>
          
          {/* Text Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold text-white">
                {title}
              </h3>
              {stats && (
                <span className="text-xs px-3 py-1 bg-white/20 rounded-full text-white font-medium">
                  {stats}
                </span>
              )}
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {desc}
            </p>
            
            {/* Additional Features */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">24/7 Available</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">Verified</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">Trusted</span>
            </div>
          </div>
        </div>

        {/* Corner Decoration */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

export default Card;