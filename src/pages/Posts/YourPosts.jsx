import NavbarAdmin from "../../components/Navbar";
import { useState, useEffect } from "react";
import axiosInstance from "../../Store/Axios";

function YourPosts() {
  const [userEvents, setUserEvents] = useState([]);

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
          "http://127.0.0.1:8000/post/user-posts/",
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
    </div>
  );
}

export default YourPosts;
