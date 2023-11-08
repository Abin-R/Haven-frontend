/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';

const images = [
  'https://executiveevents.in/Userfiles/Poster/45551b5fa56b451485d3a7cbd2b13cf8.jpg',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D',
  'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  // Add other image URLs for the carousel
];

function ImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        style={{ height: '700px' }} // Adjust the height as needed
      />
      <figcaption
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/20 p-5 shadow-lg shadow-black/5 backdrop-blur-sm text-center"
        style={{ color: 'white',width:'60%'}}
      >
        <div className="flex flex-col items-center">
          <Typography variant="h5">
            Embrace Haven's Community - Where You Belong, Thrive, and Evolve Together
          </Typography>
          <button className="bg-red-500 text-white font-bold py-2 px-7 rounded-xl mt-6">
            Subscribe
          </button>
        </div>
      </figcaption>
      <div className="absolute bottom-5 left-0 w-full flex justify-center py-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 m-2 transition-all duration-500 rounded-full ${
              currentImageIndex === index ? 'bg-gray-300 w-12' : 'bg-gray-300 w-4'
            }`}
            style={{ borderRadius: currentImageIndex === index ? '5px' : '60%', filter: 'grayscale(100%)'  }}
          ></div>
        ))}
      </div>
    </figure>
  );
}

export default ImageCarousel;
