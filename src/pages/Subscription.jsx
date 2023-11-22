import NavbarAdmin from "../components/Navbar";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import axios from "axios";
import PaypalButton from "../components/Paypal/button";

function Subscription() {
//   const { isAuthenticated, username } = useSelector((state) => state.user);
  const [subscriptions, setSubscriptions] = useState([]);

//   const product = {
//     description: "nothing officalyy",
//     price: 90,
//   };

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/subscription/subscriptions"
        ); // Replace this URL with your Django endpoint
        setSubscriptions(response.data);
        
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    }
    fetchSubscriptions();
  }, []);

//   const handleSubscription = async (subscriptionType) => {
//     console.log("subscription_type", subscriptionType);
//     if (isAuthenticated) {
//       try {
//         const response = await axios.post(
//           "http://127.0.0.1:8000/subscription/save-subscription/",
//           {
//             username: username,
//             subscriptionType,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.status === 200) {
//           // Handle success
//           console.log("Subscription saved successfully!");
//         } else {
//           // Handle error
//           console.error("Failed to save subscription");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     } else {
//       // Redirect to the login page or show a message
//       console.log("User is not authenticated. Redirect to the login page.");
//       // Example: history.push('/login');
//     }
//   };
  return (
    < >
      <NavbarAdmin />

      <div className="mt-28 sm:px-9 px-2">
        <div>
          <h2 className="text-3xl font-bold tracki text-center mt-10 sm:text-5xl ">
            Subscription
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">
            Discover Your Haven: Craft a Membership Tailored for You
          </p>
        </div>
        <div className="sm:mt-24  container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="relative p-7 py-14  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1 ">
              {subscriptions &&
                subscriptions.map((subscription) => (
                  <div className="mt-0" key={subscription.id}>
                    {subscription.subscription_type === "super" ? (
                      <h3 className="text-xl font-semibold">
                        {subscription.subscription_type}
                      </h3>
                    ) : (
                      <h3 className="text-xl font-semibold">
                        {/* Display other subscription types */}
                      </h3>
                    )}
                    {subscription.subscription_type === "super" ? (
                      <p className="mt-4 flex items-baseline">
                        <span className="text-5xl font-extrabold tracking-tight">
                          ₹{subscription.price}
                        </span>
                        <span className="ml-1 text-xl font-semibold">
                          /month
                        </span>
                      </p>
                    ) : (
                      <p className="mt-4 flex items-baseline">
                        {/* Display other subscription prices */}
                      </p>
                    )}
                  </div>
                ))}
              <p className="mt-6 ">You just want to discover</p>
              <ul role="list" className="mt-6 space-y-6">
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 w-6 h-6 text-emerald-500"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="ml-3 ">Submit Events</span>
                </li>
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 w-6 h-6 text-emerald-500"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="ml-3 ">Post Events</span>
                </li>
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 w-6 h-6 text-emerald-500"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="ml-3 ">Explore </span>
                </li>
              </ul>
            </div>
            {subscriptions &&
              subscriptions.map((subscription) => (
                <div className="mt-0" key={subscription.id}>
                  {subscription.subscription_type === "super" && (
                    <div className="mt-10">
                      <PaypalButton subscriptionType={subscription.subscription_type} price={parseFloat(subscription.price)} />

                    </div>
                  )}
                </div>
              ))}

            {/* <button
              onClick={() => handleSubscription("super",10.00)}
              className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            >
              Checkout with Super
            </button> */}
          </div>
          <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
            <div className="flex-1">
              {subscriptions &&
                subscriptions.map((subscription) => (
                  <div key={subscription.id}>
                    {subscription.subscription_type === "premium" ? (
                      <h3 className="text-xl font-semibold">
                        {subscription.subscription_type}
                      </h3>
                    ) : (
                      <h3 className="text-xl font-semibold">
                        {/* Display other subscription types */}
                      </h3>
                    )}
                    <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">
                      Most Recommended
                    </p>
                    {subscription.subscription_type === "premium" ? (
                      <p className="mt-4 flex items-baseline">
                        <span className="text-5xl font-extrabold tracking-tight">
                          ₹{subscription.price}
                        </span>
                        <span className="ml-1 text-xl font-semibold">
                          /month
                        </span>
                      </p>
                    ) : (
                      <p className="mt-4 flex items-baseline">
                        {/* Display other subscription prices */}
                      </p>
                    )}
                  </div>
                ))}
              <p className="mt-6 ">You want to be part of association</p>
              <ul role="list" className="mt-6 space-y-6">
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 w-6 h-6 text-emerald-500"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="ml-3 ">Explore</span>
                </li>
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 w-6 h-6 text-emerald-500"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="ml-3 ">Submit Events</span>
                </li>
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 w-6 h-6 text-emerald-500"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="ml-3 ">Post Events</span>
                </li>
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 w-6 h-6 text-emerald-500"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="ml-3 ">Group Chat</span>
                </li>
                <li className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 w-6 h-6 text-emerald-500"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="ml-3 ">Discount on bookings</span>
                </li>
              </ul>
            </div>
            {/* <button
              onClick={() => handleSubscription("premium")}
              className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            >
              Checkout with Premium
            </button> */}
            {subscriptions &&
              subscriptions.map((subscription) => (
                <div className="mt-0" key={subscription.id}>
                  {subscription.subscription_type === "premium" && (
                    <div className="mt-10">
                      <PaypalButton subscriptionType={subscription.subscription_type} price={parseFloat(subscription.price)} />

                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscription;
