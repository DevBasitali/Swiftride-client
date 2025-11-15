import axios from "axios";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import CarCard from "./carCard";
import PaymentReceivedDialog from "./PaymentReceivedDialog";
import ShowroomNavbar from "./showroomNavbar";
const Base_Url = import.meta.env.VITE_API_URL;

const PaymentsPage = () => {
  const [paymentReceivedSelectedCar, setPaymentReceivedSelectedCar] =
    useState(null);
  const [cars, setCars] = useState(null);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        `${Base_Url}/api/car/get-all-payment-cars`,
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

  const handlePaymentReceivedCarSelect = (car) => {
    setPaymentReceivedSelectedCar(car);
  };

  const handleClosePaymentReceivedSelectedCar = () => {
    setPaymentReceivedSelectedCar(null);
    fetchVehicles();
  };

  const filterCarsByStatus = (cars) => {
    return cars?.filter((car) => car.rentalInfo?.status === "pending payment");
  };
  const filteredCars = filterCarsByStatus(cars);

  return (
    <>
      <ShowroomNavbar />
      <div className="p-8 bg-white min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#0B132A]">
          No Car Payment Received
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-3 justify-items-center">
          {filteredCars?.map((car) => (
            <div
              key={car._id}
              onClick={() => {
                if (car.rentalInfo?.status === "pending payment") {
                  handlePaymentReceivedCarSelect(car);
                }
              }}
              className={`cursor-pointer ${car.rentalInfo?.status !== "pending payment" ? "opacity-50 pointer-events-none" : ""}`}
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

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

export default PaymentsPage;
