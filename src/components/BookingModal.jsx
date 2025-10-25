// BookingModal.js
import React, { useState } from "react";

export default function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;

    const newBooking = {
      "Hospital Name": hospital["Hospital Name"],
      City: hospital.City,
      State: hospital.State,
      bookingDate: selectedDate,
      bookingTime: selectedTime,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existing));
    onClose(); // Close after booking
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>

        <p className="font-medium">Today</p>
        <div className="flex gap-3 mt-2">
          <button onClick={() => setSelectedTime("Morning")}>Morning</button>
          <button onClick={() => setSelectedTime("Afternoon")}>Afternoon</button>
          <button onClick={() => setSelectedTime("Evening")}>Evening</button>
        </div>

        <p className="mt-4">Select Date:</p>
        <input type="date" className="border px-2 py-1" onChange={(e) => setSelectedDate(e.target.value)} />

        <button
          onClick={handleBooking}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Confirm Booking
        </button>
        <button onClick={onClose} className="mt-2 text-gray-600">Cancel</button>
      </div>
    </div>
  );
}
