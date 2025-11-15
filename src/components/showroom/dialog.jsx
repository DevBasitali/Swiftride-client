import React from "react";
import { carBrandsWithModels } from "../../utils";

function Dialog({ isOpen, onClose, onSave, isEditing, vehicle }) {
  const [formData, setFormData] = React.useState({
    make: "",
    model: "",
    mileage: "",
    variant: "",
    year: "",
    engineDisplacement: "",
    rentalPrice: "",
    color: "",
    transmission: "",
    bodyType: "",
    seatCapacity: "",
    luggageCapacity: "",
    fuelType: "",
    carFeatures: "",
    images: [],
  });

  const [existingImages, setExistingImages] = React.useState([]);
  const dialogRef = React.useRef(null);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (isEditing && vehicle) {
      setFormData({
        id: vehicle._id,
        make: vehicle.carBrand,
        model: vehicle.carModel,
        mileage: vehicle.mileage,
        engineDisplacement: vehicle.engineType,
        year: vehicle.year,
        rentalPrice: vehicle.rentRate,
        color: vehicle.color,
        transmission: vehicle.transmission,
        bodyType: vehicle.bodyType,
        seatCapacity: vehicle.seatCapacity || "",
        luggageCapacity: vehicle.luggageCapacity || "",
        fuelType: vehicle.fuelType || "",
        carFeatures: vehicle.carFeatures || "",
        images: [],
      });
      setExistingImages(
        vehicle.images
          ? Array.isArray(vehicle.images)
            ? vehicle.images
            : [vehicle.images]
          : []
      );
    } else {
      setFormData({
        make: "",
        model: "",
        mileage: "",
        year: "",
        engineDisplacement: "",
        rentalPrice: "",
        color: "",
        transmission: "",
        bodyType: "",
        seatCapacity: "",
        luggageCapacity: "",
        fuelType: "",
        carFeatures: "",
        images: [],
      });
      setExistingImages([]);
    }
  }, [isEditing, vehicle]);

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.make) newErrors.make = "Brand is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.mileage) newErrors.mileage = "Mileage is required";
    else if (!/^\d+$/.test(formData.mileage))
      newErrors.mileage = "Only numbers allowed";
    else if (formData.mileage < 0 || formData.mileage > 500000)
      newErrors.mileage = "Mileage must be between 0 and 500000 km";

    if (!formData.year) newErrors.year = "Year is required";
    else if (
      isNaN(formData.year) ||
      formData.year < 2015 ||
      formData.year > currentYear
    )
      newErrors.year = `Year must be between 2015 and ${currentYear}`;

    if (!formData.variant) newErrors.variant = "Variant is required";

    if (!formData.engineDisplacement)
      newErrors.engineDisplacement = "Engine displacement is required";
    else if (!/^[a-zA-Z0-9\s]+$/.test(formData.engineDisplacement))
      newErrors.engineDisplacement =
        "Only letters, numbers, and spaces allowed";

    if (!formData.rentalPrice)
      newErrors.rentalPrice = "Rental price is required";
    else if (!/^\d+$/.test(formData.rentalPrice))
      newErrors.rentalPrice = "Only numbers allowed";

    if (!formData.color) newErrors.color = "Color is required";
    else if (!/^[a-zA-Z\s]+$/.test(formData.color))
      newErrors.color = "Only letters and spaces allowed";

    if (!formData.transmission)
      newErrors.transmission = "Transmission is required";
    if (!formData.bodyType) newErrors.bodyType = "Body type is required";

    if (!formData.seatCapacity)
      newErrors.seatCapacity = "Seat capacity is required";
    else if (!/^\d+$/.test(formData.seatCapacity) || formData.seatCapacity < 1)
      newErrors.seatCapacity = "Must be a positive number";

    if (!formData.luggageCapacity)
      newErrors.luggageCapacity = "Luggage capacity is required";
    else if (
      !/^\d+$/.test(formData.luggageCapacity) ||
      formData.luggageCapacity < 1
    )
      newErrors.luggageCapacity = "Must be a positive number";

    if (!formData.fuelType) newErrors.fuelType = "Fuel type is required";
    if (!formData.carFeatures)
      newErrors.carFeatures = "Car features are required";
    else if (!/^[a-zA-Z0-9\s,.-]+$/.test(formData.carFeatures))
      newErrors.carFeatures =
        "Only letters, numbers, spaces, commas, periods, and hyphens allowed";

    if (
      !isEditing &&
      formData.images.length === 0 &&
      existingImages.length === 0
    )
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "make") {
      // Reset model when brand changes
      setFormData({ ...formData, make: value, model: "" });
    } else if (name === "color") {
      if (value === "" || /^[a-zA-Z\s]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "engineDisplacement") {
      if (value === "" || /^[a-zA-Z0-9\s]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "carFeatures") {
      if (value === "" || /^[a-zA-Z0-9\s,.-]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (
      [
        "mileage",
        "rentalPrice",
        "seatCapacity",
        "luggageCapacity",
        "year",
      ].includes(name)
    ) {
      if (value === "" || /^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleKeyDown = (e) => {
    if (
      [
        "mileage",
        "rentalPrice",
        "seatCapacity",
        "luggageCapacity",
        "year",
      ].includes(e.target.name)
    ) {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
      ];
      if (!allowedKeys.includes(e.key) && isNaN(Number(e.key))) {
        e.preventDefault();
      }
    } else if (e.target.name === "color") {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        " ",
      ];
      if (!allowedKeys.includes(e.key) && !/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
      }
    } else if (e.target.name === "engineDisplacement") {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        " ",
      ];
      if (!allowedKeys.includes(e.key) && !/^[a-zA-Z0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    } else if (e.target.name === "carFeatures") {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        " ",
        ",",
        ".",
        "-",
      ];
      if (!allowedKeys.includes(e.key) && !/^[a-zA-Z0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setErrors({ ...errors, images: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        existingImages,
      });
      setFormData({
        make: "",
        model: "",
        mileage: "",
        year: "",
        variant: "",
        engineDisplacement: "",
        rentalPrice: "",
        color: "",
        transmission: "",
        bodyType: "",
        seatCapacity: "",
        luggageCapacity: "",
        fuelType: "",
        carFeatures: "",
        images: [],
      });
      setExistingImages([]);
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div
            ref={dialogRef}
            className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
          >
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
              {isEditing ? "Edit Vehicle" : "Add New Vehicle"}
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-3 border ${
                    errors.make ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 text-gray-700 bg-white`}
                >
                  <option value="" disabled>
                    Select Brand
                  </option>
                  {Object.keys(carBrandsWithModels)
                    .filter((brand) => carBrandsWithModels[brand].length > 0)
                    .sort()
                    .map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                </select>
                {errors.make && (
                  <p className="text-red-500 text-xs mt-1">{errors.make}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.make}
                  className={`w-full p-3 border ${
                    errors.model ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 text-gray-700 bg-white`}
                >
                  <option value="" disabled>
                    {formData.make ? "Select Model" : "Select Brand First"}
                  </option>
                  {formData.make &&
                    carBrandsWithModels[formData.make].sort().map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
                {errors.model && (
                  <p className="text-red-500 text-xs mt-1">{errors.model}</p>
                )}
              </div>

              {[
                {
                  label: "Variant",
                  name: "variant",
                  type: "text",
                  placeholder: "GLI",
                },
                {
                  label: "Mileage (km)",
                  name: "mileage",
                  type: "number",
                  placeholder: "200",
                  min: 0,
                  max: 500000,
                },
                {
                  label: "Year of Registration",
                  name: "year",
                  type: "number",
                  placeholder: "2025",
                  min: 2015,
                  max: new Date().getFullYear(),
                },
                {
                  label: "Engine Displacement (cc)",
                  name: "engineDisplacement",
                  type: "number",
                  placeholder: "1500cc",
                  min: 650,
                  max: 5000,
                },
                {
                  label: "Rental Price (Rs/day)",
                  name: "rentalPrice",
                  type: "number",
                  placeholder: "2000",
                  min: 1000,
                  max: 50000,
                },
                {
                  label: "Color",
                  name: "color",
                  type: "text",
                  placeholder: "Red",
                },
                {
                  label: "Seat Capacity",
                  name: "seatCapacity",
                  type: "number",
                  placeholder: "5",
                  min: 1,
                  max: 7,
                },
                {
                  label: "Luggage Capacity (bags)",
                  name: "luggageCapacity",
                  type: "number",
                  placeholder: "2",
                  min: 1,
                  max: 5,
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    required
                    min={field.min}
                    max={field.max}
                    className={`w-full p-3 border ${
                      errors[field.name] ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 text-gray-700 placeholder-gray-400`}
                    placeholder={field.placeholder}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              {[
                {
                  label: "Transmission",
                  name: "transmission",
                  options: [
                    { value: "", label: "Select Transmission" },
                    { value: "Automatic", label: "Automatic" },
                    { value: "Manual", label: "Manual" },
                  ],
                },
                {
                  label: "Body Type",
                  name: "bodyType",
                  options: [
                    { value: "", label: "Select Body Type" },
                    { value: "Sedan", label: "Sedan" },
                    { value: "SUV", label: "SUV" },
                  ],
                },
                {
                  label: "Fuel Type",
                  name: "fuelType",
                  options: [
                    { value: "", label: "Select Fuel Type" },
                    { value: "Petrol", label: "Petrol" },
                    { value: "Diesel", label: "Diesel" },
                    { value: "Electric", label: "Electric" },
                    { value: "Hybrid", label: "Hybrid" },
                  ],
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 border ${
                      errors[field.name] ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 text-gray-700 bg-white`}
                  >
                    {field.options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={option.value === ""}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Car Features <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="carFeatures"
                  value={formData.carFeatures}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  required
                  className={`w-full p-3 border ${
                    errors.carFeatures ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 text-gray-700 placeholder-gray-400 resize-y`}
                  placeholder="GPS, Air Conditioning, Bluetooth"
                  rows={4}
                />
                {errors.carFeatures && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.carFeatures}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Images <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!isEditing && existingImages.length === 0}
                  className={`w-full p-3 border ${
                    errors.images ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 text-gray-700`}
                />
                {(formData.images.length > 0 || existingImages.length > 0) && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Images:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {existingImages.map((url, index) => (
                        <div key={`existing-${index}`} className="relative">
                          <img
                            src={url}
                            alt={`Existing Image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            Existing Image {index + 1}
                          </p>
                        </div>
                      ))}
                      {formData.images.map((file, index) => (
                        <div key={`new-${index}`} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${file.name}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.images && (
                  <p className="text-red-500 text-xs mt-1">{errors.images}</p>
                )}
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Dialog;
