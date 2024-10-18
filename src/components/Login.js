import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      dispatch(loginSuccess(response.data.token));
      localStorage.setItem('token', response.data.token);
      // console.log(response);
      navigate('/users');
    } catch (err) {
      setError('Login failed, please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 text-white p-2 w-full rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
