/* eslint-disable react/no-unescaped-entities */
import NavbarAdmin from "../../components/Navbar";
import Banner from "../../components/SubmitEvents/banner";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/groovyWalk.json";

function Event() {
  const [events, setEvents] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    // Function to fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://haven.abinr.xyz/event/events/"
        );
        console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Call the fetchEvents function
    fetchEvents();
  }, []);

  return (
    <div>
      <NavbarAdmin />
      {events[0] ? (
        <>
        <Banner />
          <div className="flex items-center py-5">
            <span className="lg:font-extrabold text-2xl mb-2 mt-5 px-9 font-bold">
              Upcoming Events
            </span>
            <div className="relative ml-auto mt-4 px-9">
              <input
                type="checkbox"
                id="sortbox"
                className="hidden absolute"
                checked={showDropdown}
                onChange={toggleDropdown}
              ></input>
              <label
                htmlFor="sortbox"
                className="flex items-center space-x-1 cursor-pointer"
              >
                <span className="text-lg">Sort By</span>
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>

              <div
                id="sortboxmenu"
                className={`absolute mt-1 right-1 top-full min-w-max shadow rounded opacity-0 bg-gray-300 border border-gray-400 transition delay-75 ease-in-out z-10 ${
                  showDropdown ? "opacity-100" : ""
                }`}
              >
                <ul className="block text-right text-gray-900">
                  <li>
                    <a href="#" className="block px-3 py-2 hover:bg-gray-200">
                      Featured
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-3 py-2 hover:bg-gray-200">
                      Newest
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-3 py-2 hover:bg-gray-200">
                      Price: Low to High
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-3 py-2 hover:bg-gray-200">
                      Price: High to Low
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="px-1 lg:px-10 py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`rounded overflow-hidden shadow-lg transform hover:scale-110 motion-reduce:transform-none ${
                  index + 1 <= 3 || index + 1 > 6 ? "bg-white my-10" : " my-10"
                }`}
                style={{
                  maxHeight: "290px",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                <div className="relative">
                  <Link to={`/event/${event.id}`}>
                    {/* Use Link to navigate to the individual event page */}
                    <img
                      className="w-full h-80"
                      src={`https://haven.abinr.xyz${event.image}`}
                      alt="Event"
                    />
                  </Link>

                  {event.start_date && (
                    <p className="flex flex-col absolute top-0 bg-black text-white font-semibold py-7 px-3 mx-6 rounded-br-lg rounded-tl-lg">
                      <span className="px-2 text-base">
                        {new Date(event.start_date).getDate()}
                      </span>
                      <span className="mt-1 mx-1 text-sm">
                        {new Date(event.start_date).toLocaleString("default", {
                          month: "short",
                        })}
                      </span>
                      <span className="mt-1 mx-1 text-sm">
                        {new Date(event.start_date).getFullYear()}
                      </span>
                    </p>
                  )}
                  <p className="flex flex-col absolute top-0 bg-black text-white font-semibold py-5 px-2 mx-72">
                    <span className="flex flex-row px-2 text-sm">{`$${event.cost}`}</span>
                  </p>
                  <p
                    className="flex flex-col absolute top-44 bg-white text-black rounded font-semibold py-3 px-3 mx-6 "
                    style={{ background: "rgba(255, 255, 255, 0.7)" }}
                  >
                    <span className="px-1 text-sm w-48" style={{ opacity: 1 }}>
                      {event.title}
                    </span>
                    <span className="px-1 text-sm">{event.category} </span>
                    <span className="px-1 text-xs mt-1">{event.location}</span>
                  </p>
                  <p className="flex flex-col absolute top-56 bg-red-600 rounded-xl  text-white font-semibold py-1 px-4 text-sm mx-64 me-64 whitespace-nowrap">
                    {event.ticket_count > 0 ? "Buy Tickets" : "Sold Out"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center' ,marginTop:'100px'}}>
        <span className="lg:font-extrabold text-2xl mb-2 mt-20 px-9 font-bold">
              Upcoming Events
            </span>
            <Lottie animationData={groovyWalkAnimation} style={{ height: '400px' }} />
            <h2 className="text-lg sm:text-xl"
            style={{ color: '#555', marginTop: '10px' }}>
              Oops! Looks like there are no Events available.
            </h2>
            <p className="text-xs px-2 sm:text-xl"
            style={{  color: '#888', paddingBottom: '70px', marginTop: '10px' }}>
              Don't worry, our team is working hard to bring you exciting content soon.
              Stay tuned!
            </p>
          </div>
      )}
    </div>
  );
}

export default Event;
