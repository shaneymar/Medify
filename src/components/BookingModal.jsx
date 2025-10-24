// src/components/BookingModal.js
import React, { useMemo, useState } from "react";
import { saveBooking } from "../utils/storage";

export default function BookingModal({ center, onClose }) {
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [selectedSlot, setSelectedSlot] = useState("");
  const [note, setNote] = useState("");
  // message starts empty to avoid showing a status too early
  const [message, setMessage] = useState("");

  const dateOptions = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i <= 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      arr.push({ iso: d.toISOString().slice(0, 10), label: d.toDateString() });
    }
    return arr;
  }, []);

  const timeSlots = {
    Morning: ["09:00 AM", "09:30 AM", "10:00 AM"],
    Afternoon: ["12:00 PM", "12:30 PM", "01:00 PM"],
    Evening: ["04:00 PM", "04:30 PM", "05:00 PM"],
  };

  const handleBook = () => {
    if (!selectedSlot || !selectedDate) {
      setMessage("Please select date and slot");
      return;
    }

    const booking = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      centerName: center.name,
      address: center.address,
      city: center.city,
      state: center.state,
      date: selectedDate,
      time: selectedSlot,
      note,
    };
    
    // Test Case 4: Saving the booking
    try {
        saveBooking(booking);
        setMessage("Booking confirmed!"); 
        // Delay closing to allow the test/user to see the success message
        setTimeout(onClose, 600); 
    } catch (e) {
        // Handle potential storage errors (e.g., Quota exceeded)
        setMessage("Error: Could not save booking. Storage limit reached?");
        console.error("Booking save error:", e);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      data-testid="booking-modal"
    >
      <div className="bg-white w-full max-w-2xl rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">
              Book at {center.name}
            </h2>
            <p className="text-sm text-slate-500">{center.address}</p>
          </div>
          <button onClick={onClose} className="text-slate-500" data-testid="close-modal">
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Select Date</label>
            <select
              data-testid="date-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {dateOptions.map((d) => (
                <option key={d.iso} value={d.iso}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Time Slot</label>
            {["Morning", "Afternoon", "Evening"].map((period) => (
              <div key={period}>
                <p className="mt-2 font-medium">{period}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {timeSlots[period].map((t) => (
                    <label
                      key={t}
                      // Corrected data-testid format for easier Cypress selection
                      data-testid={`slot-${t.replace(':', '-').replace(' ', '-')}`} 
                      className={`border px-3 py-1 rounded cursor-pointer ${
                        selectedSlot === t ? "bg-sky-600 text-white" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        value={t}
                        checked={selectedSlot === t}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="hidden"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <textarea
            data-testid="note-input"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note (optional)"
            className="w-full border rounded px-3 py-2"
            rows="3"
          />
        </div>

        {/* Conditional styling based on message content */}
        {message && (
            <p className={`text-sm mt-2 ${message.includes('confirmed') ? 'text-green-600' : 'text-red-500'}`} 
               data-testid="booking-message">
                {message}
            </p>
        )}

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleBook}
            data-testid="confirm-booking"
            className="px-4 py-2 bg-sky-600 text-white rounded"
          >
            Book FREE Center Visit
          </button>
        </div>
      </div>
    </div>
  );
}