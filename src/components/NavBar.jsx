import React from "react";
import { Link, useLocation } from "react-router-dom";
import Medify from '../assets/medify.png';

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <header className="bg-white shadow-sm">
      <div className="bg-blue-600 text-white text-center text-xs py-1">
        The health and well-being of our patients and their healthcare team will
        always be our priority.
      </div>
      <nav className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        <Link to="/" className="text-lg font-semibold text-blue-600">
          <img
            src={Medify}
            alt="logo"
            className="w-36 h-10"
          />
          
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 items-center">
          <Link to="/">Find Doctors</Link>
          <Link to="/">Hospitals</Link>
          <Link to="/">Medicines</Link>
          <Link to="/">Surgeries</Link>
          <Link to="/">Facilities</Link>
          <Link
          to="/my-bookings"
          className={`px-4 py-2 text-sm rounded-md font-medium ${
            pathname === "/my-bookings"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
        >
          My Bookings
        </Link>
        </div>

        
      </nav>
    </header>
  );
}
