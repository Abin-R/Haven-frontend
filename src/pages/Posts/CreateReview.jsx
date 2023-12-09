import NavbarAdmin from "../../components/Navbar";
import { useState } from "react";
import axiosInstance from "../../Store/Axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function CreateReview() {
  const { postid } = useParams();
  const [formData, setFormData] = useState({
    rating: "",
    review_text: "",
    images: [], // Use an array to store multiple images
  });

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: e.target.files[0], // Use e.target.files to handle the file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access_token");
      const formDataToSend = new FormData();

      formDataToSend.set("postid", postid);

      // Append other form data
      for (const key in formData) {
        if (key === "images") {
          formDataToSend.append("image", formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      formDataToSend.set("date_created", new Date().toISOString());

      console.log("FormData to Send:", formDataToSend);

      await axiosInstance.post(
        "http://127.0.0.1:8000/post/create-event-review/",
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          
        }
      );

      setFormData({
        rating: "",
        review_text: "",
        images: [], // Reset the images state
      });

      history("/posts");
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log(error.response);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="mt-36 flex justify-center font-bold text-4xl">
        Create Review
      </div>
      <div
        className="w-full mt-20  md:max-w-full mx-auto"
        style={{ width: "900px" }}
      >
        <div className="py-8  border border-gray-300 sm:rounded-md">
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="mx-16"
          >
            <label className="block mb-6">
              <span className="text-gray-700 font-bold">Rating</span>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="1-5"
                value={formData.rating}
                onChange={handleChange}
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-700 font-bold">Review Text</span>
              <textarea
                name="review_text"
                className="block w-full mt-2 border-gray-800 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"
                placeholder="Write your review here."
                value={formData.review_text}
                onChange={handleChange}
              ></textarea>
            </label>
            <label className="block mb-6">
              <span className="text-gray-700 font-bold py-2">Images</span>
              <input
                name="images"
                type="file"
                className="py-2 block w-full mt-1 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={handleImageChange}
                multiple // This allows selecting multiple files
              />
            </label>

            <div className="mb-6">
              <button
                type="submit"
                className="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
              >
                Submit
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateReview;
