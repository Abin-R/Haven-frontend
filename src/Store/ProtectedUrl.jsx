import { useSelector } from 'react-redux';
import { Navigate,  useLocation } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const ProtectedUrl = ({ children }) => {
    const user = useSelector(state => state.user.role); // Ensure that you're accessing the correct key
    console.log('User data eeeeeeeeeeeeeeee:', user); 
    const location = useLocation()
    
    return user && user === 'admin' ? ( 
        children
        ):(
            <Navigate to="/login"  state={{from: location.pathname}} replace />
        )
    
}

export default ProtectedUrl;
