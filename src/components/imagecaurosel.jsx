import { useState, useEffect } from "react";

const images = [
  "https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1706018/pexels-photo-1706018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/5686476/pexels-photo-5686476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  'https://images.pexels.com/photos/18806554/pexels-photo-18806554/free-photo-of-people-tasting-cake-on-a-party.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  // Add other image URLs for the carousel
];

function Imagecaurosel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex}`}
        />
         <div className="absolute bottom-0 left-0 w-full flex justify-center py-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3  m-2 transition-all duration-500 rounded-full ${
              currentImageIndex === index ? 'bg-gray-300 w-10' : 'bg-gray-300 w-4'
            }`}
            style={{ borderRadius: currentImageIndex === index ? '5px' : '60%' }}
          ></div>
        ))}
      </div>
      </div>
    </>
  );
}

export default Imagecaurosel;
