import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './index.js'; 
import managerReducer from './managerSlice.js'; 
import thunk from 'redux-thunk';


const store = configureStore({
  reducer: {
    auth: authReducer,
    manager: managerReducer,
    // Add more reducers if needed
  },
  middleware: [...getDefaultMiddleware(), thunk],
 
});

export default store;
