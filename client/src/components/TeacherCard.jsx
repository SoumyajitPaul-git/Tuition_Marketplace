import React from "react";
import Button from "./Button";

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
      
      <Button className="m-2">View Profile</Button>
    </div>
  );
};

export default TeacherCard;
