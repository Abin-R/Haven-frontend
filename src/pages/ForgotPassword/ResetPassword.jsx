import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Imagecaurosel from "../../components/imagecaurosel";
import axios from "axios";
import { useState } from "react";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const uidb64 = queryParams.get('uidb64');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hahahahhhahhahaha")

    if (password !== confirmPassword) {
      // Display an error message or handle the case where passwords don't match
      console.error("Passwords do not match");
      return;
    }

    if(!uidb64){
        return;
    }

    try {
      // Perform the POST request to the backend
      const response = await axios.post(
        "https://haven.abinr.xyz/api/reset-password/",
        {
          password,
          uidb64 // Replace with your uidb64 value
        }
      );
      console.log(response.data);
      navigate('/login');
      // Handle success message or UI changes after password reset
    } catch (error) {
      console.error(error);
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
              Reset Password
            </h2>
            <div className="mt-12">
              <form onSubmit={handleSubmit}>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      New Password
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Confirm Password
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-10">
                  <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                    Submit
                  </button>
                </div>
              </form>
              {/* <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                no have an account ?{" "}
                <Link
                  to="/register"
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                >
                  Sign up
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
