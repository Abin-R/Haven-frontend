import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/register';
import LoginProtection from './Store/LoginProtection';
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import ProtectedUrl from './Store/ProtectedUrl';


function App() {
    return (
        <Router>
            <Routes>
                {/* USERSIDE */}
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forgot-password" element={<LoginProtection> <ForgotPassword /></LoginProtection>} />
                <Route path="/reset-password" element={<LoginProtection><ResetPassword /></LoginProtection>} />
                <Route path="/register"  element={<LoginProtection ><Register /></LoginProtection>}/>
                <Route path="/login"  element={<LoginProtection ><Login/></LoginProtection>}/>

                {/* ADMINSIDE */}
                <Route path="/user-list" element={<ProtectedUrl><Users /></ProtectedUrl>} />
            </Routes>
        </Router>
    );
}

export default App;
