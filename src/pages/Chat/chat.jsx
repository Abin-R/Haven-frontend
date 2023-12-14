import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NavbarAdmin from "../../components/Navbar";
import axios from "axios";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { username, image } = useSelector((state) => state.user);
  const socket = new WebSocket('wss://haven.abinr.xyz/ws/chat/general/');
  const [users, setUsers] = useState([]);
  const [currentTime , setCurrentTime] = useState(false)
  const [isSending, setIsSending] = useState(false); 
  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://haven.abinr.xyz/admins/users/");
        if (response.status === 200) {
          setUsers(response.data.userlist);
          setCurrentTime((prevValue) => !prevValue)
          console.log(response.data.userlist);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, [forceUpdateKey]);

  const getRandomColor = (name) => {
    const colors = ["#85bdde", "#53e3d4", "#a09480", "#198ba3", "#82a8cd"];
    const index =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;
    return colors[index];
  };

  const sendMessage = async () => {
    const user = username;
    setIsSending(true);

    try {
      // Make a POST request to save the message in the backend
      const response = await fetch("https://haven.abinr.xyz/chat/save-message/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, message }),
      });
      setCurrentTime((prevValue) => !prevValue)

      if (!response.ok) {
        setCurrentTime((prevValue) => !prevValue)
        console.error("Failed to save message in the backend");
      }
    } catch (error) {
      console.error("Error while saving message:", error);
    }

    // Send the message to the WebSocket
    socket.send(JSON.stringify({ message, user }));
    setMessage(""); // Clear the input field after sending the message
    setIsSending(false);
    setCurrentTime((prevValue) => !prevValue)
    setForceUpdateKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("https://haven.abinr.xyz/chat/get-messages/");
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
          setCurrentTime((prevValue) => !prevValue);
        } else {
          console.error("Failed to fetch messages from the backend");
        }
      } catch (error) {
        console.error("Error while fetching messages:", error);
      }
    };

    fetchMessages();

    const socket = new WebSocket('wss://haven.abinr.xyz/ws/chat/general/');
    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setCurrentTime((prevValue) => !prevValue);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [forceUpdateKey]);
 // Empty dependency array means this effect runs once when the component mounts
  

  

  return (
    <div>
      <NavbarAdmin />
      <div className="flex h-screen mt-20 antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <img
                  src={`https://haven.abinr.xyz${image}`}
                  alt="Avatar"
                  className="h-full w-full"
                />
              </div>
              <div className="text-sm font-semibold mt-2">{username}</div>
              <div className="text-xs text-gray-500">Lead UI/UX Deddsigner</div>
              <div className="flex flex-row items-center mt-3">
                <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                  <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                </div>
                <div className="leading-none ml-1 text-xs">Active</div>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  1
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-hidden ">
                {users.map(
                  (user) =>
                    user.is_premium &&
                    user.username !== username && (
                      <button
                        key={user.id} // Make sure to use a unique key
                        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                      >
                        <div
                          className="flex items-center justify-center h-8 w-8  rounded-full"
                          style={{
                            backgroundColor: getRandomColor(user.username),
                          }}
                        >
                          {user.username.charAt(0)}
                        </div>
                        <div className="ml-2 text-sm font-semibold">
                          {user.username}
                        </div>
                      </button>
                    )
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {messages.map((msg, index) => {
                      const senderUser = users.find(
                        (user) => user.username === msg.sender
                      );

                      return (
                        <div
                          key={index}
                          className="col-start-1 col-end-13 p-3 rounded-lg"
                        >
                          {msg.sender === username ? (
                            <div className="flex items-center justify-start flex-row-reverse">
                              <div className="flex flex-col">
                                <div className="flex items-center font-bold text-xs justify-center  flex-shrink-0">
                                  <img
                                    src={`https://haven.abinr.xyz${image}`} // Update this line
                                    alt="User Profile"
                                    className="h-12 w-12 rounded-full flex-shrink-0"
                                  />
                                </div>
                                <div className="font-semibold text-xs justify-center px-5 flex">
                                  {msg.sender}
                                </div>
                              </div>
                              <div className="relative ml-4 text-sm bg-white py-3 px-3 shadow rounded-xl">
                                <div>{msg.message_content}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end  flex-row-reverse">
                              <div className="relative mr-2 text-sm bg-white py-3 px-3 shadow rounded-xl">
                                <div>{msg.message_content}</div>
                              </div>
                              <div>
                                <div className="flex flex-col items-center font-bold text-xs flex-shrink-0">
                                  <img
                                    src={`https://haven.abinr.xyz${senderUser.image}`} // Update this line
                                    alt="User Profile"
                                    className="h-12 w-12 rounded-full flex-shrink-0"
                                  />
                                </div>
                                <div className="font-semibold text-xs justify-center px-5 flex">
                                  {msg.sender}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={sendMessage}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message_content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button> */}
    </div>
  );
};

export default ChatComponent;
