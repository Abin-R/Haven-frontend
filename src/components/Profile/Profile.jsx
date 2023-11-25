/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../Store/Axios";

function Profiles() {
  const [profileData, setProfileData] = useState(null);
  const { username } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get("http://127.0.0.1:8000/api/profiles/", {
          params: {
            username: username,
          },
        });
        console.log("Profile Data:", response.data);
        setProfileData(response.data);
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
        <img
          className="my-6 h-72 w-screen"
          src="https://executiveevents.in/Userfiles/Poster/45551b5fa56b451485d3a7cbd2b13cf8.jpg"
          alt=""
        ></img>
        <div className="flex flex-row">
          <div className="absolute top-48 mx-28 ml-10 w-72 mx-auto bg-white dark:bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="border-b px-4 pb-6">
              <div className="text-center my-4 ">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-500 mx-auto my-4"
                  src="https://randomuser.me/api/portraits/women/21.jpg"
                  alt=""
                ></img>
                <div className="py-2">
                <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-800 mb-1">
                {profileData.username}
</h3>

                  <div className="inline-flex text-gray-800 dark:text-gray-500 items-center">
                    {/* <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        className=""
                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                      />
                    </svg> */}
                    {profileData.email}
                    

                  </div>
                  
                </div>
                {profileData.phone}
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                <button
                  type="button"
                  className="text-white flex justify-center mx-14 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  My organization
                </button>
              </div>
              <div className="flex"></div>
            </div>
          </div>
          <div className="flex align-middle justify-end px-6 ml-96">
            <div>
              <div className="grid grid-cols-3 gap-5">
                <button className="text-white p-4 rounded bg-green-700 shadow-md flex items-center justify-center
                ">
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
                <button className="p-4 rounded bg-white text-black shadow-md flex items-center justify-center">
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
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Profile
                </button>
                <button className="p-4 rounded bg-white text-black shadow-md flex items-center justify-center">
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
                  Profile
                </button>
              </div>
              <div className="shadow-xl border border-gray-100 font-light p-8 rounded text-gray-500 bg-white mt-6">
                Raw denim you probably haven't heard of them jean shorts Austin.
                Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                Mustache cliche tempor, williamsburg carles vegan helvetica.
                Reprehenderit butcher retro keffiyeh dreamcatcher synth.
              </div>
            </div>
          </div>
        </div>
      </div>
       ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Profiles;
