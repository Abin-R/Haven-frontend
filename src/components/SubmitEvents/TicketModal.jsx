import Booking from '../Paypal/Booking';

// eslint-disable-next-line react/prop-types
function TicketModal({ onClose, event, price,ticket }) {
  const handleBuyTickets = () => {
    // Pass the selected ticket count to the parent component
    
    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 mt-20 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
        <button
          className="flex justify-start px-72 mr-8 mb-5  items-end text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={handleBuyTickets}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h2 className="text-lg font-bold mb-4 mx-2 text-teal-600">
         {event}
        </h2>
        <h2 className="text-lg font-bold mb-4 ml-20 text-gray-700">
          Price of Ticket: ${price}
        </h2>

        <div className="my-4 border-t-2 border-gray-200 pt-4">
          <p className="text-sm text-gray-600">
           Your payment is secured with industry-standard encryption.
          </p>
          <p className="text-sm text-gray-600">
            We do not store your payment details.
          </p>
        </div>

        <Booking event={event} prices={parseFloat(price)}  ticket={ticket}/>

        <p className="text-xs text-gray-500 mt-4">
          By proceeding, you agree to our{' '}
          <a
            href="#"
            className="text-teal-500 hover:underline"
          >
            Terms and Conditions
          </a>
        </p>
      </div>
    </div>
  );
}

export default TicketModal;
