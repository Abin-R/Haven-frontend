import { useState, useEffect } from "react";
import Finance from "../Finance";
import axios from "axios";
import React from 'react';


function SubscriptionList() {
  // State to store subscription data
  const [subscriptions, setSubscriptions] = useState([]);
  // const [subscribed_users, setSubscribed_users] = useState([]);

  useEffect(() => {
    // Fetch subscription data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/admins/subscription-list/"
        );
        const data = response.data;
        console.log("API Response:", data);
        console.log("subscribed_users",data.subscribed_users) // Add this line
        setSubscriptions(data);
        
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const isSubscriptionExpired = (timestamps) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(timestamps) < thirtyDaysAgo;
  };

  const handleRenew = async (subscriptionId) => {
    try {
      // Send a POST request to the backend for subscription renewal
      const response = await axios.post(
        `http://127.0.0.1:8000/admins/renew-subscription/${subscriptionId}/`
      );

      // Check if the response status is 406
      if (response.status === 406) {
        // Display a specific message for 406 status
        alert("Mail has already been sent for this subscription!");
      } else {
        // Update the local state to reflect the renewal
        setSubscriptions((prevSubscriptions) =>
          prevSubscriptions.map((subscription) =>
            subscription.id === subscriptionId
              ? { ...subscription, renewed: true }
              : subscription
          )
        );

        // Display a success message to the user
        alert("Subscription renewed successfully!");
      }
    } catch (error) {
      // Handle the error and display an error message
      console.error("Error renewing subscription:", error);
      alert("Error renewing subscription. Please try again later.");
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
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td
                  width=""
                  className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                >
                  Renewed Date
                </td>
                <td
                  width=""
                  className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                >
                  End Date
                </td>

                <td className="whitespace-normal py-2 text-sm font-medium text-gray-500 sm:px-6">
                  Name
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
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                  Renew
                </td>
              </tr>
            </thead>

            {/* ... */}
            <tbody className="lg:border-gray-300">
              {subscriptions.map((subscription, index) => (
                <tr key={index} className="">
                  <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                    {new Date(subscription.timestamps).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                    <div className="mt-1 lg:hidden">
                      <p className="font-normal text-gray-500">
                        {subscription.transaction_id}
                        hiii{subscription.id}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {subscription.timestamps &&
                      new Date(
                        new Date(subscription.timestamps).setDate(
                          new Date(subscription.timestamps).getDate() + 30
                        )
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    {subscription.user.username}
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    ${subscription.subscribed_users.id}
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    <div>{subscription.subscription.subscription_type}</div>
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    {isSubscriptionExpired(subscription.timestamps) ? (
                      <button
                        onClick={() => handleRenew(subscription.id)}
                        className="text-white bg-red-500 mx-2 font-medium rounded-xl text-xs whitespace-nowrap px-3 py-1 me-4 mb-2"
                      >
                        Not paid
                      </button>
                    ) : (
                      <div className="text-white bg-green-500 mx-2 flex justify-center font-medium rounded-xl text-xs whitespace-nowrap px-3 py-1 me-4 mb-2">
                        paid
                      </div>
                    )}
                  </td>
                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
  {subscription.subscribed_users.map(user => (
    <React.Fragment key={user.id}>
      {user.is_reneue ? (
        <div className="text-1xl font-bold mx-4">hii</div>
      ) : isSubscriptionExpired(subscription.timestamps) ? (
        <button
          onClick={() => handleRenew(subscription.id)}
          className="text-white bg-blue-700 mx-2 font-medium rounded-lg text-sm px-5 py-2 me-4 mb-2"
        >
          Renew
        </button>
      ) : (
        <div className="text-1xl font-bold">Renewed</div>
      )}
    </React.Fragment>
  ))}
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

export default SubscriptionList;
