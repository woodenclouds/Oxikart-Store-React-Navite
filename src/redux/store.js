import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import deliveryBoysReducer from './slices/deliveryBoysSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    deliveryBoys: deliveryBoysReducer,
  },
})

