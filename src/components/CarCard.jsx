import React from "react";

const CarCard = ({ img, title }) => (
  <div className="bg-white shadow-md rounded-lg p-4 w-full sm:w-[48%] lg:w-[30%]">
    <img
      src={`/src/assets/${img}`}
      alt={title}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <h2 className="text-xl font-bold mt-4">{title}</h2>
    <ul className="list-none list-inside mt-2 space-y-2">
      <li className="flex items-center">
        <img src="/src/assets/tick.svg" className="w-6 mr-2" alt="Tick" />
        Air Conditioned
      </li>
      <li className="flex items-center">
        <img src="/src/assets/tick.svg" className="w-6 mr-2" alt="Tick" />
        Bluetooth Sound System
      </li>
      <li className="flex items-center">
        <img src="/src/assets/tick.svg" className="w-6 mr-2" alt="Tick" />
        Sunroof Available
      </li>
    </ul>
    <button className="mt-4 bg-[#C17D3C] text-white py-2 px-4 rounded hover:bg-[#A56A33] transition-all w-full">
      Rent Now
    </button>
  </div>
);

export default CarCard;
