import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Button from "../../components/Button";
import HeroText from "../../components/HeroText";
import TextBox from "../../components/TextBox";
import Dropdown from "../../components/Dropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BasicInfo(){
  
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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
      <HeroText>Basic Information</HeroText>
      <Input 
        name={"name"}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}        
      />
      <p>Degree 
        <Dropdown
          label = "Degree"
          options={[
            { value: "Btech", label: "Btech" },
            { value: "BSc", label: "BSc" },
            { value: "12", label: "12th" },
          ]}
          value={selectedDegree}
          onChange={setSelectedDegree}
        />
        Status
        <Dropdown
          label="Status"
          options={[
            { value: "completed", label: "Completed" },
            { value: "pursuing", label: "Pursuing" },
            { value: "dropout", label: "Dropout" },
          ]}
          value={selectedStatus}
          onChange={setSelectedStatus}
        />
      </p>       

      <div>Introduction : </div>
      <TextBox 
        placeholder="" 
        maxLength={200} 
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      />
      <Button Click={handleSubmit} disabled={!isValid}>        
        Save
      </Button>
    </Container>
  )
}