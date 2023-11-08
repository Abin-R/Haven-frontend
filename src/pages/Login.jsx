import { useState } from "react";
import Imagecaurosel from "../components/imagecaurosel";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
// import axiosInstance from "../Store/Axios";

function Login() {
  const history = useNavigate();
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const errorToast = (message) => {
    toast.error(message, {
      duration: 4000, // Duration for which the toast message will be displayed (in milliseconds)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Name.trim() || !password.trim()) {
      errorToast("Please enter both username and password");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        {
          username: Name,
          password: password,
        }
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      console.log("Stored access token:", localStorage.getItem("access_token"));
      console.log(
        "Stored refresh token eeeeee:",
        localStorage.getItem("refresh_token")
      );

      console.log("Full response data:", response.data);

      // Check the 'access_token' property specifically
      console.log("Access token received:", response.data.access);
      localStorage.setItem("username", response.data.username);
      //   localStorage.setItem("id", response.data.id);

      dispatch({
        type: "SET_USER_DATA",
        payload: {
          username: response.data.username,
          userId: response.data.id,
          role: response.data.role === "admin" ? "admin" : "user", // Check admin status or adjust according to your data
          isAuthenticated: true,
          // Add other relevant user data here
        },
      });
      history("/");
    } catch (error) {
      if (error.response.status === 401) {
        // If username/password is incorrect, it will return a 400 status
        errorToast("Incorrect username or password");
      } else if (error.response.status === 400) {
        // Add similar condition for other types of error if needed
        // For example, 401 status denotes unauthorized access
        errorToast("Unauthorized access");
      } else {
        console.error("Error:", error);
        errorToast("Something went wrong. Please try again later");
      }
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
              Log in
            </h2>
            <div className="mt-12">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Username
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Mike"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                    <div>
                      <Link
                        to="/forgot-password"
                        className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-10">
                  <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                    Log In
                  </button>
                </div>
              </form>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                no have an account ?{" "}
                <Link
                  to="/register"
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ style: { borderRadius: "8px" } }}
        />
      </div>
    </div>
  );
}
export default Login;
