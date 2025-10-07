import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <Link to="/" className="text-sky-600">Go back home</Link>
    </div>
  );
}
