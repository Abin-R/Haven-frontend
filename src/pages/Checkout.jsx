import NavbarAdmin from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TicketModal from "../components/SubmitEvents/TicketModal";

function Checkout() {
  const { eventId } = useParams();
  const [ticketCount, setTicketCount] = useState(1);
  const [eventDetails, setEventDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Define a function to fetch event details from the backend
    const fetchEventDetails = async () => {
      try {
        // Replace 'your-backend-endpoint' with the actual endpoint for fetching event details
        const response = await fetch(
          `http://127.0.0.1:8000/event/events/${eventId}`
        );
        const data = await response.json();
        console.log(data);
        // Update the state with the received event details
        setEventDetails(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    // Call the fetchEventDetails function
    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    // Update total price whenever ticket count changes
    setTotalPrice(parseFloat(eventDetails?.cost) * ticketCount);
  }, [ticketCount, eventDetails?.cost]);

  const handleIncrement = () => {
    const maxTicketCount = eventDetails.ticket_count; // Set your desired maximum ticket count

    if (ticketCount < maxTicketCount) {
      setTicketCount((prevCount) => prevCount + 1);
    } else {
      // If the limit is reached, show a window prompt
      window.alert(
        `You cannot exceed the maximum ticket count of ${maxTicketCount}.`
      );
    }
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount((prevCount) => prevCount - 1);
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //   const handleBuyTickets = (count) => {
  //     // Handle the logic for buying tickets
  //     setSelectedTickets(count);
  //   };

  return (
    <div>
      {eventDetails ? (
        <>
          <NavbarAdmin />
          <div className="relative mt-20 mx-auto w-full bg-white">
            <div className="grid min-h-screen grid-cols-10">
              <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
                <div className="mx-auto w-full max-w-lg">
                  <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                    Choose Your Tickets
                    <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
                  </h1>
                  <div className="mt-10 flex flex-col space-y-4">
                    <div className="mt-4 mb-2 text-sm font-semibold  text-gray-500">
                      Available Tickets: <span className="mx-3">{eventDetails.ticket_count}</span>
                    </div>
                    <div>
                      <label
                        htmlFor="ticket-type"
                        className="text-xs font-semibold text-gray-500"
                      >
                        Ticket Type
                      </label>
                      <select
                        name="ticket-type"
                        id="ticket-type"
                        className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select Ticket Type</option>
                        <option value="regular">Regular Ticket</option>
                      </select>
                    </div>
                    <div className="flex items-center mt-4 mb-4 ">
                      <p className="text-sm font-semibold text-gray-500 mr-4">
                        Quantity:
                      </p>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-teal-500 rounded-full text-white focus:outline-none"
                        onClick={handleDecrement}
                      >
                        -
                      </button>
                      <span className="mx-4 text-2xl font-bold">
                        {ticketCount}
                      </span>
                      <button
                        className="flex items-center justify-center w-10 h-10 bg-teal-500 rounded-full text-white focus:outline-none"
                        onClick={handleIncrement}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleOpenModal}
                      className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                    >
                      Place Order
                    </button>
                  </div>
                  <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                    By placing this order you agree to the{" "}
                    <a
                      href="#"
                      className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
                    >
                      Terms and Conditions
                    </a>
                  </p>
                </div>
              </div>

              <div className="relative h-screen col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
                <h2 className="sr-only">Order summary</h2>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
                </div>
                <div className="relative">
                  <ul className="space-y-5">
                    <li className="flex justify-between">
                      <div className="inline-flex">
                        <img
                          src={`http://127.0.0.1:8000${eventDetails.image}`}
                          alt=""
                          className="max-h-16"
                        />
                        <div className="ml-3">
                          <p className="text-base font-semibold text-white">
                            {eventDetails.title}
                          </p>
                          <p className="text-sm font-medium text-white text-opacity-80">
                            {eventDetails.start_date}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        ${eventDetails.cost}
                      </p>
                    </li>
                  </ul>
                  <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                  <div className="space-y-2">
                    <p className="flex justify-between text-lg font-bold text-white">
                      <span>Total price:</span>
                      <span>${totalPrice}</span>
                    </p>
                    {/* <p class="flex justify-between text-sm font-medium text-white">
                      <span>Vat: 10%</span>
                      <span>$55.00</span>
                    </p> */}
                  </div>
                </div>
                <div className="relative mt-10 text-white">
                  <h3 className="mb-5 text-lg font-bold">Support</h3>
                  <p className="text-sm font-semibold">
                    +01 653 235 211{" "}
                    <span className="font-light">(International)</span>
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    support@nanohair.com <span className="font-light">(Email)</span>
                  </p>
                  <p className="mt-2 text-xs font-medium">
                    Call us now for payment related issues
                  </p>
                </div>
                <div className="relative mt-10 flex">
                  <p className="flex flex-col">
                    <span className="text-sm font-bold text-white">
                      Money Back Guarantee
                    </span>
                    <span className="text-xs font-medium text-white">
                      within 30 days of purchase
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <TicketModal
              price={totalPrice}
              event={eventDetails.title}
              onClose={handleCloseModal}
              ticket={ticketCount}
              // onBuyTickets={handleBuyTickets}
            />
          )}
        </>
      ) : (
        "..................LOADING"
      )}
    </div>
  );
}

export default Checkout;
