/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "../../components/Navbar";
import { Link } from "react-router-dom";
import Paginator from "../../components/Pagination/Paginator";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/groovyWalk.json";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://haven.abinr.xyz/post/posts/");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // The empty dependency array ensures that this effect runs once, similar to componentDidMount

  return (
    <div className="bg-gray-100">
      <NavbarAdmin bgColor="bg-white" />
      <div className="">
        <div className="sm:mt-24 mt-20 md:mt-16 lg:mt-18 xl:mt-20 flex justify-center text-2xl font-extrabold">
          <span className="mt-5">Posts</span>
        </div>
        {posts[0] ? (
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:px-10 px-7 mt-5 md:mt-8 lg:mt-6 xl:mt-7">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative flex flex-col bg-white text-gray-700 shadow-md rounded-xl bg-clip-border"
              >
                {/* Your existing post content */}
                <div className="relative h-56 overflow-hidden text-white shadow-lg rounded-t-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                <img
  src={`${post.image.replace('http://0.0.0.0:9090', 'https://haven.abinr.xyz')}`}
  alt="img-blur-shadow" 
  className="h-full w-full object-cover rounded-lg"
/>
                  
                </div>
                <div className="p-4 md:p-6">
                  <h5 className="block mb-2 font-sans text-lg md:text-xl lg:text-2xl xl:text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {post.event.title}
                  </h5>
                  <p className="block font-sans text-sm md:text-base lg:text-lg xl:text-lg antialiased font-light leading-relaxed text-inherit">
                    {post.description}
                  </p>
                </div>
                <div className="p-4 md:p-6 pt-0">
                  <Link to={`/post/${post.id}`}>
                    <button
                      className="select-none rounded-lg bg-pink-500 py-2 md:py-3 px-4 md:px-6 text-center align-middle font-sans text-xs md:text-sm lg:text-base xl:text-base font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      data-ripple-light="true"
                    >
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
            <Paginator />
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <Lottie
                animationData={groovyWalkAnimation}
                style={{ height: "400px" }}
              />
              <h2
                className="text-lg sm:text-xl"
                style={{ color: "#555", marginTop: "10px" }}
              >
                Oops! Looks like there are no posts available.
              </h2>
              <p
                className="text-xs px-2 sm:text-xl"
                style={{
                  color: "#888",
                  paddingBottom: "70px",
                  marginTop: "10px",
                }}
              >
                Don't worry, our team is working hard to bring you exciting
                content soon. Stay tuned!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Posts;
