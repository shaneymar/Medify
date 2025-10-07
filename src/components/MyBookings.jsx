import React, { useEffect, useState } from "react";
import { getBookings, saveBookings } from "../utils/storage";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleCancel = (id) => {
    if (!confirm("Cancel this booking?")) return;
    const filtered = bookings.filter((b) => b.id !== id);
    setBookings(filtered);
    saveBookings(filtered);
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{b.centerName}</h3>
              <p className="text-sm text-slate-600">{b.address}</p>
              <p className="text-sm mt-1">{b.city}, {b.state}</p>
              <p className="mt-2"><span className="font-medium">Date:</span> {b.date}</p>
              <p><span className="font-medium">Time:</span> {b.time}</p>
              <div className="mt-3">
                <button onClick={() => handleCancel(b.id)} className="px-3 py-1 border rounded">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
