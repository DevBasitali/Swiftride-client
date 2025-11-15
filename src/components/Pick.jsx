import React, { useState } from "react";

const Pick = ({ purpose, search }) => {
  const [showInput, setShowInput] = useState(false);
  const handleClick = () => {
    setShowInput(true);
  };
  const [showInput2, setShowInput2] = useState(false);

  const handleClick2 = () => {
    setShowInput2(true);
  };
  return (
    <div className="bg-[#C17D3C] rounded-lg shadow-lg w-full md:w-[49%] flex-col p-4 py-1 flex space-x-8">
      <div className="flex items-center space-x-2 mx-6">
        <img src="/src/assets/mark.png" className="w-4" alt="" />
        <span className="font-semibold">{purpose}</span>
      </div>
      <div className="flex flex-row py-2 gap-3">
        <div className="flex flex-col">
          <span className="text-sm font-semibold bg-transparent">
            Locations
          </span>
          <div className=" text-sm flex items-center space-x-1">
            <select className=" text-sm flex items-center space-x-1 bg-transparent   rounded p-1">
              <option>Select your city</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Houston</option>
              <option>Miami</option>
            </select>
            <span></span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Date</span>
          <div className="text-gray-400 text-sm flex items-center space-x-1">
            <div>
              {!showInput ? (
                <button className="text-black" onClick={handleClick}>
                  Select your date
                </button>
              ) : (
                <input className="bg-transparent text-black" type="date" />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold">Time</span>
          <div className="text-gray-400 text-sm flex items-center space-x-1">
            <div>
              {!showInput2 ? (
                <button className="text-black" onClick={handleClick2}>
                  Select your time
                </button>
              ) : (
                <input className="bg-transparent text-black" type="time" />
              )}
            </div>
            {search && (
              <button className="bg-white px-4 py-1 text-black font-semibold rounded">
                Search
              </button>
            )}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Pick;
