import Navbar from "../components/Navbar";
import ImageCarousel from "../components/Homeimagecarousel";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

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
            <div className="text-3xl font-extrabold mt-10 flex justify-center">
              OUR EVENTS
            </div>
            <div className="flex justify-start py-12">
              <div className="relative flex w-full max-w-[58rem] flex-row rounded-3xl rounded-s-none bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="p-6">
                  <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                    Our Events
                  </h6>
                  <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Haven Community launches cross-platform event service.
                  </h4>
                  <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                  This week marks the launch of our eagerly awaited cross-platform events! Join us as we bring together a seamless experience across various platforms, creating unforgettable moments for all participants. Don't miss out on the excitement – save the date and be part of our extraordinary events!
                  </p>
                  <a className="inline-block" href="#">
                    <button
                      className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        ></path>
                      </svg>
                    </button>
                  </a>
                </div>
                <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-3xl rounded-l-none bg-white bg-clip-border text-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                    alt="image"
                    className="h-full w-full object-cover"
                  />
                  <Link to="/posts" className="absolute top-60 left-24 bg-red-600 hover:bg-red-800   opacity-80 text-white font-bold py-3 px-10 rounded-3xl">
                    Explore More
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-3xl font-extrabold mt-3 flex justify-center">
              UPCOMING EVENTS
            </div>

            <div className="flex justify-end py-12">
              <div className="relative flex w-full max-w-[58rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                    alt="image"
                    className="h-full w-full object-cover"
                  />
                    <Link to="/events" className="absolute top-60 left-24 bg-red-600 hover:bg-red-800 opacity-80  text-white font-bold py-3 px-10 rounded-3xl">
                    Explore More
                  </Link>
                </div>
                <div className="p-6">
                  <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                    Upcoming Events
                  </h6>
                  <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Haven Community launches cross-platform event service.
                  </h4>
                  <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                  Our upcoming events will be launched this week, providing a cross-platform experience for our community. Stay tuned for exciting updates and join us for memorable experiences!
                  </p>
                  <a className="inline-block" href="#">
                    <button
                      className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        ></path>
                      </svg>
                    </button>
                  </a>
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
