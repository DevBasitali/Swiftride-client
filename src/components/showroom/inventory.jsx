import axios from "axios";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Toast from "../Toast";
import Dialog from "./dialog";
import Drawer from "./drawer";
import ShowroomNavbar from "./showroomNavbar";
const Base_Url = import.meta.env.VITE_API_URL;
function ShowroomInventory() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/car/get-all-cars`, {
        withCredentials: true,
      });
      setVehicles(response.data); //Set the fetched data to vehicles state
    } catch (err) {
      console.log(err);
      Toast(err.data || err.message || "Something went wrong", "error");
    }
  };
  useEffect(() => {
    fetchVehicles();
  }, []); // Run only once on component mount

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setIsEditing(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setVehicleToEdit(null);
  };

  const handleSave = async (data) => {
    try {
      const formData = new FormData();

      // Add non-file fields
      formData.append("carBrand", data.make);
      formData.append("rentRate", data.rentalPrice);
      formData.append("carModel", data.model);
      formData.append("year", data.year);
      formData.append("variant", data.variant);
      formData.append("color", data.color);
      formData.append("engineType", data.engineDisplacement);
      formData.append("bodyType", data.bodyType);
      formData.append("mileage", data.mileage);
      formData.append("transmission", data.transmission);
      formData.append("seatCapacity", data.seatCapacity); // New field
      formData.append("luggageCapacity", data.luggageCapacity); // New field
      formData.append("fuelType", data.fuelType); // Corrected field name

      // Add car features if needed
      if (data.carFeatures) {
        formData.append("carFeatures", data.carFeatures);
      }

      // Add images
      if (Array.isArray(data.images) && data.images.length > 0) {
        data.images.forEach((image) => {
          if (image) formData.append("images", image); // Append the actual image file
        });
      }

      if (isEditing) {
        const response = await axios.put(
          `${Base_Url}/api/car/update/${vehicles[vehicleToEdit]?._id}`,
          formData,
          { withCredentials: true }
        );
        fetchVehicles();
        Toast(response.data.message, "success");
      } else {
        const response = await axios.post(`${Base_Url}/api/car/add`, formData, {
          withCredentials: true,
        });
        Toast(response.data, "success");
        fetchVehicles();
      }
      closeDialog();
    } catch (error) {
      Toast(error.data, "error");
      console.log({ error });
    }
  };

  const handleEdit = (index) => {
    console.log("Edit index:", index);

    if (vehicles[index]?.availability !== "Available") {
      Toast("This car is booked, not available for editing", "error");
      return;
    }
    setVehicleToEdit(index);
    setIsDialogOpen(true);
    setIsEditing(true);
  };

  const openDeleteDialog = (index) => {
    setVehicleToDelete(index);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setVehicleToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${Base_Url}/api/car/delete/${vehicleToDelete}`,
        { withCredentials: true }
      );

      Toast(response?.data?.message || "Car deleted successfully", "success");
      fetchVehicles(); // refresh list
      closeDeleteDialog(); // close the modal
    } catch (error) {
      console.error("Delete error:", error);
      Toast(error?.response?.data || "Failed to delete vehicle", "error");
      closeDeleteDialog(); // close the modal
    }
  };

  return (
    <>
      <ShowroomNavbar onMenuClick={toggleDrawer} />
      <div className="bg-[#2C2C2C] min-h-screen relative">
        <div className="container mx-auto p-6 overflow-auto">
          <div className="text-white">
            <table className="min-w-full bg-gray-800 text-white border border-gray-700">
              <thead>
                <tr>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Id
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Image
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Brand
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Model
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Variant
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Mileage
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Engine Displacement
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Registration Year
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Rental Price
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Color
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Transmission
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Body Type
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Seat Capacity
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Luggage Capacity
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Fuel Type
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Car Features
                  </th>
                  <th className="sticky top-0 z-10 px-4 py-2 border-b border-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2 border-b border-gray-700">
                        {index}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        <img
                          src={`http://localhost:3000/uploads/${vehicle.images[0]}`}
                          alt={vehicle.carBrand + " " + vehicle.carModel}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.carBrand}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.carModel}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.variant}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.mileage} km
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.engineType}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.year}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.rentRate} RS/Day
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.color}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.transmission}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.bodyType}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.seatCapacity}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.luggageCapacity}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.fuelType}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700">
                        {vehicle.carFeatures}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-700 flex justify-center space-x-2">
                        <button
                          title="Edit"
                          className="bg-green-600 mt-7 mb-5 text-white p-2 rounded-full hover:bg-green-700"
                          onClick={() => handleEdit(index)}
                        >
                          <Edit className="w-6 h-6" />
                        </button>
                        <button
                          title="Delete"
                          className="bg-red-600 mt-7 mb-5 text-white p-2 rounded-full hover:bg-red-700"
                          onClick={() => openDeleteDialog(vehicle._id)}
                        >
                          <Trash className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="16" className="px-4 py-2 text-center">
                      No vehicles in inventory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />

        <button
          onClick={openDialog}
          className="fixed bottom-6 right-6 bg-[#C17D3C] text-white rounded-full p-4 shadow-lg flex items-center justify-center hover:bg-[#A86428] transition-all duration-300 ease-in-out"
        >
          <Plus className="w-6 h-6" />
        </button>

        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          onSave={handleSave}
          vehicle={isEditing ? vehicles[vehicleToEdit] : null}
          isEditing={isEditing}
        />

        {isDeleteDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-xl mb-4">Do you want to delete this car?</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={closeDeleteDialog}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={confirmDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowroomInventory;
