// const STORAGE_KEY = "bookings";

// export function getBookings() {
//   try {
//     return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//   } catch {
//     return [];
//   }
// }

// export function saveBooking(booking) {
//   const existing = getBookings();
//   const updated = [...existing, booking];
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
// }


// export const saveBooking = (booking) => {
//   const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
//   localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
// };

// export const getBookings = () => {
//   return JSON.parse(localStorage.getItem("bookings") || "[]");
// };


const STORAGE_KEY = "medify_bookings";

export const saveBooking = (booking) => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, booking]));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};
