/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import html2pdf from 'html2pdf.js';

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../Store/Axios";

import EditProfileModal from "./EditProfileModal";
import Ticket from "../Ticket/Ticket";

function Profiles() {
  const downloadAsPDF = () => {
    const content = document.getElementById('modalContent'); // Specify the ID of your modal content

    const pdfOptions = {
      margin: 10,
      filename: 'ticket.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(content).set(pdfOptions).save();
  };
  
  const [profileData, setProfileData] = useState(null);
  const [booking, setBooking] = useState(null);
  const { username } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpens, setIsModalOpens] = useState(false);

  

  const openModal = () => {
    setIsModalOpens(true);
  };

  const closeModal = () => {
    setIsModalOpens(false);
  };

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("profileImage", file);

        // Send the image to the backend using axios or your preferred HTTP library
        const response = await axiosInstance.post(
          "https://haven.abinr.xyz/api/upload-profile-image/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Assuming the backend returns the updated profile data
        setProfileData(response.data);

        // You can perform additional actions based on the response
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/api/profiles/",
          {
            params: {
              username: username,
            },
          }
        );
        console.log("Profile Data:", response.data);
        setProfileData(response.data.user_profile);
        setBooking(response.data.bookings);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [username]);

  return (
    <>
      {profileData ? (
        <div>
          <div className="relative">
            <img
              className="my-6 h-52 w-screen"
              src="https://executiveevents.in/Userfiles/Poster/45551b5fa56b451485d3a7cbd2b13cf8.jpg"
              alt=""
            ></img>
          </div>

          <div className="flex flex-row">
            <div className="absolute top-48 mx-24 ml-8 w-72 bg-white dark:bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="border-b px-4 pb-6">
                <div className="text-center my-4 relative">
                  <img
                    className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-500 mx-auto my-4 cursor-pointer"
                    src={
                      profileData.image
                        ? `http://127.0.0.1:8000${profileData.image}`
                        : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                    }
                    alt=""
                  />
                  <label htmlFor="profileImageInput">
                    <div className="flex items-center justify-center border-black  hover:text-white border absolute top-20 right-16  hover:bg-teal-600  w-10 h-10 bg-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 text-black hover:text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                        />
                      </svg>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="profileImageInput"
                    className="hidden"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <div className="py-2">
                    <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-800 mb-1">
                      {profileData.username}
                    </h3>
                    <div className="inline-flex text-gray-800 dark:text-gray-500 items-center">
                      {profileData.email}
                    </div>
                    {profileData.phone}
                  </div>
                </div>
              </div>
              <div className="px-4 py-4">
                <div className="flex gap-2 items-center text-gray-800 dark:text-gray-400 mb-4">
                  <p className="ml-20">Hi I am {profileData.username}</p>
                </div>
                <div className="flex"></div>
              </div>
            </div>
            <div className="flex align-middle justify-end px-11 ml-80">
              <div>
                <div className="grid grid-cols-3 gap-5">
                  <button
                    className={` p-4 rounded shadow-md flex items-center justify-center ${
                      activeTab === "home"
                        ? "text-white bg-teal-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleTabClick("home")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </button>
                  <button
                    className={` p-4 rounded shadow-md flex items-center justify-center ${
                      activeTab === "profile"
                        ? " text-white bg-teal-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleTabClick("profile")}
                  >
                    <svg
                      className="h-8 mx-2 w-8 "
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="12" cy="12" r="9" />{" "}
                      <line x1="12" y1="8" x2="12.01" y2="8" />{" "}
                      <polyline points="11 12 12 12 12 16 13 16" />
                    </svg>
                    Profile
                  </button>
                  {/* <button
                    className={`p-4 rounded shadow-md flex items-center justify-center ${
                      activeTab === "about"
                        ? "text-white bg-teal-600"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleTabClick("about")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                    About
                  </button> */}
                </div>
                <div className="shadow-xl border border-gray-100 font-light px-8 py-6 rounded text-gray-500 bg-white mt-6">
                  {/* Content based on the active tab */}
                  {activeTab === "home" && (
                    <div style={{ width: "790px" }}>
                      <h3 className="text-lg font-extrabold text-black">
                        Attending Events
                      </h3>
                      <div>
                        {booking.map(
                          (booking) =>
                            booking.booking_status === "CONFIRMED" && (
                              <div
                                key={booking.id}
                                className="flex flex-col mt-5"
                              >
                                <div
                                  className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-2xl md:max-w-6xl mx-auto border border-white bg-gray-100"
                                  style={{ width: "800px" }}
                                >
                                  <div className="w-full md:w-44 bg-gray-10 grid place-items-center">
                                    <img
                                      src={`http://127.0.0.1:8000${booking.event.image}`}
                                      alt="event image"
                                      className="rounded-xl"
                                    />
                                  </div>
                                  <div className="w-full md:w-2/3 bg-gray-10 flex flex-col space-y-2 p-3">
                                    <h3 className="font-black text-gray-700 md:text-2xl text-xl">
                                      {booking.event.title}
                                    </h3>
                                    <p className="md:text-lg text-gray-500 text-base">
                                      {new Date(
                                        booking.event.start_date
                                      ).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </p>
                                    <div className="flex ">
                                      {/* Use a template literal to include the booking ID in the URL */}
                                      <button
                                        onClick={openModal}
                                        className="py-2  flex flex-row px-6 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-black dark:hover:bg-gray-200"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={2}
                                          stroke="black"
                                          className="w-5 h-6 mr-2"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                          />
                                        </svg>

                                        <span>View Tickets</span>
                                      </button>

                                      <Link to={`/invoice/${booking.id}`}>
                                        {/* Use a template literal to include the booking ID in the URL */}
                                        <button className="py-2 mx-4 flex flex-row px-6 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-black dark:hover:bg-gray-200">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="black"
                                            className="w-5 h-5 mr-2"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                            />
                                          </svg>

                                          <span>View Invoice</span>
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}
                  {activeTab === "profile" && (
                    <>
                      <div>
                        <div
                          className="flex mb-6 flex-row justify-between "
                          style={{ width: "790px" }}
                        >
                          <h4 className="text-lg font-extrabold text-black">
                            About
                          </h4>
                          <button
                            onClick={handleEditClick}
                            className="flex flex-row  text-white bg-green-600 hover:bg-green-800    rounded-lg px-3 py-0.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
                          >
                            <svg
                              className="h-5 w-5 my-1 mx-1 text-black"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <span className="font-semibold mt-0.5">Edit</span>
                          </button>
                        </div>
                        {/* <hr className=" "></hr> */}
                        <h3 className="text-lg flex flex-col mt-2 font-semibold">
                          <span className="font-semibold text-base mb-2">
                            Name
                          </span>{" "}
                          <span className="mx-2 text-lg text-gray-400">
                            {profileData.username && (
                              <p>
                                {profileData.username.charAt(0).toUpperCase() +
                                  profileData.username.slice(1)}
                              </p>
                            )}
                          </span>
                        </h3>
                        <hr className="my-2 "></hr>
                        <h3 className="text-lg flex flex-col mt-2 font-semibold">
                          <span className="font-semibold text-base mb-2">
                            Address
                          </span>{" "}
                          <span className="mx-2 text-lg text-gray-400">
                            <p>
                              {profileData.address
                                ? profileData.address
                                : "No address available"}
                            </p>
                          </span>
                        </h3>
                        <hr className="my-2 "></hr>
                        <h3 className="text-lg flex flex-col mt-2 font-semibold">
                          <span className="font-semibold text-base mb-2">
                            Country
                          </span>{" "}
                          <span className="mx-2 text-lg text-gray-400">
                            <p>
                              {profileData.country
                                ? profileData.country
                                : "No address available"}
                            </p>
                          </span>
                        </h3>
                        <hr className="my-2 "></hr>
                        <h3 className="text-lg flex flex-col mt-2 font-semibold">
                          <span className="font-semibold text-base mb-2">
                            Zip Code
                          </span>{" "}
                          <span className="mx-2 text-lg text-gray-400">
                            <p>
                              {profileData.zipcode
                                ? profileData.zipcode
                                : "No address available"}
                            </p>
                          </span>
                        </h3>
                      </div>
                    </>
                  )}
                  {/* {activeTab === "about" && (
                    <p>
                      {" "}
                      Raw denim you probably haven't heard of them jean shorts
                      akash Austin. Nesciunt tofu stumptown aliqua, retro synth
                      master cleanse. Mustache cliche tempor, williamsburg
                      carles vegan helvetica. Reprehenderit butcher retro
                      keffiyeh dreamcatcher synth.
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <EditProfileModal
              onClose={handleCloseModal}
              initialData={{
                username: profileData.username,
                address: profileData.address,
                country: profileData.country,
                zipcode: profileData.zipcode,
              }}
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {isModalOpens && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-opacity-40 bg-white p-4 rounded-xl ">
            {/* Modal content goes here */}
            <div className="flex justify-end mr-8">
              <button
                onClick={closeModal}
                className="flex justify-end items-end right-1 "
              >
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

            </div>
            
            <button onClick={downloadAsPDF} className="bg-blue-500 text-white py-2 px-4 rounded">
            Download as PDF
          </button>
          <div id="modalContent">

            <Ticket />
          </div>

            {/* Close button */}
          </div>
        </div>
      )}
    </>
  );
}

export default Profiles;
