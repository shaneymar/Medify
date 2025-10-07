import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Stethoscope, FlaskConical, Hospital, Pill, Ambulance } from "lucide-react";
import Hero from "../assets/hero_image.png";

export default function Landing() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://meddata-backend.onrender.com/states")
      .then((res) => res.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then((res) => res.json())
        .then(setCities);
    }
  }, [selectedState]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-50 w-full py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-4xl font-semibold leading-tight">
            Skip the travel! Find Online <br />
            <span className="text-6xl font-bold">Medical</span>{" "}
            <span className="text-blue-600 text-6xl font-bold">Centers</span>
          </h1>
          <p className="text-gray-600">
            Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
          </p>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
          >
            Find Centers
          </button>
        </div>
        <div className="flex justify-center">
          <img src={Hero} alt="Doctors" className="w-96 md:w-[600px]" />
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-2xl max-w-6xl items-center mx-auto p-4 mt-[-150px]">
        <form
          onSubmit={handleSearch}
          className="max-w-4xl mx-auto mt-10 p-6 flex flex-col md:flex-row items-center gap-4 justify-between"
        >
          <div id="state" className="flex items-center border rounded-md px-3 w-full md:w-1/3">
            <Search className="text-gray-400 w-4 h-4 mr-2" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="outline-none w-full text-sm text-gray-700 p-2"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </div>

          <div id="city" className="flex items-center border rounded-md px-3 w-full md:w-1/3">
            <Search className="text-gray-400 w-4 h-4 mr-2" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="outline-none w-full text-sm text-gray-700 p-2"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>

          <button
            id="searchBtn"
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Categories Section */}
        <div className="max-w-5xl mx-auto mt-10 text-center">
          <h3 className="text-gray-700 mb-4 font-medium">You may be looking for</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <CategoryCard icon={<Stethoscope />} label="Doctors" />
            <CategoryCard icon={<FlaskConical />} label="Labs" />
            <CategoryCard icon={<Hospital />} label="Hospitals" active />
            <CategoryCard icon={<Pill />} label="Medical Store" />
            <CategoryCard icon={<Ambulance />} label="Ambulance" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ icon, label, active }) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-4 rounded-xl border ${
        active ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
      } transition`}
    >
      <div className="text-blue-600 mb-2">{icon}</div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}
