import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
// import axiosInstance from "../Store/Axios";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../../Store/Redux/Action/UserAction";
import {  useLocation } from 'react-router-dom';

const navigation = [
  { name: "Dashboard", to: "/dashboard", current: false },
  { name: "Users", to: "/user-list", current: false },
  { name: "Events", to: "/event-list", current: false },
  { name: "Posts", to: "/post-list", current: false },
  { name: "Finance", to: "/subscription-list", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarAdmin() {
  const navigate = useNavigate();

  const { isAuthenticated, username, role } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const currentLocation = useLocation();


  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      console.log("Token being sent in the request:", refreshToken);

      const response = await axios.post(
        "https://haven.abinr.xyz/api/logout/",
        { refresh_token: localStorage.getItem("refresh_token") },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("response eeeeeeeeeeee", response.status);

      if (response.status === 200) {
        dispatch(clearUserData());
        // axios.defaults.headers.common["Authorization"] = null;
        navigate("/login");
        console.log("success");
      } else {
        console.log("Logout request was not successful");
      }
    } catch (e) {
      console.log("logout not working", e);
    }
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white  fixed top-0  w-full z-50 backdrop-filter backdrop-blur-lg"
      style={{
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          backgroundColor:"#fafafa"
      }}

    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2  sm:px-6 h-18 lg:px-8 my-2">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="\">
                    <img
                      className="h-8 w-auto"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Haven_Holiday_Wordmark.svg/1280px-Haven_Holiday_Wordmark.svg.png"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                {/* <div className="hidden sm:ml-6 sm:block"> */}
                <div className="flex items-center justify-center hidden lg:flex lg:gap-x-12 flex-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={`block rounded-md px-1 py-2 text-base relative group ${
                        currentLocation.pathname === item.to
                          ? " text-blue-600 text-lg font-bold"
                          : "text-gray-800 text-lg font-bold"
                      }`}
                      aria-current={
                        currentLocation.pathname === item.to
                          ? "page"
                          : undefined
                      }
                    >
                      {item.name}
                      <span className="absolute bottom-0.5 left-1/2 w-0 h-1 bg-slate-500 group-hover:w-1/2 group-hover:transition-all"></span>
                      <span className="absolute bottom-0.5 right-1/2 w-0 h-1 bg-slate-500 group-hover:w-1/2 group-hover:transition-all"></span>
                    </Link>
                  ))}
                </div>
              </div>
              {/* </div> */}

              {isAuthenticated ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
                  <span
                    className="hidden sm:block"
                    style={{
                      fontFamily: "cursive",
                      fontSize: "24px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {username}
                  </span>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        {role === "admin" ? ( // Show 'Dashboard' for admin, 'Settings' for regular user
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/dashboard"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              // Replace with your logout route
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
