/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Imagecaurosel from "../components/imagecaurosel";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: Name,
        password: password,
      });
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
          role: response.data.role , // Check admin status or adjust according to your data
          isAuthenticated: true,
          // Add other relevant user data here
        },
      });
      history("/")
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
          <div className="py-8  lg:bg-white flex justify-center lg:justify-start lg:px-12"></div>
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

          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt- xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-2xl text-indigo-900 font-display font-semibold lg:text-left xl:text-4xl
                    xl:text-bold"
            >
              Log in
            </h2>
            <div className="mt-10">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Username
                  </div>
                  <input
                    className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Mike"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5">
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
                    className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
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

              <div className="my-4 px-4 border-b text-center">
                <div className="leading-none px-4 inline-block text-sm text-stone-300 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign in with Google
                </div>
              </div>
            </div>
          </div>

          <button className="w-60 h-14  mr-60 ml-48 mt-8 max-w-xs font-bold shadow-sm rounded-lg py-4 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
            <div className="bg-white  rounded-full">
              {/* <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                    fill="#34a853"
                  />
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                    fill="#ea4335"
                  />
                </svg> */}
            </div>
            <GoogleOAuthProvider className="bg-red" clientId="591332327561-qqkbkghu0ddnmngvju4e1s9jgfi4rj44.apps.googleusercontent.com">
              <div >

              <GoogleLogin containerProps={{
                    style: {
                      width: "100% !important",
                      color:"red"
                    },
                  }}
                  text="continue_with"
                  theme="outline"
                  width="100%"
                onSuccess={async (credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded)
                  try {
                    const response = await axios.post(
                      "http://127.0.0.1:8000/api/google-auth/",
                      {
                        idToken: credentialResponse.credential,
                        email: decoded.email,
                        username : decoded.name
                      }
                    );

                    if (response.status === 200) {
                      const { access_token, refresh_token } = response.data;

                      localStorage.setItem("access_token", access_token);
                      localStorage.setItem("refresh_token", refresh_token);
                      localStorage.setItem("username", response.data.username);

                      console.log(
                        "Access token:",
                        localStorage.getItem("access_token")
                      );
                      console.log(
                        "Refresh token:",
                        localStorage.getItem("refresh_token")
                      );
                      console.log("---------------------",response.data)
                      dispatch({
                        type: "SET_USER_DATA",
                        payload: {
                          username: response.data.username,
                          userId: response.data.id,
                          role:
                            response.data.role ,
                          isAuthenticated: true,
                          // Add other relevant user data here
                        },
                      });
                      if (response.data.role === "admin") {
                        history.push("/dashboard");
                      } else {
                        console.log("------------------",response.data.role)
                        history.push("/");
                      }
                      // Redirect or perform any other actions
                    } else {
                      console.error("Verification failed:", response.data);
                    }
                  } catch (error) {
                    console.error("Error verifying user:", error);
                  }
                }}
              />
              </div>
            </GoogleOAuthProvider>
          </button>
          <div className="mt-8 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account ?{" "}
            <Link
              to="/register"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Sign up
            </Link>
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
