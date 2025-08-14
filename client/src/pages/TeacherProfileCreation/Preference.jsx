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