import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/Admin/NavbarAdmin";
import axios from "axios";
import Chart from "chart.js/auto"; // Import Chart.js library

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [subscribe, setSubscribe] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [booking, setBooking] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: "category",
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#f3f3f3",
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/admins/sales-data"
        );
        setSalesData(response.data.salesData); // Assuming your API returns an object with a property 'salesData'
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only on mount

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: salesData.map((entry) => entry.label),
        datasets: [
          {
            label: "Sales Data",
            data: salesData.map((entry) => entry.value),
            borderColor: "#4CAF50",
            borderWidth: 2,
            pointBackgroundColor: "#4CAF50",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      },
      options: options,
    });

    return () => {
      myChart.destroy();
    };
  }, [options, salesData]); // Include options as a dependency

  useEffect(() => {
    // Fetch total revenue from the backend using Axios
    axios
      .get("https://haven.abinr.xyz/admins/admin-dashboard")
      .then((response) => {
        console.log(response.data);
        setTotalRevenue(response.data);
        setSubscribe(response.data.users);
        setBooking(response.data.booking);
        console.log(response.data.booking)
      })
      .catch((error) => {
        console.error("Error fetching total revenue:", error);
      });
  }, []);

  return (
    <div>
      <NavbarAdmin />
      {totalRevenue ? (
        <div className="container mx-auto mt-32 px-6">
          <div className="flex items-center">
            <div className="container max-w-6xl px-5 mx-auto mb-12">
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-5 bg-white rounded shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.3333 9.33334H28M28 9.33334V20M28 9.33334L17.3333 20L12 14.6667L4 22.6667"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Net Revenue</div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${totalRevenue.profit}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-white rounded shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.52325 6.61231C10.2911 5.20443 12.4206 4.32434 14.6667 4.07333V17.3333H27.9267C27.6757 19.5794 26.7956 21.7089 25.3877 23.4767C23.9798 25.2446 22.1013 26.5791 19.9685 27.3265C17.8357 28.0739 15.5351 28.2039 13.3317 27.7015C11.1282 27.1991 9.11142 26.0847 7.51336 24.4866C5.91529 22.8886 4.80094 20.8718 4.29854 18.6683C3.79614 16.4649 3.92612 14.1643 4.67352 12.0315C5.42092 9.89866 6.75535 8.0202 8.52325 6.61231Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M20 12H27.3173C26.7188 10.3128 25.7513 8.78047 24.4854 7.5146C23.2195 6.24873 21.6872 5.28125 20 4.68268V12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Total Bookings</div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${totalRevenue.totalRevenue}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-white rounded shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-400">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.7712 13.1046C20.7714 12.1044 21.3333 10.7478 21.3333 9.33333C21.3333 7.91885 20.7714 6.56229 19.7712 5.5621C18.771 4.5619 17.4145 4 16 4C14.5855 4 13.2289 4.5619 12.2288 5.5621C11.2286 6.56229 10.6667 7.91885 10.6667 9.33333C10.6667 10.7478 11.2286 12.1044 12.2288 13.1046C13.2289 14.1048 14.5855 14.6667 16 14.6667C17.4145 14.6667 18.771 14.1048 19.7712 13.1046Z"
                            stroke="#FBBF24"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M9.40033 21.4003C11.1507 19.65 13.5246 18.6667 16 18.6667C18.4753 18.6667 20.8493 19.65 22.5997 21.4003C24.35 23.1507 25.3333 25.5246 25.3333 28H6.66666C6.66666 25.5246 7.64999 23.1507 9.40033 21.4003Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Customers</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {" "}
                        {totalRevenue.user_count}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-white rounded shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-400">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 25.3333V17.3333C12 16.6261 11.719 15.9478 11.219 15.4477C10.7189 14.9476 10.0406 14.6667 9.33333 14.6667H6.66667C5.95942 14.6667 5.28115 14.9476 4.78105 15.4477C4.28095 15.9478 4 16.6261 4 17.3333V25.3333C4 26.0406 4.28095 26.7189 4.78105 27.219C5.28115 27.719 5.95942 28 6.66667 28H9.33333C10.0406 28 10.7189 27.719 11.219 27.219C11.719 26.7189 12 26.0406 12 25.3333ZM12 25.3333V12C12 11.2928 12.281 10.6145 12.781 10.1144C13.2811 9.61428 13.9594 9.33333 14.6667 9.33333H17.3333C18.0406 9.33333 18.7189 9.61428 19.219 10.1144C19.719 10.6145 20 11.2928 20 12V25.3333M12 25.3333C12 26.0406 12.281 26.7189 12.781 27.219C13.2811 27.719 13.9594 28 14.6667 28H17.3333C18.0406 28 18.7189 27.719 19.219 27.219C19.719 26.7189 20 26.0406 20 25.3333M20 25.3333V6.66667C20 5.95942 20.281 5.28115 20.781 4.78105C21.2811 4.28095 21.9594 4 22.6667 4H25.3333C26.0406 4 26.7189 4.28095 27.219 4.78105C27.719 5.28115 28 5.95942 28 6.66667V25.3333C28 26.0406 27.719 26.7189 27.219 27.219C26.7189 27.719 26.0406 28 25.3333 28H22.6667C21.9594 28 21.2811 27.719 20.781 27.219C20.281 26.7189 20 26.0406 20 25.3333Z"
                            stroke="currentColor "
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Number Of Bookings</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {totalRevenue.booking_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-96">
            {/* Left Side - List of Latest Subscribed Users */}
            <div className="col-span-1 mt-5 px-3 mr-20" style={{ width: "650px" }}>
              <div className=" py-2  rounded-lg shadow-md transition-transform transform hover:scale-105 ">
                <div className="w">
                  <div className="mx-auto mt-12 max-w-screen-lg px-6">
                    <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
                      <p className="flex-1 text-base font-bold text-gray-900">
                        Latest Subscription
                      </p>

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
                              <option className="whitespace-no-wrap text-sm">
                                Recent
                              </option>
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

                    <div className="mt-6 overflow-hidden rounded-xl ">
                      <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                        <thead className="hidden border-b lg:table-header-group">
                          <tr className="">
                            <td
                              width="50%"
                              className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                            >
                              User
                            </td>

                            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                              Date
                            </td>

                            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                              Amount
                            </td>

                            <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                              Status
                            </td>
                          </tr>
                        </thead>

                        <tbody className="lg:border-gray-300 py-8">
                          {subscribe &&
                            subscribe.map((subscription) => (
                              <tr key={subscription.id} className="">
                                <td
                                  width="50%"
                                  className="whitespace-no-wrap py-6 text-sm font-bold text-gray-900 sm:px-6"
                                >
                                  {subscription.user.username}{" "}
                                  {/* Accessing the username */}
                                  <div className="mt-1 lg:hidden">
                                    <p className="font-normal text-gray-500">
                                      {subscription.timestamp}{" "}
                                      {/* Assuming timestamp is a field in your subscription */}
                                    </p>
                                  </div>
                                </td>

                                {/* Other table cells for date, amount, and status */}

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                  {new Date(
                                    subscription.timestamp
                                  ).toLocaleDateString()}
                                </td>

                                {/* ... other table cells ... */}

                                <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                                  {`$${subscription.amount}`}{" "}
                                  {/* Assuming 'amount' is a field in your subscription */}
                                  <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                                    {subscription.status}
                                  </div>
                                </td>

                                <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                  <div>
                                    {
                                      subscription.subscription
                                        .subscription_type
                                    }
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Sales Chart */}
            <div className="col-span-1 ml-28">
              <div
                className="mt-20 py-10 px-16"
                style={{ maxWidth: "620px", margin: "auto", width: "590px" }}
              >
                <h2 className="text-2xl font-semibold mb-4">Sales Chart</h2>
                <canvas id="myChart" width="400" height="300"></canvas>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            {/* Include your table component here (e.g., React Table) */}

            <div className=" bg-gray-50">
              <div className="mx-auto max-w-screen-xl px-2 py-10">
                <div className="mt-4 w-full">
                  <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                    <form className="relative flex w-full max-w-2xl items-center">
                      <svg
                        className="absolute left-2 block h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" className=""></circle>
                        <line
                          x1="21"
                          y1="21"
                          x2="16.65"
                          y2="16.65"
                          className=""
                        ></line>
                      </svg>
                      <input
                        type="name"
                        name="search"
                        className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                        placeholder="Search by Order ID, Date, Customer"
                      />
                    </form>

                    <button
                      type="button"
                      className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
                    >
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                      <svg
                        className="mr-2 h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      Filter
                    </button>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                  <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                    <thead className="hidden border-b lg:table-header-group">
                      <tr className="">
                        <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                          Order Date
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="float-right mt-1 h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </td>

                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Order ID
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Description
                        </td>
                       

                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Customer
                        </td>
                  

                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Price
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="float-right mt-1 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                            />
                          </svg>
                        </td>

                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Status
                        </td>
                      </tr>
                    </thead>

                    <tbody className="bg-white lg:border-gray-300">
                      {booking.map((bookingItem) => (
                        <tr key={bookingItem.id} className="">
                          <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                            {new Date(
                              bookingItem.transaction.transaction_date
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                            <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-1 h-3 w-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                                {bookingItem.user.username}
                              </div>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-1 h-3 w-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                  />
                                </svg>
                                {bookingItem.category}
                              </div>
                              <div className="">{bookingItem.description}</div>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-1 h-3 w-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                  />
                                </svg>
                                {bookingItem.ticket_count} Kg
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                            {bookingItem.id}
                          </td>

                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                            {bookingItem.event.description}
                          </td>

                       

                          <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                            {bookingItem.user.username}
                          </td>

                         

                          <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                            ${bookingItem.transaction.amount}
                            <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">
                              Action Required
                            </span>
                          </td>

                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                            <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-teal-200 px-2 py-0.5 text-gray-800">
                            Paid
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "loading ................."
      )}
    </div>
  );
};

export default Dashboard;
