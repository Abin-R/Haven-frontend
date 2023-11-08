import { Link } from "react-router-dom";
import Imagecaurosel from "../components/imagecaurosel";
import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const errorToast = (message) => {
    toast.error(message, {
      duration: 4000,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", name);
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to send FormData
          },
        }
      );

      console.log("Registration successful:", response.data);

      setShowModal(true); // Navigate to login page

      // You can handle the response data here, such as storing tokens.
    } catch (error) {
      // alert("Error: " + error);
      errorToast("Failed to register. Please try again.");
      // setLoading(false);
    }
  };

  return (
    <div>
      <div className="h-screen lg:flex">
        <Imagecaurosel />
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <Link to="/">
            <div className="text-2xl text-indigo-800 tracking-wide font-semibold flex justify-center mt-16">
              Welcome To
              <img
                className="h-5 w-auto mt-2 ml-3"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Haven_Holiday_Wordmark.svg/1280px-Haven_Holiday_Wordmark.svg.png"
                alt="Haven Holiday"
              />
            </div>
          </Link>

          <div className="mt-5 px-8 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
              Register
            </h2>
            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="text-sm font-bold text-gray-700 ">
                    Username
                  </div>
                  <input
                    className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="name"
                    placeholder="abin"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <div className="text-sm font-bold text-gray-700 ">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="mike@gmail.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <div className="text-sm font-bold text-gray-700 ">
                    Password
                  </div>

                  <input
                    className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-10">
                  <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                    Sign up
                  </button>
                </div>
              </form>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                Already have an account!{" "}
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
                  Email to activate your account has been sent to {email}. Please
                  check your inbox.
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Register;
