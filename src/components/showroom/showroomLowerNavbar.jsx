import React from "react";

function LowerNavbar() {
  const showroomLogoUrl = `${
    import.meta.env.VITE_API_URL
  }/Uploads/${sessionStorage.getItem("logo")}`;
  const showroomName = sessionStorage.getItem("showroomName");

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg py-4 px-6 md:px-10 sticky top-20 z-40">
      <div className="max-w-screen-4xl mx-auto flex items-center justify-between">
        {/* Left: Showroom Logo + Name */}
        <div className="flex items-center gap-4">
          <img
            src={showroomLogoUrl}
            alt="Showroom Logo"
            className="h-14 w-14 rounded- object-cover border-2 border-gray-200 shadow-sm"
          />
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
              {showroomName}
            </h2>
          </div>
        </div>

        {/* Right: Quick Actions */}
        {/* <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800 font-medium text-sm md:text-base transition-colors">
            Contact Support
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm md:text-base font-semibold px-4 md:px-6 py-2 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-md">
            Quick Actions
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default LowerNavbar;
