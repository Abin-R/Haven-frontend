import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavbarAdmin from "../../components/Navbar";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/post/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
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

      <div className="flex items-center justify-center mt-24 rounded-sm">
        <img
          className="rounded-3xl"
        //   src={post.image}
          src={`http://127.0.0.1:8000${post.image}`}
          alt="Post Image"
          style={{ width: "600px" }}
        />
      </div>
      <div className="mt-11 mx-6 font-extrabold text-2xl">
        {post.event.title}
      </div>
      <div className="mt-2 mx-6 font-semibold text-base">
        {post.event.start_date} | By {post.user.username} | {post.event.category}
      </div>
      <hr className="h-px lg:mx-6 mx-3 mr-4 my-4 bg-gray-500 border-2 dark:bg-gray-500"></hr>
      <div>
        <p className="mb-3 lg:px-3 mx-5 text-gray-900 dark:text-gray-900 tracking-widest first-line:px-5 first-letter:text-3xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-900 first-letter:ml-7">
          {post.description}
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md w-64 rounded-xl bg-clip-border hover:bg-green-800 hover:text-white transition duration-300 transform hover:scale-105">
          <div className="p-6 pt-0">
            <button
              className="flex items-center gap-2 ml-20 py-2 font-sans text-xs font-bold text-center text-pink-500 uppercase align-middle transition-all rounded-lg select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
