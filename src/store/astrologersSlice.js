import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/astrologers');
  return response.data;
});


const initialState = {
  users: [],
  user:{},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    updateUser(state, action) {
      const { id, updatedUser } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedUser };
      }
    },
    deleteUser(state, action) {
      const { id } = action.payload;
      state.users = state.users.filter(user => user.id !== id);
    },
    getUser(state, action) {
      state.users = action.payload;
    },
    getUserDetails(state, action) {
      state.user = action.payload;
    },
       
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;     
    });

    
  },
});
export const { addUser, updateUser, deleteUser ,getUser,getUserDetails } = usersSlice.actions;
export default usersSlice.reducer;