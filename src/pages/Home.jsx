import Navbar from "../components/Navbar";
import ImageCarousel from "../components/Homeimagecarousel";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState, useEffect } from "react";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
        <>
          <Navbar />
          <ImageCarousel />
        </>
      )}
    </div>
  );
}

export default Home;
