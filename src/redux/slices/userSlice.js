import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    token: null,
    error: null,
    success: null, 
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const { loginSuccess, setUsers, updateUser, deleteUser, setLoading, setError, setSuccess } = userSlice.actions;
export default userSlice.reducer;
