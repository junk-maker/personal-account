import {AnyAction, createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

interface DataProps {
    email: string;
    password: string;
    navigate: Function;
};

type LoginState = {
    loading: boolean,
    error: null | string,
};

const initialState: LoginState = {
    error: null,
    loading: false,
};

export const fetchLogin = createAsyncThunk<string, DataProps, {rejectValue: string}>(
    'login/fetchLogin',
    async function(data: DataProps, {rejectWithValue}) {
       const {email, password, navigate} = data
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const d = await response.json();
        if (response.status === 401) {
            return rejectWithValue(d.message);
        } else {
            navigate('/contact');
            return d.access_token;
        };
       
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchLogin.pending, (state) => {
            state.error = null;
            state.loading = true;
          })
          .addCase(fetchLogin.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem('access', action.payload);
          })
          .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
          });
      }
});

export default loginSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
};