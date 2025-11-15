import React, { useState } from "react";

const ChecklistItem = ({ label }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-md">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="checkbox"
        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </div>
  );
};

export default ChecklistItem;
