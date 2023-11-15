/* eslint-disable react/no-unescaped-entities */
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import { Modal, Box, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";


const PaypalButton = ({ subscriptionType, price }) => {
  const { username } = useSelector((state) => state.user);
  const [, setPaidFor] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const history  = useNavigate()

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: subscriptionType,
          amount: {
            value: price,
            currency_code: "USD", // Replace 'USD' with your required currency code
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      return axios.post(
        "http://127.0.0.1:8000/subscription/save-subscription/",
        {
          username: username, // Replace with the actual username
          subscriptionType: subscriptionType,
          amount: price,
          transactionId: details.id,
        }
      );
    });
  };

  const handleApprove = (data, actions) => {
    onApprove(data, actions)
      .then((response) => {
        if (response.status === 200) {
          setPaidFor(true);
          console.log('Subscription data:', response.data);

        // Assuming user_role is a direct property of the response
        const userRole = response.data.user_role; 

        // Dispatch the user role to your Redux store
        dispatch({
          type: "SET_USER_DATA",
          payload: {
            username: response.data.username,
            userId: response.data.id,
            role: userRole , // Check admin status or adjust according to your data
            isAuthenticated: true,
            // Add other relevant user data here
          },
        });
        setOpenModal(true); // Open the modal on successful payment
    
        } else {
          console.error("Failed to save the subscription");
        }
      })
      .catch((error) => {
        console.error("Error capturing order:", error);
      });
  };
  const handleOKButtonClick = () => {
    setOpenModal(false); // Close the modal
    history('/'); // Navigate to the home page
  };

//   const handleOpen = () => {
//     setOpenModal(true);
//   };

  const handleClose = () => {
    setOpenModal(false);
    history("/")
  };

  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AdYKb9OHf8FssJZTMmw-SgeSgXhN_gMckAhfL_GG6Q9fMD-W-N5tUrMkF-fLt05Op00NQgtA2e71lS0B",
        }} // Replace with your client ID
      >
        <PayPalButtons
          style={{
            color: "silver",
            // layout: "horizontal"
          }}
          createOrder={createOrder}
          onApprove={handleApprove}
        />
      </PayPalScriptProvider>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 280,
            borderRadius: "25px",
            bgcolor: "black",
            border: "2",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: "4rem",
              color: "green",
              marginLeft: "180px",
              marginBottom: "10px",
              marginTop: "5px",
            }}
          />
          <Typography
            className="text-white px-7 font-mono"
            id="modal-modal-description"
            sx={{
              fontSize: "1.2rem", // Set the description font size
              color: "white",
              fontFamily: "cursive", // Text color
              textAlign: "center", // Center the text
              margin: "20px 0", // Add margin for better spacing
            }}
          >
            Congratulations, {username} your subscription is now{" "}
            <span style={{ color: "#87CEFA" }}>active</span> and ready to unlock a
            world of exclusive benefits!
          </Typography>
          <button
            // variant="contained"
            color="primary"
            onClick={handleOKButtonClick}
            // sx={{ marginTop: 2 }}
          >
            OK
          </button>
        </Box>
      </Modal>
    </div>
  );
};

PaypalButton.propTypes = {
  subscriptionType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  // Add other expected properties and their PropTypes
};

export default PaypalButton;
