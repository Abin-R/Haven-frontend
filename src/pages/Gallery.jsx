import { useState, useEffect } from "react";
import NavbarAdmin from "../components/Navbar";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../assets/groovyWalk.json";

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

  const length = Math.ceil(imageUrls.length / 4);

  return (
    <div>
      <NavbarAdmin />

      {imageUrls[0] ? (
        <div className="grid pt-24 grid-cols-2 md:grid-cols-4 gap-4 bg-black">
          {[...Array(length)].map((_, colIndex) => (
            <div key={colIndex} className="grid gap-4">
              {[...Array(length - 1)].map((_, rowIndex) => {
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
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <span className="lg:font-extrabold text-2xl mb-2 mt-20 px-9 font-bold">
            No Images 
          </span>
          <Lottie
            animationData={groovyWalkAnimation}
            style={{ height: "400px" }}
          />
          <h2
            className="text-lg sm:text-xl"
            style={{ color: "#555", marginTop: "10px" }}
          >
            Oops! Looks like there are no posts available.
          </h2>
          <p
            className="text-xs px-2 sm:text-xl"
            style={{
              color: "#888",
              paddingBottom: "70px",
              marginTop: "10px",
            }}
          >
            Don't worry, our team is working hard to bring you exciting content
            soon. Stay tuned!
          </p>
        </div>
      )}
    </div>
  );
}

export default Gallery;
