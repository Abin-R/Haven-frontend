/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Imagecaurosel from "../../components/imagecaurosel";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import  { Toaster } from 'react-hot-toast';
// import axiosInstance from "../Store/Axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const errorToast = (message) => {
    toast.error(message, {
      duration: 4000, // Duration for which the toast message will be displayed (in milliseconds)
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/forgot-password/",
        { email }
      );
      console.log(response.data);
      setShowModal(true);
      // Handle success message or UI changes after the email is sent
    } catch (error) {
      console.error(error);
      errorToast("An error occurred. Please try again.");

      // Handle error message or UI changes in case of an error
    }
  };

  return (
    <div>
      <div className="h-screen lg:flex">
        <Imagecaurosel />
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="py-12  lg:bg-white flex justify-center lg:justify-start lg:px-12"></div>
          <Link to="/">
            <div className="text-2xl text-indigo-800 tracking-wide font-semibold flex justify-center ">
              Welcome To
              <img
                className="h-5 w-auto mt-2 ml-3"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Haven_Holiday_Wordmark.svg/1280px-Haven_Holiday_Wordmark.svg.png"
                alt="Haven Holiday"
              />
            </div>
          </Link>

          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
              Confirm Email
            </h2>
            <div className="mt-12">
              <form onSubmit={handleSubmit}>
                <div className="mt-8">
                  <div className="text-sm font-bold text-gray-700">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="mike@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mt-10">
                  <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                    Submit
                  </button>
                </div>
              </form>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                Go Back ?{" "}
                <Link
                  to="/login"
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          id="popup-modal"
          className="fixed top-1/2 left-1/2  z-50 py-56 px-96  overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Email to reset password has been sent to your email. Please
                  check your inbox.
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ style: { borderRadius: "8px" } }}
      />
    </div>
  );
}

export default ForgotPassword;
