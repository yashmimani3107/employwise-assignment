import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, setError, deleteUser, setSuccess } from '../redux/slices/userSlice';
import UserEditForm from './UserEditForm'; 

const UsersList = () => {
  const [page, setPage] = useState(1);
  const { users, error } = useSelector((state) => state.user);
  const [editingUser, setEditingUser] = useState(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        dispatch(setUsers(response.data.data)); 
      } catch (err) {
        dispatch(setError('Failed to fetch users.'));
      } 
    };

    fetchUsers(); 
  }, [dispatch, page]);

  const deleteUserHandler = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      dispatch(deleteUser(userId)); 
      dispatch(setSuccess('User deleted successfully!'));
    } catch (err) {
      dispatch(setError('Failed to delete user.'));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCloseEdit = () => {
    setEditingUser(null); 
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Users List</h2>
      
      {editingUser ? (
        <UserEditForm user={editingUser} onClose={handleCloseEdit} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="border p-4 rounded-lg shadow-md">
                <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mb-4" />
                <h3 className="text-xl">{`${user.first_name} ${user.last_name}`}</h3>
                <p>{user.email}</p>
                <div className= "flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(user)} 
                    className="mr-2 text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUserHandler(user.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-gray-200 text-black rounded-lg mr-2"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;
