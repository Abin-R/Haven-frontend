import { useState, useEffect } from "react";
import Finance from "../Finance";
import axios from "axios";

function EventBooking() {
  // State to store subscription data
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    // Fetch subscription data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://haven.abinr.xyz/admins/event-boooking/"
        );
        const data = response.data;
        console.log("API Response:", data); // Add this line
        setBooking(data);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleApprove = async (bookingId) => {
    try {
      // Send a PATCH request to update booking_status to 'CONFIRMED'
      await axios.patch(
        `https://haven.abinr.xyz/admins/approve-booking/${bookingId}/`
      );
  
      // Update the local state to reflect the approval
      setBooking((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, booking_status: 'CONFIRMED' } : booking
        )
      );
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };
  

  return (
    <div>
      <Finance />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;1,600&display=swap"
        rel="stylesheet"
      />

      {/* <div class="w-screen"> */}
      <div className="mx-auto mt-6  px-2 my-4">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-gray-900">Payments</p>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                <label
                  htmlFor=""
                  className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"
                >
                  {" "}
                  Sort by:{" "}
                </label>
                <select
                  name=""
                  className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
                >
                  <option className="whitespace-no-wrap text-sm">Recent</option>
                </select>
              </div>

              <button
                type="button"
                className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
              >
                <svg
                  className="mr-1 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    className=""
                  ></path>
                </svg>
                Export to CSV
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2 ml-10">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td className="whitespace-normal py-3 text-base font-medium text-gray-500 sm:px-6">
                  Name Of Event
                </td>

                <td className="whitespace-normal py-2 text-base font-medium text-gray-500 sm:px-6">
                  Name
                </td>
                <td className="whitespace-normal py-4 text-base font-medium text-gray-500 sm:px-6">
                  Date
                </td>

                <td className="whitespace-normal py-4 text-base font-medium text-gray-500 sm:px-6">
                  Ticket count
                </td>
                <td className="whitespace-normal py-4 text-base font-medium text-gray-500 sm:px-6">
                  Amount
                </td>

                <td className="whitespace-normal py-4 text-base font-medium text-gray-500 sm:px-6">
                  Status
                </td>

                <td className="whitespace-normal py-3 px-6 text-base font-medium text-gray-500 sm:px-9 ml-10">
                  Approve
                </td>
              </tr>
            </thead>

            {/* ... */}
            <tbody className="lg:border-gray-300 ">
              {booking.map((subscription, index) => (
                <tr key={index} className="px-10 mx-10">
                  <td className="whitespace-no-wrap py-4 px-8 mx-9 text-sm font-bold text-gray-900 sm:px-10">
                    {subscription.event.title}
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-500">
                        {subscription.event.title}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4  text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {subscription.user.username}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {new Date(
                      subscription.transaction.transaction_date
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {/* {subscription.transaction.transaction_date} */}
                  </td>

                  <td className="whitespace-no-wrap py-4 px-16 text-right text-sm text-gray-600 lg:text-left">
                    <div>{subscription.ticket_count}</div>
                  </td>
                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    <div>${subscription.transaction.amount}</div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-white sm:px-6 lg:table-cell">
                    {subscription.transaction.status === "SUCCESS" ? (
                      <div className="bg-green-400 px-1 me-2 flex justify-center items-center py-1 rounded-xl text-sm">
                        Paid
                      </div>
                    ) : (
                      <div className="bg-red-400 px-1 me-2 flex justify-center items-center py-1 rounded-xl text-sm">
                        Pending
                      </div>
                    )}
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    {subscription.booking_status === "PENDING" ? (
                      <div>
                        <button
                          onClick={() => handleApprove(subscription.id)}
                          className="text-white bg-blue-700 mx-2 font-medium rounded-lg text-sm px-5 py-2 me-4 mb-2"
                        >
                          Approve
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          disabled
                          className="text-white bg-teal-700 font-medium rounded-lg text-sm px-5 py-2 me-4 mb-2"
                        >
                          Approved
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* ... */}
          </table>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default EventBooking;
