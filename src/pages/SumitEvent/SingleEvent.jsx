import { useState, useEffect } from "react";
import NavbarAdmin from "../../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import TicketModal from "../../components/SubmitEvents/TicketModal";

function SingleEvent() {
  const [event, setEvent] = useState({});
  console.log("Price in SingleEvent:", event.cost);
  const [activeSection, setActiveSection] = useState("details");
  const { eventId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setSelectedTickets] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(parseFloat(event.cost));

  useEffect(() => {
    // Update total price whenever ticket count changes
    setTotalPrice(parseFloat(event.cost) * ticketCount);
  }, [ticketCount, event.cost]);

  const handleIncrement = () => {
    setTicketCount(ticketCount + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBuyTickets = (count) => {
    // Handle the logic for buying tickets
    setSelectedTickets(count);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    // Fetch event details based on the eventId from the URL
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/event/events/${eventId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    // Call the fetchEventDetails function
    fetchEventDetails();
  }, [eventId]);
  return (
    <>
      <NavbarAdmin />
      <div>
        <div>
          <img
            className="w-full h-64 sm:h-32 xl:h-96 mt-20"
            src={`http://127.0.0.1:8000${event.image}`}
            alt="Event"
          />
        </div>

        {/* <p className="absolute top-28 right-8 ">
          <div className="min-w-10  min-h-48 p-3 mb-4 font-medium">
            <div className="w-32 h-40  flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
              <div className="block rounded-t overflow-hidden  text-center ">
                <div className="bg-blue-500 text-white py-1">March</div>
                <div className="pt-1 border-l border-r border-white bg-white">
                  <span className="text-5xl font-bold leading-tight">17</span>
                </div>
                <div className="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                  <span className="text-sm">Sunday</span>
                </div>
                <div className="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white">
                  <span className="text-xs leading-normal">
                    8:00 am to 5:00 pm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </p> */}
      </div>
      <div className="flex flex-row justify-between items-center py-1">
        <span className="lg:font-extrabold lg:text-2xl  text-xl mb-2 mt-5 lg:px-7  mx-4 font-extrabold">
          {event.title}
        </span>
        <span className="mr-8 lg:mt-6 lg:text-4xl text-2xl text-orange-500">
          ${event.cost}
        </span>
      </div>
      <div className="flex lg:flex-row flex-col">
        <div className="lg:text-xl mb-2 mt-2 flex flex-row lg:px-9 mx-4 font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          <span className="px-3">{event.start_date}</span>
        </div>
        <div className="lg:text-xl mb-2 flex flex-row mx-4 lg:font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <span className="px-2">{event.location}</span>
        </div>
      </div>
      <hr className="h-px lg:mx-6 mx-3 mr-4 my-4 bg-gray-500 border-2 dark:bg-gray-500"></hr>
      <div>
        <p className="mb-3 lg:px-3 mx-5 text-gray-900 dark:text-gray-900 tracking-widest first-line:px-5   first-letter:text-3xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-900 first-letter:ml-7 ">
          {event.description}
        </p>
        <p className="mb-3 lg:px-3 mx-5 text-gray-900 dark:text-gray-900 tracking-widest first-line:px-5   first-letter:text-3xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-900 first-letter:ml-7 ">
          Aside barring goodness shivered proofread bee frenetically coughed
          earthworm much during rakish hey august while and yikes one oh giraffe
          when magnificently darn far ouch much much conditionally. Tranquilly
          egregious and blubbered dense this fed that a this some horrendous
          volubly alas amid diligently where armadillo krill apart belched much
          more hey authentically a ashamedly that within one onto wow in.
          Dynamic far infallible oh ouch a and nefariously inflexible vigorous a
          some wise forecast mysteriously foolhardy that some because porcupine
          horse scooped where acutely resplendent inside after regarding yikes
          wolf less so peskily blinked.
        </p>
      </div>
      <div className="flex items-end flex-col justify-end ">
        <div className="flex items-center mb-4 mx-2 p-5">
          <div className="font-semibold text-lg mx-3">Tickets</div>

          <button className="px-4 py-2 border" onClick={handleDecrement}>
            -
          </button>
          <span className="mx-4">{ticketCount}</span>
          <button className="px-4 py-2 border" onClick={handleIncrement}>
            +
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 mx-8">
          Total Price - {totalPrice}
        </h2>
        <button
          type="button"
          className="text-white py-2.5 mx-4 my-8 lg:mx-8 bg-green-700 hover:bg-green-800 font-mono focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-base px-5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleOpenModal}
        >
          Buy Tickets
        </button>

        {isModalOpen && (
          <TicketModal
            price={totalPrice}
            event={event.title}
            onClose={handleCloseModal}
            onBuyTickets={handleBuyTickets}
          />
        )}
      </div>

      <div>
        <div className="lg:p-9 py-7 mt-4">
          <ul className="grid grid-flow-col text-center text-gray-500  p-1">
            <li>
              <a
                href="#page1"
                className={`flex justify-center py-4 ${
                  activeSection === "details"
                    ? "font-bold bg-white rounded-tl-lg rounded-tr-lg border-l border-t border-r border-gray-200"
                    : ""
                }`}
                onClick={() => handleSectionChange("details")}
              >
                Details
              </a>
            </li>
            <li>
              <a
                href="#page2"
                className={`flex justify-center  py-4 ${
                  activeSection === "organizer"
                    ? "font-bold bg-white rounded-tl-lg rounded-tr-lg border-l border-t border-r border-gray-200"
                    : ""
                }`}
                onClick={() => handleSectionChange("organizer")}
              >
                Organizer
              </a>
            </li>
            <li>
              <a
                href="#page3"
                className={`flex justify-center py-4 ${
                  activeSection === "venue"
                    ? "font-bold bg-white rounded-tl-xl rounded-tr-xl border-l border-t border-r border-gray-200"
                    : ""
                }`}
                onClick={() => handleSectionChange("venue")}
              >
                Venue
              </a>
            </li>
          </ul>
          <div className="bg-white shadow border border-gray-100 p-8 text-gray-700 rounded-lg -mt-2">
            {activeSection === "details" && (
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <span className="font-bold">Start :</span>
                  <span className="text-gray-400">{event.start_date}</span>
                </div>
                <div className="flex flex-col mt-3">
                  <span className="font-bold">End :</span>
                  <span className="text-gray-400">{event.end_date}</span>
                </div>
                <div className="flex flex-col mt-3">
                  <span className="font-bold">Cost :</span>
                  <span className="text-gray-400">{event.cost}</span>
                </div>
                <div className="flex flex-col mt-3">
                  <span className="font-bold">Event Category :</span>
                  <span className="text-gray-400">{event.category}</span>
                </div>
              </div>
            )}
            {activeSection === "organizer" && (
              <p>Organizer content goes here</p>
            )}
            {activeSection === "venue" && <p>Venue content goes here</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleEvent;
