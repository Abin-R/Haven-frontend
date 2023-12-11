// Update the Attendees component
import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/Navbar";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Store/Axios";

function Attendees() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  console.log(attendees);
  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axiosInstance.get(
          `https://haven.abinr.xyz/event/attendees/${eventId}/`
        );
        console.log(response.data);
        setAttendees(response.data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };

    fetchAttendees();
  }, [eventId]);

  return (
    <div>
      <NavbarAdmin />
      <div className="mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold mb-4">Event Attendees</h2>
        </div>
          <div className="overflow-hidden w-full px-10 py-1 ">
            <div className="flex items-center justify-between pb-6">
              <div>
               
              </div>
              <div className="flex items-center justify-between">
                <div className="ml-10 space-x-8 lg:ml-40">
                  <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                      />
                    </svg>
                    CSV
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-y-hidden rounded-lg border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                      <th className="px-5 py-3">ID</th>
                      <th className="px-5 py-3">Full Name</th>
                      <th className="px-5 py-3">User Role</th>
                      <th className="px-5 py-3">Created at</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500">
                  {attendees.map((attendee) => (
                  <tr key={attendee.id}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{attendee.id}</p>
                    </td>
                    {/* Accessing nested properties */}
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-full w-full rounded-full"
                            src={attendee.user.image}  
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="whitespace-no-wrap">{attendee.user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{attendee.user.email}</p> {/* Adjust the property name based on your data structure */}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{attendee.transaction. transaction_date}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <span className={`rounded-full ${attendee.booking_status === 'CONFIRMED' ? 'bg-green-200' : 'bg-red-200'} px-3 py-1 text-xs font-semibold text-green-900`}>
                        {attendee.booking_status}
                      </span>
                    </td>
                  </tr>
                ))}
                   
                    
                    
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                <span className="text-xs text-gray-600 sm:text-sm">
                  {" "}
                  Showing 1 to 5 of 12 Entries{" "}
                </span>
                <div className="mt-2 inline-flex sm:mt-0">
                  <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                    Prev
                  </button>
                  <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Attendees;
