import NavbarAdmin from "../../components/Navbar";
import { useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { IoCalendarOutline } from "react-icons/io5";
// // import axios from "axios";
// import { parseISO, format } from "date-fns";
import axiosInstance from "../../Store/Axios";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function CreatePosts() {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    image: null,
  });

  const history = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const accessToken = localStorage.getItem("access_token")
      console.log("----" ,accessToken)

      // Check if 'organizer' is present in formData

      console.log(formDataToSend);
      await axiosInstance.post(
        `http://127.0.0.1:8000/post/create-post/${eventId}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${accessToken}`,
            // Add any other headers as needed
          },
        }
      );

      // Reset form data after successful submission if needed
      setFormData({
        
        description: "",
        location: "",
        screenshot: null,
      });

      history("/your-events")
      // Handle any other post-submission logic or redirection
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log(error.response);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="mt-36 flex justify-center font-bold text-4xl">
        Create Post
      </div>
      <div
        className="w-full mt-20  md:max-w-full mx-auto"
        style={{ width: "900px" }}
      >
        <div className="py-8  border border-gray-300 sm:rounded-md">
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="mx-16"
          >
            
            <label className="block mb-6">
              <span className="text-gray-700 font-bold">Description</span>
              <textarea
                name="description"
                className="
            block
            w-full
            mt-2
            border-gray-800
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                rows="4"
                placeholder="Please add as much details as possible."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </label>
            
            
            
            <label className="block mb-6">
              <span className="text-gray-700 font-bold">completion status</span>
              <textarea
                name="location"
                className="
            block
            w-full
            mt-2
            border-gray-800
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                rows="4"
                placeholder="Please add as much details as possible."
                value={formData.location}
                onChange={handleChange}
              ></textarea>
            </label>
            
            <label className="block mb-6">
              <span className="text-gray-700 font-bold py-2">Image</span>
              <input
                name="image" // Make sure this matches the expected key on the server
                type="file"
                className="py-2 block w-full mt-1 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={handleImageChange}
              />
            </label>

            <div className="mb-6">
              <button
                type="submit"
                className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
              >
                Submit
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePosts;
