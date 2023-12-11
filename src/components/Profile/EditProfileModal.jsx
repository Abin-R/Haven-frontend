// EditProfileModal.jsx
import { useState } from 'react';
import axiosInstance from '../../Store/Axios';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const EditProfileModal = ({ onClose,  initialData }) => {
    const {username} = useSelector((state) => state.user)
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axiosInstance.put(
        'https://haven.abinr.xyz/api/profile-update',
        { ...formData, username }, // Include username in formData
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        onClose();
      } else {
        console.error('Profile update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <div className="flex flex-row justify-between ">
          <h2 className="text-2xl font-bold mb-6 mt-3">Edit Profile</h2>
          <p
            className="text-2xl font-bold   text-black cursor-pointer  righ-2"
            onClick={onClose}
          >
            &times;
          </p>
        </div>
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Address:</span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </label>
        {/* Additional address fields */}
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
          <div>
            <label htmlFor="city">Country:</label>
            <input
              type="text"
              name="country"
              id="country"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="zipcode">Zipcode:</label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              className="h-10 mb-5 border mt-1 rounded px-4 w-full bg-gray-50"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="bg-teal-600 text-white py-2 px-28 mx-9 rounded-xl hover:bg-teal-800 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
