import NavbarAdmin from "../../components/Navbar";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";
// import axios from "axios";
import { parseISO, format } from "date-fns";
import axiosInstance from "../../Store/Axios";
import { useNavigate } from "react-router-dom";

function YourEvents() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: null,
    end_date: null,
    cost: "",
    location: "",
    category: "",
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

  const handleDateChange = (date, field) => {
    // Parse the date string using parseISO
    const parsedDate = typeof date === "string" ? parseISO(date) : date;

    // Update the field name to 'start_date'
    const formattedDate = format(parsedDate, "yyyy-MM-dd");
    setFormData((prevData) => ({
      ...prevData,
      [field]: formattedDate,
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
        "http://127.0.0.1:8000/event/create-event/",
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
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        cost: "",
        location: "",
        category: "",
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
        Create Venue Event
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
            <label className="block mb-6 ">
              <span className="text-gray-700 font-bold">Title</span>
              <input
                name="title"
                type="text"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder="Joe Bloggs"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
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
            <div className="relative mb-3 w-1/2 pr-2">
              <label className="date-picker-label font-bold mb-6">
                Select a start date
              </label>
              <div className="date-picker-container flex flex-row mt-3">
                <DatePicker
                  selected={
                    formData.start_date ? parseISO(formData.start_date) : null
                  }
                  onChange={(date) => handleDateChange(date, "start_date")}
                  placeholderText="Start date"
                  className="date-picker-input"
                />

                <IoCalendarOutline
                  className="calendar-icon mr-5 mt-1 "
                  style={{ width: "60px" }}
                />
              </div>
            </div>
            <div className="relative mb-3 w-1/2 pr-2 py-7">
              <label className="date-picker-label font-bold mb-6">
                Select an end date
              </label>
              <div className="date-picker-container flex flex-row mt-3">
                <DatePicker
                  selected={
                    formData.end_date ? parseISO(formData.end_date) : null
                  }
                  onChange={(date) => handleDateChange(date, "end_date")}
                  placeholderText="End date"
                  className="date-picker-input"
                />
                <IoCalendarOutline
                  className="calendar-icon mr-5 mt-1 "
                  style={{ width: "60px" }}
                />
              </div>
            </div>
            <label className="block mb-6">
              <span className="text-gray-700 font-bold">Cost</span>
              <input
                name="cost"
                type="text"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder="----"
                value={formData.cost}
                onChange={handleChange}
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-700 font-bold">Location</span>
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
              <span className="text-gray-700 font-bold">Category</span>
              <input
                name="category"
                type="text"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder="----"
                value={formData.category}
                onChange={handleChange}
              />
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

export default YourEvents;
