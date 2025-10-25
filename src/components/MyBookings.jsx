// MyBookings.js
import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b, idx) => (
          <div key={idx} className="border p-4 rounded-lg mb-3">
            <h3 className="font-bold">{b["Hospital Name"]}</h3>
            <p>{b.City}, {b.State}</p>
            <p>Date: {b.bookingDate}</p>
            <p>Time: {b.bookingTime}</p>
          </div>
        ))
      )}
    </div>
  );
}
