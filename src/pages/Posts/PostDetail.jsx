import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../../components/Navbar";
import { useSelector } from "react-redux";
import StarRating from "../../components/posts/StarRating";

function PostDetail() {
  const history = useNavigate();

  const { postId } = useParams();
  const [activeSection, setActiveSection] = useState("details");
  const [post, setPost] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [review, setReview] = useState(null);

  const { username } = useSelector((state) => state.user);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleRateEvent = (postid) => {
    // Assuming you want to navigate to the "create-review" page
    history(`/create-review/${postid}`);
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `https://haven.abinr.xyz/post/posts/${postId}`
        );
        console.log(response.data);
        setPost(response.data.post);
        setBookings(response.data.bookings);
        setReview(response.data.event_reviews);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (!post) {
    // If post details are not available yet, you can render a loading state or redirect
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavbarAdmin />

      <div className="flex items-center justify-center xl:mt-24 mt-20 rounded-sm ">
        <img
          className="xl:rounded-3xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-2xl shadow-lg xl:max-w-screen-xl"
          src={`http://127.0.0.1:8000${post.image}`}
          alt="Post Image"
          style={{ width: "700px" }}
        />
      </div>

      <div className="mt-11 mx-6 font-extrabold text-2xl">
        {post.event.title}
      </div>
      <div className="flex">
        <div className="mt-2 mx-6 font-semibold text-base">
          {post.event.start_date} | By {post.user.username} |{" "}
          {post.event.category}
        </div>
      </div>
      {/* <hr className="h-px lg:mx-6 mx-3 mr-4 my-6 bg-gray-200 border-spacing-y-0.5 dark:bg-gray-100"></hr> */}
      <div>
        <div className="lg:p-0.5 py-9 mt-8">
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
                Description
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
                Rating & Reviews
              </a>
            </li>
            {/* <li>
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
            </li> */}
          </ul>
          <div className="bg-white shadow border border-gray-100 p-8 text-gray-700 rounded-lg -mt-2">
            {activeSection === "details" && (
              // <div className="flex flex-col">
              //   <div className="flex flex-col">
              //     <span className="font-bold">Start :</span>
              //     <span className="text-gray-400">{event.start_date}</span>
              //   </div>
              //   <div className="flex flex-col mt-3">
              //     <span className="font-bold">End :</span>
              //     <span className="text-gray-400">{event.end_date}</span>
              //   </div>
              //   <div className="flex flex-col mt-3">
              //     <span className="font-bold">Cost :</span>
              //     <span className="text-gray-400">{event.cost}</span>
              //   </div>
              //   <div className="flex flex-col mt-3">
              //     <span className="font-bold">Event Category :</span>
              //     <span className="text-gray-400">{event.category}</span>
              //   </div>
              // </div>
              <div>
                <p className="mb-3 lg:px-3 mx-5 text-gray-900 dark:text-gray-900 tracking-widest first-line:px-5 first-letter:text-3xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-900 first-letter:ml-7">
                  {post.description}
                </p>
              </div>
            )}
            {activeSection === "organizer" && (
              <div>
                {bookings.map((user) => {
                  if (user.user.username === username) {
                    const userHasReviewed =
                    review &&
                    review.some(
                        (review) => review.user_username  === username
                      );

                    // Render the button only if the user has not reviewed the event
                    if (!userHasReviewed) {
                      return (
                        <button
                          className="flex justify-end px-6 focus:outline-none text-Black mb-6 bg-white shadow-lg hover:bg-gray-300 font-medium rounded-lg text-sm py-2.5 mr-6 items-end ml-auto"
                          key={user.id}
                          onClick={() => handleRateEvent(post.event.id)}
                        >
                          <svg
                            className="w-4 h-4 text-gray-900 mr-2 mb-1.5 transition duration-300 transform hover:text-gold"
                              aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <span className="text-lg">Rate Event</span>
                        </button>
                      );
                    }
                  }
                  return null;
                })}

                <div className="flex flex-col justify-start items-start w-full bg-gray-50 space-y-8">
                  {review.map((review, index) => (
                    <div
                      key={index}
                      className="w-full flex justify-start items-start flex-col py-9 p-3"
                    >
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex flex-row justify-between ">
                          <div className="mb-8 mx-2 flex justify-start items-center flex-row space-x-2.5">
                            {/* Avatar */}
                            <div>
                              <img
                                src="https://i.ibb.co/QcqyrVG/Mask-Group.png"
                                alt="girl-avatar"
                              />
                            </div>
                            {/* User Info */}
                            <div className="flex flex-col justify-start items-start space-y-2">
                              <p className="text-base font-bold leading-none text-gray-800 ">
                                {review.user_username
}
                              </p>
                              <p className="text-sm leading-none text-gray-600 ">
                                {new Date(
                                  review.date_created
                                ).toLocaleDateString()}{" "}
                                {/* Format date as needed */}
                              </p>
                            </div>
                          </div>
                          {/* Rating */}
                          <div className="cursor-pointer mt-1 mx-5">
                            <StarRating rating={review.rating} />
                          </div>
                        </div>

                        {/* Review Text */}
                        <div className="justify-between items-start px-2">
                          <p className="text-xl font-normal leading-normal text-gray-800 ">
                            {review.review_text}
                          </p>
                          {/* Images */}
                          {review.images && review.images.length > 0 && (
                            <div className="hidden md:flex mt-6 flex-row justify-start items-start space-x-4">
                              {review.images.map((image, imageIndex) => (
                                <div key={imageIndex}>
                                  <img
                                    src={`http://127.0.0.1:8000${image.image}`}
                                    alt={`review-image-${image.id}`}
                                    style={{ width: "140px", height: "130px" }} // Adjust the width and height as needed
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeSection === "venue" && <p>Venue content goes here</p>}
          </div>
        </div>
      </div>

      {/* <div>
        <p className="mb-3 lg:px-3 mx-5 text-gray-900 dark:text-gray-900 tracking-widest first-line:px-5 first-letter:text-3xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-900 first-letter:ml-7">
          {post.description}
        </p>
      </div> */}
      <div className="flex justify-center mt-8 xl:h-full sm:h-6">
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md xl:w-64 w-48  rounded-xl bg-clip-border hover:bg-green-800 hover:text-white transition duration-300 transform hover:scale-105">
          <div className="p-6 pt-0">
            <button
              className="flex  gap-2 xl:ml-20  ml-16 py-2  font-sans text-xs font-bold text-center text-pink-500 uppercase  transition-all rounded-lg select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-dark="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Previous Post
            </button>
          </div>
          <div className="p-6 mx-2">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              UI/UX Review Check
            </h5>
          </div>
        </div>
        <div className="relative mx-1 flex flex-col mt-6 text-gray-700 hover:bg-green-800 hover:text-white bg-white shadow-md w-64 rounded-xl bg-clip-border transition duration-300 transform hover:scale-105">
          <div className="p-6 pt-0">
            <button
              className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-pink-500 uppercase align-middle transition-all rounded-lg select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-dark="true"
            >
              Next Post
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              UI/UX Review Check
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
