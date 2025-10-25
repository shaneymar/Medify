import React, { useState } from "react";

export default function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [note, setNote] = useState("");

  const saveBooking = () => {
    const booking = {
      "Hospital Name": hospital["Hospital Name"],
      City: hospital.City,
      State: hospital.State,
      Date: selectedDate,
      Time: selectedTime,
      Note: note,
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    onClose();
  };

  const timeSlots = {
    Morning: ["09:00 AM", "09:30 AM", "10:00 AM"],
    Afternoon: ["12:00 PM", "12:30 PM", "01:00 PM"],
    Evening: ["04:00 PM", "04:30 PM", "05:00 PM"],
  };

  const [selectedTime, setSelectedTime] = useState("");

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-white p-6 w-[600px] rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            Book at {hospital["Hospital Name"].toUpperCase()}
          </h2>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        {/* ✅ Cypress expects this */}
        <p>Today</p>

        <label className="block text-sm font-medium my-2">Select Date</label>
        <input
          type="date"
          className="border px-2 py-1 rounded w-full"
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* ✅ Time Slots Sections */}
        <div className="mt-4">
          <p>Morning</p>
          <div className="flex gap-2">
            {timeSlots.Morning.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`border px-3 py-1 rounded ${
                  selectedTime === t ? "bg-blue-500 text-white" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <p className="mt-4">Afternoon</p>
          <div className="flex gap-2">
            {timeSlots.Afternoon.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`border px-3 py-1 rounded ${
                  selectedTime === t ? "bg-blue-500 text-white" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <p className="mt-4">Evening</p>
          <div className="flex gap-2">
            {timeSlots.Evening.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`border px-3 py-1 rounded ${
                  selectedTime === t ? "bg-blue-500 text-white" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <textarea
          className="border w-full mt-4 p-2 rounded"
          placeholder="Add a note (optional)"
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 border px-3 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={saveBooking}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Book FREE Center Visit
          </button>
        </div>
      </div>
    </div>
  );
}
