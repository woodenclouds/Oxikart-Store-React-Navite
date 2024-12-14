import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDeliveryBoys } from '../../services/orderService';

// Async Thunk to fetch delivery boys
export const fetchDeliveryBoysAsync = createAsyncThunk(
  'deliveryBoys/fetchDeliveryBoys',
  async () => {
    const response = await fetchDeliveryBoys(); // Replace with your API logic
    return response.data;
  }
);

const deliveryBoysSlice = createSlice({
  name: 'deliveryBoys',
  initialState: {
    deliveryBoys: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryBoysAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeliveryBoysAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveryBoys = action.payload;
      })
      .addCase(fetchDeliveryBoysAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addDeliveryBoy } = deliveryBoysSlice.actions;

export default deliveryBoysSlice.reducer;
