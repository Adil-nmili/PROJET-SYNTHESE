import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { STORESIGNUP } from "../../../router/Router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        alert("Both email and password are required.");
        return;
      }
  
      setIsLoading(true);
      try {
        const res = await axios.post('/api/login', { email, password });
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } catch (err) {
        const message = err.response?.data?.message || 'Login failed. Please try again.';
        alert(message);
      } finally {
        setIsLoading(false);
      }
    
    }
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-purple-900 flex items-center justify-center">
        <img src="..\..\lakers.jpg" alt="Lakers Logo" className="w-3/4 rounded-lg" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
          <h1 className="text-3xl font-bold">Log in to Exclusive</h1>
          <input type="email" placeholder="Email or Phone Number" value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded" aria-label="Email Address"  />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded" aria-label="Password" />
          <button className="w-full bg-purple-700 text-white py-2 rounded" disabled={isLoading}>{isLoading ? 'Logging In...' : 'Log In'}</button>
          <p className="text-sm cursor-pointer text-blue-500"
            onClick={() => navigate(STORESIGNUP)}  >Forgot Password?</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
