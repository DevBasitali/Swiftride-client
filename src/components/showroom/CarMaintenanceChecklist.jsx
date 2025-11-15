import axios from "axios";
import React, { useState } from "react";
import Toast from "../Toast";
const Base_Url = import.meta.env.VITE_API_URL;

const CarMaintenanceChecklist = ({ car, onClose }) => {
  const [checkedParts, setCheckedParts] = useState({
    engine: false,
    tyres: false,
    brakes: false,
    oil: false,
    airFilter: false,
    coolant: false,
    lights: false,
    wipers: false,
  });

  const [repairDescriptions, setRepairDescriptions] = useState({});

  const descriptions = {
    engine: "Check engine oil level and condition.",
    tyres: "Inspect tyre pressure and tread depth.",
    brakes: "Check brake fluid level and brake pads.",
    oil: "Check engine oil level and condition.",
    airFilter: "Inspect and replace air filter if necessary.",
    coolant: "Check coolant level and condition.",
    lights: "Test all lights (headlights, brake lights, indicators).",
    wipers: "Check wiper blades for wear and replace if necessary.",
  };

  const [submitted, setSubmitted] = useState(false);
  const [repairCosts, setRepairCosts] = useState({});
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckAllChange = (e) => {
    const checked = e.target.checked;
    setCheckAll(checked);
    const updatedParts = {};
    Object.keys(checkedParts).forEach((part) => {
      updatedParts[part] = checked;
    });
    setCheckedParts(updatedParts);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedParts((prev) => ({ ...prev, [name]: checked }));
  };

  const submitMaintenanceLog = async () => {
    try {
      const response = await axios.post(
        `${Base_Url}/api/car/start-maintenance`,
        {
          carId: car._id,
          maintenanceLog: checkedParts,
          maintenanceCost: repairCosts,
          repairDescriptions: repairDescriptions,
          showroomId: car.rentalInfo.showroomId,
          rentalStartDate: car.rentalInfo.rentalStartDate,
          rentalEndDate: car.rentalInfo.rentalEndDate,
          rentalStartTime: car.rentalInfo.rentalStartTime,
          rentalEndTime: car.rentalInfo.rentalEndTime,
        },
        {
          withCredentials: true,
        },
      );
      Toast("Maintenance log submitted", "success");
      const invoiceUrl = response.data.invoiceUrl;
      if (invoiceUrl) {
        Toast(
          <>
            {response.data.message}{" "}
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Click here to download the Invoice
            </a>
          </>,
        );
      }
      Toast("Maintenance log submitted", "success");
    } catch (err) {
      console.log(err);
      Toast(
        err?.response?.data || err.message || "Something went wrong",
        "error",
      );
      Toast(
        err?.response?.data || err.message || "Something went wrong",
        "error",
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMaintenanceLog();
    console.log("Maintenance checklist for", car.carBrand, checkedParts);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-[#0B132A]">
              Maintenance Checklist
            </h2>
            <p className="text-center text-sm mb-6 text-gray-600">
              Car: <strong>{car.carBrand + " " + car.carModel}</strong>
            </p>

            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="checkAll"
                  checked={checkAll}
                  onChange={handleCheckAllChange}
                  className="w-4 h-4"
                />
                <label htmlFor="checkAll" className="font-medium text-sm">
                  Check All
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(checkedParts).map((part) => (
                <div
                  key={part}
                  className="flex flex-col gap-2 bg-gray-50 border border-gray-200 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={part}
                      checked={checkedParts[part]}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor={part}
                      className="capitalize font-medium text-sm"
                    >
                      {part}
                    </label>
                    <label className="capitalize font-small text-sm">
                      ({descriptions[part]})
                    </label>
                  </div>

                  {!checkedParts[part] && (
                    <div className="flex flex-col gap-2">
                      {/* Repair cost - half width */}
                      <div className="w-1/2">
                        <input
                          type="number"
                          placeholder="Repair cost"
                          min="0"
                          value={repairCosts[part] || ""}
                          onChange={(e) =>
                            setRepairCosts((prev) => ({
                              ...prev,
                              [part]: e.target.value,
                            }))
                          }
                          className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                        />
                      </div>

                      {/* Repair description - full width, multiline */}
                      <div className="w-full flex flex-col gap-1">
                        <textarea
                          placeholder="Repair description"
                          value={repairDescriptions[part] || ""}
                          onChange={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height =
                              e.target.scrollHeight + "px";
                            setRepairDescriptions((prev) => ({
                              ...prev,
                              [part]: e.target.value,
                            }));
                          }}
                          className={`border ${
                            !checkedParts[part] &&
                            !repairDescriptions[part]?.trim()
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded px-3 py-2 w-full text-sm resize-none overflow-hidden min-h-[40px]`}
                          rows={1}
                        />
                        {/* Error shown in new line */}
                        {!checkedParts[part] &&
                          !repairDescriptions[part]?.trim() && (
                            <span className="text-red-500 text-xs">
                              Description is required
                            </span>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C17D3C] text-white px-4 py-2 rounded hover:bg-[#a96a33] transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-[#0B132A]">
              Maintenance Submitted
            </h3>
            <p>The checklist has been saved successfully.</p>
            <button
              onClick={onClose}
              className="mt-4 py-2 px-6 bg-[#C17D3C] text-white rounded-lg hover:bg-[#a96a33] transition"
            >
              Close
            </button>
          </div>
        )}

        {/* Close (X) button in corner */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CarMaintenanceChecklist;
