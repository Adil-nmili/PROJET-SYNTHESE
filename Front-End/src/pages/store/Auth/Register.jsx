import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { STORELOGIN } from "../../../router/Router";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      return regex.test(password);
    };
  
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
  
    const handleRegister = async (e) => {
      e.preventDefault();
      if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      if (!validatePassword(password)) {
        alert('Password must be at least 6 characters long and contain both letters and numbers');
        return;
      }
      
      setLoading(true);
      try {
        const res = await axios.post('/api/register', { name, email, password });
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message || 'Registration failed');
        } else {
          alert('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-yellow-500 flex items-center justify-center">
        <img src="..\..\ex1.png" alt="Lakers Champions" className="w-3/4 rounded-lg" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleRegister} className="w-full max-w-md space-y-4">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <input type="text" placeholder="Name" value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded" />
          <input type="email" placeholder="Email or Phone Number" value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded" />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded" />
          <button className="w-full bg-purple-700 text-white py-2 rounded"disabled={loading} > {loading ? 'Creating Account...' : 'Create Account'}</button>
          <p
              className="text-sm cursor-pointer text-blue-500"
              onClick={() => navigate(STORELOGIN)}  // <-- This is where it goes
            >
              Already have an account? Log in
            </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
