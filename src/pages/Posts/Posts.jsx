import  { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from '../../components/Navbar';
import { Link } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/post/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // The empty dependency array ensures that this effect runs once, similar to componentDidMount

  return (
    <div>
      <NavbarAdmin />
      <div className="mt-32 flex justify-center text-2xl font-bold">Posts</div>
      <div className="flex flex-row mt-20">
        {posts.map((post) => (
          <div key={post.id} className="relative mx-9 flex flex-col text-gray-700 bg-white shadow-md w-1/2 rounded-xl bg-clip-border">
            {/* Your existing post content */}
            <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
              <img src={post.image} alt="img-blur-shadow"  />
             
            </div>
            <div className="p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {post.title}
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {post.description}
              </p>
            </div>
            <div className="p-6 pt-0">
            <Link to={`/post/${post.id}`}>
              <button
                className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
              >
                Read More
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
