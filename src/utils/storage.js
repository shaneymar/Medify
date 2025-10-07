// Utility to handle localStorage for bookings
export const saveBooking = (booking) => {
  const existing = JSON.parse(localStorage.getItem("bookings")) || [];
  localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem("bookings")) || [];
};
