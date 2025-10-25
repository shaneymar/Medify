// import React, { useEffect, useState } from "react";
// import { getBookings } from "../utils/storage";

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     setBookings(getBookings());
//   }, []);

//   return (
//     <section className="py-6">
//       <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
//       {bookings.length === 0 ? (
//         <p data-testid="no-bookings-message">No bookings yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {bookings.map((b) => (
          
//             <div key={b.id} data-testid={`booking-item-${b.id}`} className="bg-white p-4 rounded shadow">
//               <h3>{b.centerName}</h3>
//               <p>{b.address}</p>
//               <p>
//                 {b.city}, {b.state}
//               </p>
//               <p>Date: {b.date}</p>
//               <p>Time: {b.time}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { getBookings } from "../utils/storage";

// export default function MyBookings({ refreshSignal }) {
//   const [bookings, setBookings] = useState([]);

//   const loadBookings = () => setBookings(getBookings());

//   useEffect(() => {
//     loadBookings();
//   }, [refreshSignal]); // reload whenever parent signals

//   return (
//     <section className="py-6">
//       <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>
//       {bookings.length === 0 ? (
//         <p data-testid="no-bookings-message">No bookings yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {bookings.map((b) => (
//             <div
//               key={b.id}
//               data-testid={`booking-item-${b.id}`}
//               className="bg-white p-4 rounded shadow"
//             >
//               <h3>{b.centerName}</h3>
//               <p>{b.address}</p>
//               <p>
//                 {b.city}, {b.state}
//               </p>
//               <p>Date: {b.date}</p>
//               <p>Time: {b.time}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import { getBookings } from "../utils/storage";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage whenever component mounts
  useEffect(() => {
    setBookings(getBookings());
  }, []); // no dependencies needed; mounting will trigger reload

  return (
    <section className="py-6">
      <h1 className="text-2xl font-semibold mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p data-testid="no-bookings-message">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              data-testid={`booking-item-${b.id}`}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-semibold">{b.centerName}</h3>
              <p>{b.address}</p>
              <p>
                {b.city}, {b.state}
              </p>
              <p>Date: {b.date}</p>
              <p>Time: {b.time}</p>
              {b.note && <p>Note: {b.note}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
