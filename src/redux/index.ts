import loginReducer from './loginSlice';
import contactReducer from './contactSlice';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    login: loginReducer,
    contacts: contactReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;