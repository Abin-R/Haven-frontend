import NavbarAdmin from "../../components/Navbar";
import { useState, useEffect } from "react";
import axiosInstance from "../../Store/Axios";
import DotLoader from "react-spinners/ClipLoader";

function YourPosts() {
  const [userEvents, setUserEvents] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axiosInstance.get(
          "https://haven.abinr.xyz/post/user-posts/",
          config
        );
        setUserEvents(response.data);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, []);

  return (
    <div>
      {userEvents[0] ? (
        <>
        
      <NavbarAdmin />
      <div className=" mt-28  flex justify-center  font-bold text-2xl">Your Posts </div>
      <div className="container max-w-5xl m-auto flex flex-wrap">
        {userEvents.map((event) => (
          <div key={event.id} className="w-full p-3">
            <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">
              <img
                className="block h-auto w-full lg:w-48 flex-none bg-cover h-24"
                src={event.image}
                alt="Event"
              />
              <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="text-black font-bold text-xl mb-2 leading-tight">
                  {event.description}
                </div>
                <p className="text-grey-darker text-base">Read more</p>
              </div>
            </div>
          </div>
        ))}
      </div>
        </>
      ):(
        <>
          <NavbarAdmin />
          

          <div className="flex mt-44  flex-col h-screen">
            <div className="mb-0">
              {/* Add an attractive illustration or image */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30vh",
                }}
              >
                <DotLoader
                  color={"black"}
                  loading={loading}
                  // cssOverride={override}
                  size={70}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Oops! No items found.
              </h2>
              <p className="text-gray-500">
                It seems there are no items available at the moment.
              </p>
              {/* You can add additional content or links here */}
            </div>
          </div>
        </>

      )}
    </div>
  );
}

export default YourPosts;
