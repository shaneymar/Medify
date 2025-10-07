import React, { useMemo, useState } from "react";
import { saveBooking } from "../utils/storage";

export default function BookingModal({ center, onClose }) {
  // default to today
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedSlot, setSelectedSlot] = useState("");
  const [note, setNote] = useState("");

  // generate next 7 days
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
    Evening: ["04:00 PM", "04:30 PM", "05:00 PM"]
  };

  const handleBook = () => {
    if (!selectedSlot || !selectedDate) {
      alert("Select date and time slot");
      return;
    }
    const booking = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      centerName: center.name || center["Hospital Name"],
      address: center.address || center.Address,
      city: center.city || center.City,
      state: center.state || center.State,
      date: selectedDate,
      time: selectedSlot,
      note
    };
    // save to localStorage key 'bookings'
    saveBooking(booking);
    alert("Booking saved to My Bookings");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">Book at {center.name || center["Hospital Name"]}</h2>
            <p className="text-sm text-slate-500">{center.address || center.Address}</p>
          </div>
          <button onClick={onClose} className="text-slate-500">Close</button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Select Date (within 7 days)</label>
            <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border rounded px-3 py-2">
              {dateOptions.map((d) => <option key={d.iso} value={d.iso}>{d.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Time Slot</label>

            <p className="font-medium">Today</p>

            <p className="mt-2">Morning</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {timeSlots.Morning.map((t) => (
                <label key={t} className={`border px-3 py-1 rounded cursor-pointer ${selectedSlot === t ? "bg-sky-600 text-white" : ""}`}>
                  <input type="radio" name="slot" value={t} checked={selectedSlot === t} onChange={(e) => setSelectedSlot(e.target.value)} className="hidden" />
                  <span>{t}</span>
                </label>
              ))}
            </div>

            <p className="mt-3">Afternoon</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {timeSlots.Afternoon.map((t) => (
                <label key={t} className={`border px-3 py-1 rounded cursor-pointer ${selectedSlot === t ? "bg-sky-600 text-white" : ""}`}>
                  <input type="radio" name="slot" value={t} checked={selectedSlot === t} onChange={(e) => setSelectedSlot(e.target.value)} className="hidden" />
                  <span>{t}</span>
                </label>
              ))}
            </div>

            <p className="mt-3">Evening</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {timeSlots.Evening.map((t) => (
                <label key={t} className={`border px-3 py-1 rounded cursor-pointer ${selectedSlot === t ? "bg-sky-600 text-white" : ""}`}>
                  <input type="radio" name="slot" value={t} checked={selectedSlot === t} onChange={(e) => setSelectedSlot(e.target.value)} className="hidden" />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm mb-2">Note (optional)</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full border rounded px-3 py-2" rows="3" />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleBook} className="px-4 py-2 bg-sky-600 text-white rounded">Book FREE Center Visit</button>
        </div>
      </div>
    </div>
  );
}
