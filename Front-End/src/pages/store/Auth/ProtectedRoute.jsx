import { Navigate } from 'react-router-dom';

const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return true;
  
    const { exp } = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
    return exp * 1000 < Date.now(); // Compare expiry with current time
  };
  
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired()) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };

export default ProtectedRoute;
