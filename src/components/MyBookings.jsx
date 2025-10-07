import React, { useEffect, useState } from "react";
import { getBookings } from "../utils/storage";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = getBookings();
    setBookings(data);
  }, []);

  return (
    <section>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="bg-white p-4 rounded shadow mb-4">
            <h3>{b.centerName}</h3>
            <p>{b.address}</p>
            <p>{b.city}, {b.state}</p>
            <p>Date: {b.date}</p>
            <p>Time: {b.time}</p>
          </div>
        ))
      )}
    </section>
  );
}
