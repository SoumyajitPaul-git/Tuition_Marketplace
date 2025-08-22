import React from "react";

const TeacherCard = ({ teacher }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center w-56 hover:shadow-lg transition">
      <img
        src={teacher.image}
        alt={teacher.name}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
      <p className="text-sm text-gray-600">{teacher.subject}</p>
      <p className="text-xs text-gray-500">{teacher.experience} yrs exp</p>
      <button className="mt-3 px-4 py-2 bg-green-500 text-white text-sm rounded-xl hover:bg-green-600">
        View Profile
      </button>
    </div>
  );
};

export default TeacherCard;
