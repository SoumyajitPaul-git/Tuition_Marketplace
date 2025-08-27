import React from "react";

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex gap-4 flex-wrap">
      <select
        value={filters.area}
        onChange={(e) => setFilters({ ...filters, area: e.target.value })}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Select Area</option>
        <option value="South Kolkata">South Kolkata</option>
        <option value="North Kolkata">North Kolkata</option>
      </select>

      <select
        value={filters.subject}
        onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Select Subject</option>
        <option value="Maths">Maths</option>
        <option value="Science">Science</option>
        <option value="English">English</option>
      </select>

      <select
        value={filters.experience}
        onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Years of Exp</option>
        <option value="1-3">1-3 yrs</option>
        <option value="3-5">3-5 yrs</option>
        <option value="5+">5+ yrs</option>
      </select>
    </div>
  );
};

export default Filters;
