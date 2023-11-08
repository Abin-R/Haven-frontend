import Navbar from "../components/Navbar";
import ImageCarousel from "../components/Homeimagecarousel";
import PacmanLoader from "react-spinners/PacmanLoader";
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
          <PacmanLoader

            color={"black"}
            loading={loading}
            // cssOverride={override}
            size={50}
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
