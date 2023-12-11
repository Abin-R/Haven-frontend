import { useState, useEffect } from "react";
import axiosInstance from "../../Store/Axios";
import NavbarAdmin from "../../components/Admin/NavbarAdmin";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/admins/post-list/"
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="container mx-auto px-4 sm:px-8 my-30">
        <div className="my-28">
          <div>
            <h2 className="text-3xl my-3 font-bold leading-tight">Posts</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                   
                    <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Description
                    </th>

                    <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b border-gray-200"
                    >
                      
                      <td className="px-6 py-4  flex whitespace-nowrap text-sm font-medium text-gray-900">
                      <img
                          src={`https://haven.abinr.xyz${post.image}`}
                          className="w-10 h-10 rounded-lg"
                          alt="Post Image"
                        />
                        <span className="mx-3 mt-2 ">{post.event.title}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {post.user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {post.description}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:underline">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostList;
