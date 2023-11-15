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

function App() {

    const userLoggedIn = useSelector((state) => state.user.role)
    return (
        <>
        {/* <UserListRoutes/> */}
        <Router>
            <Routes>
                {/* USERSIDE */}
                <Route path="/" element={<Home />} />
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
