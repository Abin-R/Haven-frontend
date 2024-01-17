/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
// import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const images = [
  'https://cdn.pixabay.com/photo/2017/08/07/21/56/people-2608316_1280.jpg',
  'https://res.cloudinary.com/jerrick/image/upload/c_scale,f_jpg,q_auto/cwbsbvmttfwfwuq8zfzi.jpg',
  'https://bandzoogle.com/files/4739/bzblog-17-ways-to-get-more-music-fans-main.jpg',
  // Add other image URLs for the carousel
];

function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const {role} = useSelector((state) =>state.user)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <figure className="relative">
    <img
        className="w-full object-cover h-52 sm:h-6 md:h-48 lg:h-72"
        src={images[currentImageIndex]}
        alt="nature image"
      />
         
      <figcaption
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/20 shadow-lg shadow-black/5 backdrop-blur-sm text-center"
      style={{ color: 'white', width: '10%', height: '0px', marginTop: '5px' }}
    >
      <div className="flex flex-col items-center sm:mt-2" style={{ marginBottom: '20px', maxHeight: '5px' }}>
        <Link to="/subscription">
          <button className="bg-stone-600 text-white  sm:text-sm md:text-xl lg:text-xl font-bold py-3 px-10 sm:px-6 sm:h-13  md:px-8 lg:px-10 rounded-xl whitespace-nowrap">
            Buy Tickets
          </button>
        </Link>
      </div>
    </figcaption>
       
      <div className="absolute bottom-1 left-0 w-full flex justify-center p">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2.5 m-2 transition-all duration-500 rounded-full ${
              currentImageIndex === index ? 'bg-gray-300 w-12' : 'bg-gray-300 w-4'
            }`}
            style={{ borderRadius: currentImageIndex === index ? '5px' : '60%', filter: 'grayscale(100%)'  }}
          ></div>
        ))}
      </div>
    </figure>
  );
}

export default Banner;
