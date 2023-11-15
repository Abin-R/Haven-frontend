import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllUsers from '../pages/Admin/UsersList/AllUsers';

// import { useSelector } from 'react-redux';


function UserListRoutes() {

    // const userLoggedIn = useSelector((state) => state.user.role)
    return (
        <Router>
            <Routes>
                {/* USERSIDE */}
                <Route path="/all-users" element={<AllUsers />} />
               
            </Routes>
        </Router>
    );
}

export default UserListRoutes;
