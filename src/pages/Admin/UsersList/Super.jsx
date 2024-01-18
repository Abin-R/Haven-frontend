// import NavbarAdmin from "../../../components/Navbar";
import Users from "../Users";
import { useState, useEffect } from "react";
import axios from "axios";
import BlockButton from "../../../components/Admin/BlockButton";



function Super() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("https://haven.abinr.xyz/admins/users/");
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
                    user.is_super &&(

                    <tr key={user.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.image ? (

                              <img
                                className="h-10 w-10 rounded-full"
                                src={`https://haven.abinr.xyz${user.image}`}
                                alt=""
                              />
                            ):(
                              <img
                              className="rounded-3xl"
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLff4uOnrrHn6eqrsbTZ3N25vsHHy82zuLvr7e7c3+DV2NnQ09W8wcPMz9FRQ01gAAADeUlEQVR4nO2b23LjIAxAuYibMfj//3ZxkqZJmtggWyKzw3no9PGMEAJLRIjBYDAYDAaDwWAwGAwGg4EQACBUjFFd/vsGANScXbiS/Sy6awFYH7SRd4zWLqmuXmCdfDC6eRmZ+2kVJf1q9BOvTlog/N8o/WrJ1MEKbPistKIzv1PaNLoGKzI7LR+y6RnLuYTgt5fuHixGK0hVcbrEis1prlUqseJyEnVrd5Xi2oOuQUoaz5FWsLQ4lXrFUturk/yGo1eqrQa/mEQuZRuVVqjXrz1Qa6iorVozaoU4q1q33i1UxCezQzhR16qIcSpMlFIJs3qlgFKuH2SclFkI12/COZVjmVAKMAVhhbIoWGSkZFBkTi23uxfoMh1XOlcIyyfm4LtJ0d3V/zep+RulCCP1lYmOPPokZUkQ8xcWT9y9c4XymJmwUpQH8hRwTqRXT+z2I6wIAn1N0LTfWLgPh0x6RwePChTdIXORipj9F0idcPuPvkWFKOqaWEkgUp2hlwe2NatIz70bU1PLsywe5YfoHdWU6yaQ1qgfGlr7K0wDmqmho6BntkFItRVPF/3GzqzvHidOJ6GqtiBrnFYqVpDdaf8bsMsUGebNxDIu9pi3b43bjVw6GF2YbNbvtIz0PR9xgPLhOVzGyLD0fu8Cwi7ZaK2NWf+GvNjveBlULOycUppjcfwKo6I0PdI3TtenXDYtPjt3uc6E4HL2yxzV+ryrg9Gk5iJTsnzlMc9Lahnpsk8RJkYxEDF5qZ9k/paF4paXqFgiBlP0Tm76PBaskBO1VomRN2/r5YaYzpawlAKkN6/dKrRM8ESVAkqQ0C3PEi6Ce/H2Y7caLZlPfrdUjrjGTHqHdmdqQaq8k+9QonVWboEN2P7rXy1zToXA9ck+a7nj9QHiOSv3YHX4lQmkY3vuvZY/5uRPy6YnK3ekO4R8hrBvJfGJ1diJagJbss5O8ScM7rOQMk4riFgBtZM0zdmOHxfX09rzx0+LGzCuaQFx0452q7ZeEXLY2GzVkOwTQ0JdCfVSzUMFNPULCJnLqVBZF2BmC1T90BQ7UkdaVYUK0M80cFJ1WUV1X/lA1eRNsSqVD6+a2zH+5Q8St5/qE+rlwREqUh24naTc7zJgfi5wjP39x3JneZHa/b0Px+Xulf2iwHnu/bAnpYLmZ3f2rTqw5zQYDAaDwaAD/wANKir9WY4qAQAAAABJRU5ErkJggg==">
                              </img> 
                            )}
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

export default Super;
