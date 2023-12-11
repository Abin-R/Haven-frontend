/* eslint-disable react/prop-types */
import axios from 'axios';

function BlockButton({ userId, isActive }) {
  const handleBlock = async () => {
    try {
      // Determine the endpoint based on the user's current status
      const endpoint = isActive
        ? `https://haven.abinr.xyz/admins/block-user/${userId}/`
        : `https://haven.abinr.xyz/admins/unblock-user/${userId}/`;

      // Make a POST request to the appropriate backend endpoint using Axios
      const response = await axios.post(endpoint, {
        // Add any request data if needed
      });

      if (response.status === 200) {
        console.log(`User ${isActive ? 'blocked' : 'unblocked'} successfully`);
        
        // Reload the page after blocking or unblocking the user
        window.location.reload();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <td className="px-2 ml-72 py-8  whitespace-nowrap text-right text-sm font-medium">
        <button
          className={`text-${isActive ? 'bg-red-700 text-red-700 mx-2' : 'bg-green-600 text-green-600'} `}
          onClick={handleBlock}
        >
          {isActive ? 'Block' : 'Unblock'}
        </button>
      </td>
    </div>
  );
}

export default BlockButton;
