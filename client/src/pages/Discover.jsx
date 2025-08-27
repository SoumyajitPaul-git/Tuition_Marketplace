import React, { useState } from "react";
import TeacherList from "../components/TeacherList";
import Filters from "../components/Filters";

const Discover = () => {
  const [filters, setFilters] = useState({
    area: "",
    subject: "",
    experience: "",
  });

  // Hardcoded teacher data (replace later with API fetch)
  const teachers = [
    {
      id: 1,
      name: "Ms. Sunita Goyal",
      subject: "Math Teacher",
      experience: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Mr. Rajeev Sharma",
      subject: "Science Teacher",
      experience: 3,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Ms. Ritu Kapoor",
      subject: "English Teacher",
      experience: 7,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  // Apply filters
  const filteredTeachers = teachers.filter((teacher) => {
    return (
      (!filters.subject || teacher.subject.includes(filters.subject)) &&
      (!filters.experience ||
        (filters.experience === "1-3" && teacher.experience <= 3) ||
        (filters.experience === "3-5" &&
          teacher.experience >= 3 &&
          teacher.experience <= 5) ||
        (filters.experience === "5+" && teacher.experience > 5))
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Discover Teachers</h2>
      <Filters filters={filters} setFilters={setFilters} />
      <TeacherList teachers={filteredTeachers} />
    </div>
  );
};

export default Discover;
