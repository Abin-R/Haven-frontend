import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const PrivateChatRoute = ({ children }) => {
  const userRole = useSelector((state) => state.user.role);
  console.log("userRole", userRole);

  // Assuming you have a "role" property in your user state
  // You may need to adjust this based on your actual user state structure

  // Check if the user has the required role to access the chat
  const isPremiumUser = userRole === "premium"|| "admin";
  console.log("isPremiumUser", isPremiumUser);

  if (!isPremiumUser) {
    // If the user is not premium, navigate to the unauthorized route
    return <Navigate to="/unauthorized" />;
  }

  // If the user is premium, render the children components
  return children;
};

export default PrivateChatRoute;
