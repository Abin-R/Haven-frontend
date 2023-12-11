import { Link } from "react-router-dom";
import Imagecaurosel from "../components/imagecaurosel";
import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Modal, Box, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch } from "react-redux";
// import { Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Register() {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
        "http://haven.abinr.xyz/api/register/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to send FormData
          },
        }
      );

      console.log("Registration successful:", response.data);

      setOpenModal(true); // Navigate to login page

      // You can handle the response data here, such as storing tokens.
    } catch (error) {
      // alert("Error: " + error);
      errorToast("Failed to register. Please try again.");
      // setLoading(false);
    }
  };
  // const handleOpen = () => {
  //   setOpenModal(true);
  // };

  const handleClose = () => {
    setOpenModal(false);
  };


  return (
    <>
      <div className="h-screen lg:flex sm:h-screen">
        <Imagecaurosel />
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <Link to="/">
            <div className="text-2xl text-indigo-800 tracking-wide font-semibold flex justify-center mt-8">
              Welcome To
              <img
                className="h-5 w-auto mt-2 ml-3"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Haven_Holiday_Wordmark.svg/1280px-Haven_Holiday_Wordmark.svg.png"
                alt="Haven Holiday"
              />
            </div>
          </Link>

          <div className="mt-2 px-8 sm:px-24 md:px-48 lg:px-12 lg:mt-8 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-4xl
                    xl:text-bold"
            >
              Register
            </h2>
            <div className="mt-7">
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
                <div className="mt-3">
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
                <div className="mt-3">
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
                <div className="mt-6">
                  <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                    Sign up
                  </button>
                </div>
              </form>
              <div className="my-3 px-4 border-b text-center">
                <div className="leading-none px-4 inline-block text-sm text-stone-300 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with Google
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6  ">
            <button className="w-64 h-14    max-w-xs font-bold shadow-sm rounded-lg  bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
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
                  width="250px"
                onSuccess={async (credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded)
                  try {
                    const response = await axios.post(
                      "https://haven.abinr.xyz/api/google-auth/",
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
                            response.data.role === "admin" ? "admin" : "user",
                          isAuthenticated: true,
                          // Add other relevant user data here
                        },
                      });

                      history("/"); // Redirect or perform any other actions
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
      {/* <Button onClick={handleOpen}>Open modal</Button>  */}
      {/* {showModal && ( */}
        <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 280,
            borderRadius: "25px",
            bgcolor: "black",
            border: "2",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: "4rem",
              color: "green",
              marginLeft: "180px",
              marginBottom: "10px",
              marginTop: "5px",
            }}
          />
          <Typography
            className="text-white px-7 font-mono"
            id="modal-modal-description"
            sx={{
              fontSize: "1.2rem", // Set the description font size
              color: "white",
              fontFamily: "cursive", // Text color
              textAlign: "center", // Center the text
              margin: "20px 0", // Add margin for better spacing
            }}
          >
            Thank You! A mail has been sent to your <div className="text-blue-600">{email} </div>
          </Typography>
        </Box>
      </Modal>
      {/* )} */}

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default Register;
