// utils/storage.js
const STORAGE_KEY = "bookings";

export function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveBooking(booking) {
  const existing = getBookings();
  const updated = [...existing, booking];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
