/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
// import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const images = [
  "https://executiveevents.in/Userfiles/Poster/45551b5fa56b451485d3a7cbd2b13cf8.jpg",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
  "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // Add other image URLs for the carousel
];

function ImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <figure className="relative">
      <img
        className="w-full object-cover"
        src={images[currentImageIndex]}
        alt="nature image"
        style={{ height: "610px" }} // Adjust the height as needed
      />
      {!role || role === "user" ? (
        <>
        <div className="absolute inset-0 z-20  flex items-center justify-center h-screen w-full bg-gray-900 bg-opacity-30"></div>
        <div className="absolute inset-0  z-30 mt-10  flex flex-col items-center justify-center">
          <div
            className="shadow-2xl rounded-lg w-4/5 h-96 bg-cover bg-center "
            style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
          >
            <div className="grid grid-cols-12 gap-1">
              <div className="relative my-6 px-8 col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-7 xxl:col-span-7">
                <div className="border-l-4 border-gray-400 py-20 px-5 mx-2 absolute left-0">
                  <p className="italic text-white text-xl  md:text-4xl lg:text-6xl uppercase text-center  font-semibold ">
                  Haven....... The Unity
                  </p>
                </div>
                <div className="text-gray-400 font-semibold text-xl mb-4">07</div>
                <div className="absolute border-gray-400 border-t-4 bottom-0 py-1 px-4 w-4/5"></div>
              </div>
              <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xxl:col-span-5">
                <div className="relative bg-pink-900 h-full md:h-96 w-full bg-opacity-50 rounded-tr-lg rounded-br-lg">
                  <div className="p-8">
                    <p className="text-white text-xs md:text-sm lg:text-xl mb-4">
                      Join the Haven Association, where a vibrant community of
                      like-minded individuals comes together to elevate
                      experiences and engage in extraordinary activities.
                      Subscribe now and unlock a world of exciting events and
                      exclusive opportunities. Be part of something
                      extraordinary – your haven awaits!
                    </p>
                    <div className="bottom-0 absolute p-2 right-0">
                      <button className="opacity-75 bg-gray-100 hover:bg-pink-900 hover:text-white text-sm font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <Link to="/subscription">Subscribe</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      ) : (
        ""
      )}
      <div className="absolute bottom-1 left-0 w-full flex justify-center py-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 m-2 transition-all duration-500 rounded-full ${
              currentImageIndex === index
                ? "bg-gray-300 w-12"
                : "bg-gray-300 w-4"
            }`}
            style={{
              borderRadius: currentImageIndex === index ? "5px" : "60%",
              filter: "grayscale(100%)",
            }}
          ></div>
        ))}
      </div>
    </figure>
  );
}

export default ImageCarousel;
