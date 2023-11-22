
import Booking from '../Paypal/Booking';

// eslint-disable-next-line react/prop-types
function TicketModal({ onClose, event, price }) {

  

  
  

  const handleBuyTickets = () => {
    // Pass the selected ticket count to the parent component
    
    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <button className="flex justify-end items-end  " onClick={handleBuyTickets}>close</button>
        
        <h2 className="text-2xl font-bold mb-4 mx-8">Name - {event}</h2>
        <h2 className="text-2xl font-bold mb-4 mx-8">Price of Ticket - {price}</h2>
       
        
        <Booking event={event} prices={parseFloat(price)} />
      </div>
    </div>
  );
}

export default TicketModal;
