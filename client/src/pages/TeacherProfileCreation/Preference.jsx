
// import { useState } from "react";
// import Button from "../../components/Button";

// export default function Preference({ onSave, initialData = {} }) {
//   const [formData, setFormData] = useState({
//     subjects: initialData.subjects || [],
//     areas: initialData.areas || [],
//     standard: initialData.standard || "",
//     experience: initialData.experience || "",
//     achievement: initialData.achievement || "",
//     outcome: initialData.outcome || "",
//     ...initialData,
//   });

//   const [errors, setErrors] = useState({});

//   const validators = {
//     achievement: (val) =>
//       val.length > 200 ? "Achievement must be under 200 characters" : "",
//     outcome: (val) =>
//       val.length > 200 ? "Outcome must be under 200 characters" : "",
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const handleMultiSelectChange = (name, value) => {
//     setFormData((prev) => {
//       const currentArray = prev[name] || [];
//       const isSelected = currentArray.includes(value);

//       return {
//         ...prev,
//         [name]: isSelected
//           ? currentArray.filter((item) => item !== value)
//           : [...currentArray, value],
//       };
//     });
//   };

//   const handleSave = () => {
//     const newErrors = {};

//     // Validate text fields
//     Object.keys(validators).forEach((field) => {
//       const error = validators[field](formData[field] || "");
//       if (error) newErrors[field] = error;
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Call parent's save function
//     if (onSave) {
//       onSave(formData);
//     }
//   };

//   const subjectOptions = [
//     "Mathematics",
//     "Physics",
//     "Chemistry",
//     "Biology",
//     "English",
//     "History",
//     "Geography",
//     "Computer Science",
//     "Economics",
//     "Literature",
//   ];

//   const areaOptions = [
//     "North Delhi",
//     "South Delhi",
//     "East Delhi",
//     "West Delhi",
//     "Central Delhi",
//     "Gurgaon",
//     "Noida",
//     "Faridabad",
//     "Ghaziabad",
//   ];

//   const standardOptions = [
//     { value: "", label: "Select Standard" },
//     { value: "1-5", label: "Grade 1-5" },
//     { value: "6-8", label: "Grade 6-8" },
//     { value: "9-10", label: "Grade 9-10" },
//     { value: "11-12", label: "Grade 11-12" },
//     { value: "undergraduate", label: "Undergraduate" },
//     { value: "postgraduate", label: "Postgraduate" },
//   ];

//   const experienceOptions = [
//     { value: "", label: "Select Experience" },
//     { value: "0-1", label: "0-1 years" },
//     { value: "1-3", label: "1-3 years" },
//     { value: "3-5", label: "3-5 years" },
//     { value: "5-10", label: "5-10 years" },
//     { value: "10+", label: "10+ years" },
//   ];

//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Subject ? <span className="text-red-500">*</span>
//         </label>
//         <div className="border border-gray-300 rounded-md p-2 max-h-32 overflow-y-auto">
//           <div className="text-sm text-gray-600 mb-2">
//             Select multiple subjects:
//           </div>
//           {subjectOptions.map((subject) => (
//             <label key={subject} className="flex items-center space-x-2 py-1">
//               <input
//                 type="checkbox"
//                 checked={formData.subjects.includes(subject)}
//                 onChange={() => handleMultiSelectChange("subjects", subject)}
//                 className="rounded"
//               />
//               <span className="text-sm">{subject}</span>
//             </label>
//           ))}
//         </div>
//         <div className="text-xs text-gray-500 mt-1">
//           Selected: {formData.subjects.join(", ") || "None"}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Area ? <span className="text-red-500">*</span>
//         </label>
//         <div className="border border-gray-300 rounded-md p-2 max-h-32 overflow-y-auto">
//           <div className="text-sm text-gray-600 mb-2">
//             Select multiple areas:
//           </div>
//           {areaOptions.map((area) => (
//             <label key={area} className="flex items-center space-x-2 py-1">
//               <input
//                 type="checkbox"
//                 checked={formData.areas.includes(area)}
//                 onChange={() => handleMultiSelectChange("areas", area)}
//                 className="rounded"
//               />
//               <span className="text-sm">{area}</span>
//             </label>
//           ))}
//         </div>
//         <div className="text-xs text-gray-500 mt-1">
//           Selected: {formData.areas.join(", ") || "None"}
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Standard ?
//           </label>
//           <select
//             name="standard"
//             value={formData.standard}
//             onChange={handleInputChange}
//             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#42D4BC]"
//           >
//             {standardOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Yrs. of Exp
//           </label>
//           <select
//             name="experience"
//             value={formData.experience}
//             onChange={handleInputChange}
//             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#42D4BC]"
//           >
//             {experienceOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Achievement
//         </label>
//         <textarea
//           name="achievement"
//           value={formData.achievement}
//           onChange={handleInputChange}
//           placeholder="Describe your key achievements in teaching or academics..."
//           className="w-full border border-gray-300 rounded-md p-3 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#42D4BC]"
//           maxLength={200}
//         />
//         <div className="flex justify-between items-center mt-1">
//           <span className="text-xs text-red-500">{errors.achievement}</span>
//           <span className="text-sm text-gray-500">
//             {formData.achievement.length} / 200
//           </span>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Outcome
//         </label>
//         <textarea
//           name="outcome"
//           value={formData.outcome}
//           onChange={handleInputChange}
//           placeholder="Describe the positive outcomes or results you've achieved with students..."
//           className="w-full border border-gray-300 rounded-md p-3 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#42D4BC]"
//           maxLength={200}
//         />
//         <div className="flex justify-between items-center mt-1">
//           <span className="text-xs text-red-500">{errors.outcome}</span>
//           <span className="text-sm text-gray-500">
//             {formData.outcome.length} / 200
//           </span>
//         </div>
//       </div>

//       <Button onClick={handleSave} className="w-full mt-6">
//         Save Preferences
//       </Button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Button from "../../components/Button";
import HeroText from "../../components/HeroText";
import TextBox from "../../components/TextBox";
import Dropdown from "../../components/Dropdown";
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Preference(){
  
  const [subject, setSubject] = useState([]);
  const [area, setArea] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [standard, setStandard] = useState([]);
  const [experience, setExperience] = useState("");
  const [achievement, setAchievement] = useState("");
  const [outcome, setOutcome] = useState("");
  const subjectOptions = [
    { value: 'physics', label: "Physics" },
    { value: 'chemistry', label: "Chemistry" },
    { value: 'maths', label: "Mathematics" },
    { value: 'biology', label: "Biology" },
    { value: 'english', label: "English" },
    { value: 'hindi', label: "Hindi" },
    { value: 'history', label: "History" },
    { value: 'geography', label: "Geography" },
  ];

  const areaOptions = [];

  const handleSubmit = async () => {
    try {
      // const res = await axios.post("/api/auth/signup", form);
      alert(res.data.message);
      // localStorage.setItem("otp_email", form.email); // Save email
      // navigate("/otp"); // Redirect to OTP page
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container>
      <HeroText>Preference</HeroText>    
      <MultiSelectDropdown
        label="Subjects"
        options={subjectOptions}
        selectedValues={subject}
        onChange={setSubject}
        placeholder="Multiselect List"
        width="300px"
      />
      <MultiSelectDropdown
        label="Areas"
        options={areaOptions}
        selectedValues={area}
        onChange={setArea}
        placeholder="Multiselect List"
        width="300px"
      />
      <p>   Standard
            <Dropdown
                label="Standard"
                options={[
                    {value: 'HS', label: "High School" },
                    {value: '10', label: "10" },
                    {value: '9', label: "9" },
                    {value: '8', label: "8" },
                    {value: '7', label: "7" },
                    {value: '6', label: "6" }
                ]}
                value={standard}
                onChange={setStandard}
                placeholder="Select Standard"
            />
            Experience
            <Dropdown
                label="Experience"
                options={[
                    {value: '0-1', label: "0-1 yrs of exp" },
                    {value: '1-3', label: "1-3 yrs of exp" },
                    {value: '3+', label: "3+ yrs of exp" },
                ]}
                value={experience}
                onChange={setExperience}
                placeholder="Select Experience"
            />  
      </p>
      
      <div>Achievement : </div>
      <TextBox 
        placeholder="" 
        maxLength={200} 
        value={achievement}
        onChange={(e) => setAchievement(e.target.value)}
      />
      <div>Outcome : </div>
      <TextBox 
        placeholder="" 
        maxLength={200} 
        value={outcome}
        onChange={(e) => setOutcome(e.target.value)}
      />
      <Button Click={handleSubmit} disabled={!isValid}>        
        Save
      </Button>
    </Container>  
  )
}

