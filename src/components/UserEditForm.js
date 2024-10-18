import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUsers, setError, setSuccess } from '../redux/slices/userSlice';

const UserEditForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${user.id}`, formData);
      dispatch(setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? response.data : u))
      )); 
      dispatch(setSuccess('User updated successfully!'));
      onClose(); 
    } catch (err) {
      dispatch(setError('Failed to update user.'));
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-xl mb-4">Edit User</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-2">
          <label className="block mb-1">First Name:</label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Last Name:</label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        <button onClick={onClose} className="ml-2 px-4 py-2 bg-gray-300 text-black rounded">Cancel</button>
      </form>
    </div>
  );
};

export default UserEditForm;
