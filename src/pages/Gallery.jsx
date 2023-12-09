import { useState, useEffect } from "react";
import NavbarAdmin from "../components/Navbar";

function Gallery() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/post/get-images/");
        if (response.ok) {
          const data = await response.json();
          setImageUrls(data.imageUrls);
        } else {
          console.error("Failed to fetch image URLs from the backend");
        }
      } catch (error) {
        console.error("Error while fetching image URLs:", error);
      }
    };

    fetchImages();
  }, []);

  const getImageStyles = (index) => {
    // You can implement logic here to determine different styles based on the index or other criteria
    // Example: alternate between different background colors
    const backgroundColors = ["bg-blue-300", "bg-green-300", "bg-yellow-300", "bg-pink-300"];
    const randomColor = backgroundColors[index % backgroundColors.length];
    return `object-cover w-full h-48 ${randomColor}`;
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-28">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img
              className={getImageStyles(index)}
              src={`http://127.0.0.1:8000${imageUrl}`}
              alt={`Image ${index}`}
            />
            <div className="p-4">
              <p className="text-gray-800 font-semibold">Image {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
