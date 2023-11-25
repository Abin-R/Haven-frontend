import NavbarAdmin from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../Store/Axios";

function YourEvent() {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axiosInstance.get('http://127.0.0.1:8000/event/user-events/', config);
        console.log(response.data)
        setUserEvents(response.data);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    
    fetchUserEvents();
  }, []);
  const isEventEnded = (endDate) => {
    // Assuming endDate is in UTC format
    const eventEndDate = new Date(endDate);
    const currentUTCDate = new Date();
    return eventEndDate < currentUTCDate;
  };


  return (
    <div>
      <NavbarAdmin />
      <div className="mt-28 flex justify-between">
        <div className="ml-10 mt-2 font-extrabold text-3xl">My Events</div>
        <div className="flex items-end">
          
          <Link to="/create-events">
            <button className="focus:outline-none mr-6 justify-end text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-bold text-base rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex flex-row">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/schedule-calendar-icon.png"
                className="mr-2 mt-0.5 "
                style={{ width: "20px" }}
                alt="calendar icon"
              />
              Create Event
            </button>
          </Link>
        </div>
      </div>
      <div className="m-10 mx-32 max-w-screen-lg">
        {userEvents.map((event) => (
          
          <div key={event.id} className="overflow-hidden rounded-xl border shadow-lg md:pl-8 mb-6">
            <div className="flex flex-col h-80 bg-white sm:flex-row md:h-80" style={{ height: "250px" }}>
              <div className="flex w-full flex-col sm:w-1/2 sm:p-3 mt-2 lg:w-3/5">
                <h2 className="text-xl mt-5 font-bold text-gray-900 md:text-2xl lg:text-3xl">{event.title}</h2>
                <p className="mt-6 text-lg">{event.location}</p>
               
                <div className="flex flex-row mt-5">
                {event.is_in_event_posting ? null : (
                    isEventEnded(event.end_date) ? (
                      <Link
                        to={`/create-post/${event.id}`}
                        className="group flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
                      >
                        <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">Post</span>
                        <svg
                          className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        to={`/manage-event/${event.id}`}
                        className="group flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
                      >
                        <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">Manage</span>
                        <svg
                          className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    )
                  )}
                  <Link to={`/attendees-event/${event.id}`} className="group ml-6 flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition">
                    <span className="group flex w-full  items-center justify-center rounded py-1 text-center font-bold">Attendees</span>
                    <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
                <img className="h-full w-full object-cover" src={event.image} alt={event.title} loading="lazy" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourEvent;
