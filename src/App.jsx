import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/register';
import LoginProtection from './Store/LoginProtection';
import Dashboard from './pages/Admin/Dashboard';
// import Users from './pages/Admin/Users';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import ProtectedUrl from './Store/ProtectedUrl';
import Subscription from './pages/Subscription';
import { useSelector } from 'react-redux';
// import UserListRoutes from './Routes/UserListRoutes';
import AllUsers from './pages/Admin/UsersList/AllUsers';
import NormalUsers from './pages/Admin/UsersList/Users';
import Premium from './pages/Admin/UsersList/premium';
import Super from './pages/Admin/UsersList/Super';
import Admin from './pages/Admin/UsersList/Admin';
import SubscriptionList from './pages/Admin/Finance/SubscriptionList';
import EventBooking from './pages/Admin/Finance/EventBooking';
import Profile from './pages/Profile';
import Event from './pages/SumitEvent/Event';
import SingleEvent from './pages/SumitEvent/SingleEvent';
import YourEvents from './pages/SumitEvent/CreateEvents';
import YourEvent from './pages/SumitEvent/YourEvents';
import Attendees from './pages/SumitEvent/Attendees';
import Posts from './pages/Posts/Posts';
import PostDetail from './pages/Posts/PostDetail';
import CreatePosts from './pages/Posts/CreatePosts';
// import BookingPayment from './pages/SumitEvent/BookingPayment';


function App() {

    const userLoggedIn = useSelector((state) => state.user.role)
    return (
        <>
        {/* <UserListRoutes/> */}
        <Router>
            <Routes>
                {/* USERSIDE */}
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/events" element={<Event />} />
                <Route path="/create-events" element={<YourEvents />} />
                <Route path="/Your-events" element={<YourEvent />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/create-posts/:eventId" element={<CreatePosts />} />
                {/* <Route path="/posts-1" element={<PostDetail />} /> */}
                <Route path="/post/:postId" element={<PostDetail/>} />
                <Route path="/attendees-event/:eventId" element={<Attendees/>} />
                <Route path="/event/:eventId" element={<SingleEvent/>} />

                <Route path="/dashboard" element={<ProtectedUrl><Dashboard /></ProtectedUrl>} />
                <Route
                    path="/subscription"
                    element={userLoggedIn ? <Subscription /> : <Navigate to="/login" replace />}
                />
                <Route path="/forgot-password" element={<LoginProtection> <ForgotPassword /></LoginProtection>} />
                <Route path="/reset-password" element={<LoginProtection><ResetPassword /></LoginProtection>} />
                <Route path="/register"  element={<LoginProtection ><Register /></LoginProtection>}/>
                <Route path="/login"  element={<LoginProtection ><Login/></LoginProtection>}/>

                {/* ADMINSIDE */}
                <Route path="/user-list" element={<ProtectedUrl><AllUsers /></ProtectedUrl>} />
                <Route path="/all-users" element={<ProtectedUrl><AllUsers /></ProtectedUrl>} />
                <Route path="/normal-users" element={<ProtectedUrl><NormalUsers /></ProtectedUrl>} />
                <Route path="/premium-users" element={<ProtectedUrl><Premium /></ProtectedUrl>} />
                <Route path="/super-users" element={<ProtectedUrl><Super /></ProtectedUrl>} />
                <Route path="/admin-users" element={<ProtectedUrl><Admin /></ProtectedUrl>} />
                <Route path="/subscription-list" element={<ProtectedUrl><SubscriptionList  /></ProtectedUrl>} />
                <Route path="/event-booking-list" element={<ProtectedUrl><EventBooking  /></ProtectedUrl>} />
            </Routes>
        </Router>
        </>
    );
}

export default App;
