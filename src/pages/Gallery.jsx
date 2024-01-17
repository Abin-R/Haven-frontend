import { useState, useEffect } from "react";
import NavbarAdmin from "../components/Navbar";

function Gallery() {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://haven.abinr.xyz/post/get-images/");
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

  const length = Math.ceil(imageUrls.length / 4)

  return (
    imageUrls ?(

    <div>
     <NavbarAdmin  />

      
      <div className="grid pt-24  grid-cols-2 md:grid-cols-4 gap-4 bg-black " >
      {[...Array(length)].map((_, colIndex) => (
        <div key={colIndex} className="grid gap-4">
          {[...Array(length-1)].map((_, rowIndex) => {
            const index = colIndex * 3 + rowIndex;
            return (
              <div key={index}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={`https://haven.abinr.xyz${imageUrls[index]}`}
                  alt={`Image ${index + 1}`}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
    </div>
    ):(
      "HIII"
    )
  );
}

export default Gallery;
