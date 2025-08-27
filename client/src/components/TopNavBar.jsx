import { use } from "react";
import { FaArrowLeft, FaCog } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function TopNavBar() {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    }

  return (
    <div className="flex justify-between items-center w-full mb-4 px-4 py-1 lg:px-8 bg-[#70e8d4]">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="p-2 hover:bg-gray-400 bg-yellow-500 rounded-full transition-colors"
        aria-label="Go back"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Right Action Buttons */}
      <div className="flex gap-2">
        <button className="bg-blue-700 p-2 rounded-full hover:opacity-80 transition-opacity">
          <IoHome size={20} />
        </button>
        {/* <button className="bg-cyan-300 p-2 rounded-full hover:opacity-80 transition-opacity">
          <IoIosSettings />
        </button> */}
        <button className="bg-purple-500 p-2 rounded-full hover:opacity-80 transition-opacity">
          <FaCog size={20} />
        </button>
      </div>
    </div>
  );
}
