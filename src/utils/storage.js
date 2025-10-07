// localStorage helpers — uses key 'bookings'
const KEY = "bookings";

export const getBookings = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const saveBooking = (booking) => {
  const existing = getBookings();
  localStorage.setItem(KEY, JSON.stringify([booking, ...existing]));
};

export const saveBookings = (bookings) => {
  localStorage.setItem(KEY, JSON.stringify(bookings));
};
