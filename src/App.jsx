import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import SearchResults from "./components/SearchResults";
import MyBookings from "./components/MyBookings";
import NotFound from "./components/NotFound";
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto max-w-8xl px-5">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-lg">Medify</h4>
            <p className="text-sm mt-2">Find medical centers and book visits easily.</p>
          </div>
          <div>
            <h5 className="font-semibold">Quick Links</h5>
            <ul className="mt-2 text-sm space-y-1">
              <li>Find Doctors</li>
              <li>Hospitals</li>
              <li>Medicines</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Download App</h5>
            <div className="mt-3 flex gap-3">
              <div className="bg-white/10 px-3 py-2 rounded">App Store</div>
              <div className="bg-white/10 px-3 py-2 rounded">Google Play</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 text-slate-400 text-sm py-3 text-center">© {new Date().getFullYear()} MedFinder</div>
      </footer>
    </div>
  );
}
