import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookingModal from "./BookingModal";

export default function SearchResults() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const state = params.get("state") || "";
  const city = params.get("city") || "";

  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!state || !city) return;
    setLoading(true);
    fetch(`https://meddata-backend.onrender.com/data?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then((data) => {
        const mapped = (Array.isArray(data) ? data : []).map((item, idx) => ({
          id: idx,
          name: item["Hospital Name"] || item.name || "Unknown Hospital",
          address: item.Address || item.address || "Address not available",
          city: item.City || item.city || city,
          state: item.State || item.state || state,
          zip: item["ZIP Code"] || item.zip || "",
          rating: item["Hospital overall rating"] || item["Overall Rating"] || item.rating || "N/A"
        }));
        setCenters(mapped);
      })
      .catch(() => setCenters([]))
      .finally(() => setLoading(false));
  }, [state, city]);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">{centers.length} medical centers available in {city.toLowerCase()}</h1>

      {loading && <p>Loading results (backend may be slow)...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {centers.map((c) => (
          <div key={c.id} className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-2">{c.name}</h3>
            <p className="text-sm text-slate-600">{c.address}</p>
            <p className="text-sm text-slate-500 mt-1">{c.city}, {c.state} {c.zip}</p>
            <p className="mt-2 text-sm">Rating: <span className="font-medium">{c.rating}</span></p>

            <div className="mt-4 flex gap-3">
              <button onClick={() => setSelected(c)} className="bg-sky-600 text-white px-4 py-2 rounded">
                Book FREE Center Visit
              </button>
              <button className="border px-4 py-2 rounded">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {selected && <BookingModal center={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
