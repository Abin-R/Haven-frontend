import NavbarAdmin from "../../components/Admin/NavbarAdmin";
import { NavLink, useLocation } from "react-router-dom";


function Finance() {
  const location = useLocation();

  
  

  return (
    <>
      <div>
        <NavbarAdmin />
      </div>

      <div className="text-lg font-semibold  mt-28  text-center text-gray-500  border-gray-200 dark:text-gray-950 ">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <NavLink
              to="/subscription-list"
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                location.pathname === "/all-users" || location.pathname === "/subscription-list"
                  ?"text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              Subscription List
            </NavLink>
          </li>
          <li className="me-2">
            <NavLink
              to="/event-booking-list"
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                location.pathname === "/event-booking-list"
                  ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              Event Booking
            </NavLink>
          </li>
          {/* <li className="me-2">
            <NavLink
              to="/super-users"
              className={`inline-block p-4 ${
                location.pathname === "/super-users"
                  ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              Super Users
            </NavLink>
          </li> */}
          {/* <li className="me-2">
            <NavLink
              to="/premium-users"
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                location.pathname === "/premium-users"
                  ? "text-blue-600 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              Premium Users
            </NavLink>
          </li> */}
          {/* <li className="me-2">
            <NavLink
              to="/admin-users"
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                location.pathname === "/admin-users"
                  ? "text-blue-600 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
            >
              Admin
            </NavLink>
          </li> */}
          <li>
            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
              Disabled
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Finance;
