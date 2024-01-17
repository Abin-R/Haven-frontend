/* eslint-disable react/no-unescaped-entities */
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/Homeimagecarousel";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

function Home() {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 100);
  // }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ScaleLoader
            color={"black"}
            loading={loading}
            // cssOverride={override}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="bg-gray-300">
          <Navbar />
          <ImageCarousel />
          <div>
            <div className="sm:text-3xl text-xl font-extrabold mt-8 flex justify-center">
              OUR EVENTS
            </div>
            <div className="flex justify-start py-8 flex-col sm:px-0 pr-3  sm:flex-row sm:justify-start">
              <div className="relative flex w-full max-w-[58rem] flex-col  sm:flex-row rounded-3xl rounded-s-none bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="p-6">
                  <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                    Exciting Events
                  </h6>
                  <h4 className="mb-4 block font-sans text-xl font-semibold leading-tight text-blue-gray-900">
                    Join the Buzz: Lyft Launches Innovative Cross-Platform
                    Service This Week!
                  </h4>
                  <p className="mb-2 block font-sans text-sm font-normal leading-relaxed text-gray-700">
                    Get ready for a groundbreaking event! Lyft is set to launch
                    a cross-platform service this week, revolutionizing the way
                    we experience transportation. Don't miss out on being part
                    of this momentous occasion that promises to redefine the
                    future of travel.
                  </p>
                </div>
                <div className="relative m-0 sm:h-full h-40 sm:w-2/5 shrink-0 overflow-hidden rounded-3xl sm:rounded-tr-3xl rounded-tr-none rounded-l-none  bg-white bg-clip-border text-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                    alt="image"
                    className="h-full w-full sm:object-cover  object-cover"
                  />
                  <button className="absolute sm:top-44  top-20 left-24 bg-red-600 hover:bg-red-800   opacity-80 text-white font-bold py-3 px-10 rounded-3xl">
                    Explore More
                  </button>
                </div>
              </div>
            </div>

            <div className="sm:text-3xl text-xl font-extrabold mt-2 flex justify-center">
              UPCOMING EVENTS
            </div>

            <div className="flex justify-end py-12 flex-col sm:px-0 pl-3  sm:flex-row">
              <div className="relative flex w-full max-w-[58rem] flex-col sm:flex-row rounded-3xl sm:rounded-br-none sm:rounded-tr-none rounded-br-none bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative m-0 sm:h-full h-40 sm:w-2/5 shrink-0 overflow-hidden rounded-3xl rounded-bl-none sm:rounded-bl-3xl rounded-r-none bg-white bg-clip-border text-gray-700">
                  <img
                    src="https://cdn.create.vista.com/api/media/small/123737502/stock-photo-people-makes-photo-with-his-smartphone-on-concerts"
                    alt="image"
                    className="sm:h-full sm:w-full sm:object-cover"
                  />
                  <button className="absolute sm:top-44 top-20 left-24 bg-red-600 hover:bg-red-800 opacity-80  text-white font-bold py-3 px-10 rounded-3xl">
                    Explore More
                  </button>
                </div>
                <div className="p-6">
                  <h6 className="mb-3 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                    Upcoming Events
                  </h6>
                  <h4 className="mb-3 block font-sans text-xl font-semibold leading-tight text-blue-gray-900">
                    Don't Miss Out! Lyft's Unveiling the Future with a
                    Cross-Platform Service
                  </h4>
                  <p className="mb-2 block font-sans text-sm font-normal leading-relaxed text-gray-700">
                    Brace yourself for an extraordinary event! Lyft is gearing
                    up to launch an innovative cross-platform service this week.
                    Join us as we unveil a new era in transportation that goes
                    beyond the ordinary. Experience the future firsthand and be
                    part of the journey!
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
