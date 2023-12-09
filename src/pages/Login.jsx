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
      console.log(response.data)
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", response.data.username);
      //   localStorage.setItem("id", response.data.id);

      dispatch({
        type: "SET_USER_DATA",
        payload: {
          username: response.data.username,
          userId: response.data.userId,
          role: response.data.role,
          reneue: response.data.reneue,
          image:response.data.profileImage,          // Check admin status or adjust according to your data
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
      <div className="h-screen lg:flex md:w-screen">
        <Imagecaurosel />
        <div className="lg:w-1/2 xl:max-w-screen-sm  md:max-w-screen-2xl">
          <div className="py-5   lg:bg-white flex justify-center lg:justify-start lg:px-12"></div>
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

          <div className="mt-8 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt- xl:px-24 xl:max-w-2xl">
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
          <div className="flex justify-center mt-8  ">
            <button className="w-64 h-14    max-w-xs font-bold shadow-sm rounded-lg  bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
              <div className="bg-white  rounded-full"></div>
              <GoogleOAuthProvider
                className="bg-red"
                clientId="591332327561-qqkbkghu0ddnmngvju4e1s9jgfi4rj44.apps.googleusercontent.com"
              >
                <div>
                  <GoogleLogin
                    containerProps={{
                      style: {
                        width: "100% !important",
                        color: "red",
                      },
                    }}
                    text="continue_with"
                    theme="outline"
                    width="100%"
                    onSuccess={async (credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse.credential);
                      console.log(decoded);
                      try {
                        const response = await axios.post(
                          "http://127.0.0.1:8000/api/google-auth/",
                          {
                            idToken: credentialResponse.credential,
                            email: decoded.email,
                            username: decoded.name,
                          }
                        );

                        if (response.status === 200) {
                          const { access_token, refresh_token } = response.data;

                          localStorage.setItem("access_token", access_token);
                          localStorage.setItem("refresh_token", refresh_token);
                          localStorage.setItem(
                            "username",
                            response.data.username
                          );

                          console.log(
                            "Access token:",
                            localStorage.getItem("access_token")
                          );
                          console.log(
                            "Refresh token:",
                            localStorage.getItem("refresh_token")
                          );
                          console.log("---------------------", response.data);
                          dispatch({
                            type: "SET_USER_DATA",
                            payload: {
                              username: response.data.username,
                              userId: response.data.id,
                              role: response.data.role,
                              isAuthenticated: true,
                              // Add other relevant user data here
                            },
                          });
                          if (response.data.role === "admin") {
                            history.push("/dashboard");
                          } else {
                            console.log(
                              "------------------",
                              response.data.role
                            );
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
          </div>
          <div className="mt-5 text-sm font-display font-semibold text-gray-700 text-center">
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
