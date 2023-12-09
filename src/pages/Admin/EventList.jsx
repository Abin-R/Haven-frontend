import { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/Admin/NavbarAdmin";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/admins/event-list/"
        );
        const data = response.data;
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (eventId) => {
    try {
      // Send a PATCH request to update is_approved to true
      await axios.patch(
        `http://127.0.0.1:8000/admins/event/${eventId}/approve/`
      );

      // Update the local state to reflect the approval
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, is_approved: true } : event
        )
      );
    } catch (error) {
      console.error("Error approving event:", error);
    }
  };

  

  return (
    <>
    {events?(
<>
      <NavbarAdmin />
      <div className="container mx-auto px-4 sm:px-8 my-30">
        <div className=" my-28">
          <div>
            <h2 className="text-3xl my-3 font-bold leading-tight">Events</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Organizer
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-10 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Approve
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {event.title}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {event.organizer.user.username}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {new Date(event.start_date).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {new Date(event.end_date).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        ${event.cost}
                      </td>
                      {
                        event.is_approved ?(
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                        disabled
                          
                          className="text-white  bg-teal-700  font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 "
                        >
                          Approved
                        </button>
                      </td>
                         
                        ):( <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleApprove(event.id)}
                          className="text-white  bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          Approve
                        </button>
                      </td>)
                      }
                     

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <button
                          type="button"
                          className="inline-block text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            className="inline-block h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </>
    ):("LOADING..........")}
    </>
  );
}

export default EventList;
