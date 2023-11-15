// import NavbarAdmin from "../../../components/Navbar";
import Users from "../Users";
import { useState, useEffect } from "react";
import axios from "axios";
import BlockButton from "../../../components/Admin/BlockButton";



function Admin() {
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
                    user.admin &&(

                    <tr key={user.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="data:image/jpeg;base64,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"
                              alt=""
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

export default Admin;
