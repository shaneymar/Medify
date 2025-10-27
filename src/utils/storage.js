
//  Use the key 
const STORAGE_KEY = "bookings";

export const saveBooking = (booking) => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, booking]));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}