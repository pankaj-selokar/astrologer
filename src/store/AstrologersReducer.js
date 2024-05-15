import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const fetchAstrologers = createAsyncThunk(
    'api/astrologers',
    async (astrologerFetchData, { rejectWithValue }) => {
        try {
            const response = await api.fetchAstrologers(astrologerFetchData); // Adjust this according to your API implementation
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// const initialState = {
//     astrologers: [], // Initial list of astrologers
//     loading: false,
//     error: null
// };

const astrologersReducer = createSlice({
    name: 'astrologers',
    initialState: {
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAstrologers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAstrologers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.astrologers = action.payload;
            })
            .addCase(fetchAstrologers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default astrologersReducer.reducer;
