import React, { useEffect, useState } from "react";
import { getBookings } from "../utils/storage";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white p-4 rounded shadow">
              <h3>{b.centerName}</h3>
              <p>{b.address}</p>
              <p>
                {b.city}, {b.state}
              </p>
              <p>Date: {b.date}</p>
              <p>Time: {b.time}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
