import React from "react";

const Card = ({ title, desc, img, index }) => {
  // Different colors for each card
  const colors = [
    "bg-gradient-to-br from-[#C17D3C] to-[#E8A861]",
    "bg-gradient-to-br from-[#3C6EC1] to-[#61A8E8]",
    "bg-gradient-to-br from-[#C13C3C] to-[#E86161]",
  ];
  
  return (
    <div className="group p-6 rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 flex items-start space-x-6 hover:shadow-lg hover:-translate-y-1">
      <div className={`${colors[index]} rounded-xl flex items-center justify-center p-4 min-w-[60px]`}>
        <img
          src={`/src/assets/choose/${img}.png`}
          className="w-8 h-8 object-contain"
          alt={title}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2 text-white group-hover:text-orange-300 transition-colors">
          {title}
        </h2>
        <p className="text-gray-300 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Card;
