
import Users from "../Users";
import { useState, useEffect } from "react";
import axios from "axios";
import BlockButton from "../../../components/Admin/BlockButton";


function Premium() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/admins/users/");
          if (response.status === 200) {
            console.log(response.data.userlist);
            setUsers(response.data.userlist);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUsers();
    }, []);
  return (
    <>
      <Users />

      <div className="flex flex-col px-6 mt-12 ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                
                  {users.map((user) => (
                    user.is_premium &&(

                    <tr key={user.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`http://127.0.0.1:8000${user.image}`}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.phone ? user.phone : "---"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {/* {person.department} */}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full ${
                            user.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      {user.is_premium ? (
                        <td className="px-6 ml-60 py-4 whitespace-nowrap text-sm text-gray-500">
                          Premium
                        </td>
                      ) : user.is_super ? (
                        <td className="px-6 ml-60 py-4 whitespace-nowrap text-sm text-gray-500">
                          Super
                        </td>
                      ) : user.admin ? (
                        <td className="px-6 ml-60 py-4 whitespace-nowrap text-sm text-gray-500">
                          Admin
                        </td>
                      ) : (
                        <td className="px-6 ml-60 py-4 whitespace-nowrap text-sm text-gray-500">
                          user
                        </td>
                      )}

<BlockButton userId={user.id} isActive={user.is_active} />
                    </tr>
                    )
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

export default Premium;
