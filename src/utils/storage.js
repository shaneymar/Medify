// utils/storage.js

const STORAGE_KEY = "bookings";

export const getBookings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveBooking = (booking) => {
  const current = getBookings();
  current.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
};
