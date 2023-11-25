import { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/Admin/NavbarAdmin";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/admins/event-list/");
        const data = response.data;
        setEvents(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <NavbarAdmin/>
    <div className="mx-auto mt-24 px-2 my-4 ">
      <div className="sm:flex sm:items-centersm:justify-between flex-col sm:flex-row">
        <p className="flex text-2xl  items-center font-bold text-gray-900">Events</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border shadow">
        <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
          <thead className="hidden border-b lg:table-header-group">
            <tr className="">
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Title
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Description
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Start Date
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                End Date
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Cost
              </td>

              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                Location
              </td>
            </tr>
          </thead>

          <tbody className="lg:border-gray-300">
            {events.map((event, index) => (
              <tr key={index} className="">
                <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                  {event.title}
                </td>

                <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6">
                  {event.description}
                </td>

                <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6">
                  {event.start_date}
                </td>

                <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6">
                  {event.end_date}
                </td>

                <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                  ${event.cost}
                </td>

                <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 sm:px-6">
                  {event.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default EventList;
