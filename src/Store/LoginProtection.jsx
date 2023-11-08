import { useSelector } from 'react-redux';
import { Navigate,  useLocation } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const LoginProtection = ({ children }) => {
    const user = useSelector(state => state.user.role); // Ensure that you're accessing the correct key
    console.log('User data aaaaaaaaaa:', user); 
    const location = useLocation()
    
    return user ? ( 
        <Navigate to="/"  state={{from: location.pathname}} replace />
        ):(
            children
        )
    
}

export default LoginProtection;
