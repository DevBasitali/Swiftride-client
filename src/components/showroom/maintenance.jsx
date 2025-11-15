import axios from "axios";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import CarCard from "./carCard";
import CarMaintenanceChecklist from "./CarMaintenanceChecklist";
import MarkCompleteMaintenance from "./MarkCompleteMaintenance";
import PaymentReceivedDialog from "./MarkCompleteMaintenance";
import ShowroomNavbar from "./showroomNavbar";
const Base_Url = import.meta.env.VITE_API_URL;

const CarMaintenancePage = () => {
  const [maintenanceSelectedCar, setMaintenanceSelectedCar] = useState(null);
  const [completeMaintenanceSelectedCar, setCompleteMaintenanceSelectedCar] =
    useState(null);
  const [paymentReceivedSelectedCar, setPaymentReceivedSelectedCar] =
    useState(null);
  const [cars, setCars] = useState(null);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        `${Base_Url}/api/car/get-all-return-cars`,
        {
          withCredentials: true,
        }
      );
      setCars(response.data);
    } catch (err) {
      console.log(err);
      Toast(err.data || err.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    try {
      fetchVehicles();
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      Toast("Failed to fetch vehicles", "error");
    }
  }, []);

  const handleMaintenanceCarSelect = (car) => {
    setMaintenanceSelectedCar(car);
  };

  const handleCompleteMaintenanceCarSelect = (car) => {
    setCompleteMaintenanceSelectedCar(car);
  };

  const handlePaymentReceivedCarSelect = (car) => {
    setPaymentReceivedSelectedCar(car);
  };

  const handleCloseCompleteMaintenanceSelectedCar = () => {
    setCompleteMaintenanceSelectedCar(null);
    fetchVehicles();
  };

  const handleClosePaymentReceivedSelectedCar = () => {
    setPaymentReceivedSelectedCar(null);
    fetchVehicles();
  };

  const handleCloseChecklist = () => {
    setMaintenanceSelectedCar(null);
    fetchVehicles();
  };

  return (
    <>
      <ShowroomNavbar />
      <div className="p-8 bg-white min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0B132A]">
         No Car for Maintenance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-3 justify-items-center">
          {cars?.map((car) => (
            <div
              key={car._id}
              onClick={() => {
                if (car.availability === "Pending Return") {
                  handleMaintenanceCarSelect(car);
                } else if (car.availability === "Maintenance Complete") {
                  handlePaymentReceivedCarSelect(car);
                } else {
                  handleCompleteMaintenanceCarSelect(car);
                }
              }}
              className="cursor-pointer"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {maintenanceSelectedCar && (
          <CarMaintenanceChecklist
            car={maintenanceSelectedCar}
            onClose={handleCloseChecklist}
          />
        )}
        {completeMaintenanceSelectedCar && (
          <MarkCompleteMaintenance
            carId={completeMaintenanceSelectedCar._id}
            onClose={handleCloseCompleteMaintenanceSelectedCar}
          />
        )}
        {paymentReceivedSelectedCar && (
          <PaymentReceivedDialog
            carId={paymentReceivedSelectedCar._id}
            onClose={handleClosePaymentReceivedSelectedCar}
          />
        )}
      </div>
    </>
  );
};

export default CarMaintenancePage;
