// Import the configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import your reducers from their respective slice files
import authReducer from './authSlice';
import taskReducer from './taskSlice';

// Create the Redux store using configureStore
export const store = configureStore({
  reducer: {
    auth: authReducer,   // Reducer for authentication state
    task: taskReducer,   // Reducer for task management state
  },
});
