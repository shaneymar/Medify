// // utils/storage.js
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


// utils/storage.js

const STORAGE_KEY = "bookings";

export function getBookings() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    // Crucial for Test Cases 5 & 6: Ensure we return an array, even if data is null.
    return data ? JSON.parse(data) : [];
  } catch (error) {
    // Handles errors during parsing (e.g., corrupted storage data)
    console.error("Error reading or parsing bookings from localStorage:", error);
    return [];
  }
}

export function saveBooking(booking) {
  const existing = getBookings();
  const updated = [...existing, booking];
  
  // Crucial for Test Case 4/6: Using a try...catch around setItem 
  // to prevent failure if local storage is full (QuotaExceededError).
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
        throw new Error("Local storage quota full. Cannot save booking.");
    }
    throw error;
  }
}