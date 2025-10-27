
// //  Use the key 
// const STORAGE_KEY = "bookings";

// export const saveBooking = (booking) => {
//   const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
//   localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, booking]));
// };

// export const getBookings = () => {
//   return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
// }

// src/utils/storage.js
const STORAGE_KEY = "bookings";

export const saveBooking = (booking) => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, booking]));
};

export const getBookings = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  // ✅ Normalize keys so Cypress & actual data both work
  return data.map((b) => ({
    id: b.id || Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    hospitalName: b.hospitalName || b["Hospital Name"] || b.centerName || "",
    address: b.address || b["Address"] || "",
    city: b.city || b.City || "",
    state: b.state || b.State || "",
    date: b.date || b.bookingDate || "",
    time: b.time || b.bookingTime || "",
    note: b.note || "",
  }));
};
