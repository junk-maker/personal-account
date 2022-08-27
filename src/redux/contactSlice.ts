import {AnyAction, createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

export type Contact =  {
    id: number;
    name: string;
    phone: string;
    email: string;
    website: string;
};

type ContactsState = {
    loading: boolean;
    contacts: Contact[];
    error: null | string;
};

const initialState: ContactsState = {
    error: null,
    contacts: [],
    loading: false,
};
  
export const fetchContacts = createAsyncThunk<Contact[], undefined, {rejectValue: string}>(
    'contacts/fetchContacts',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('http://localhost:5000/api/contact/contact');
            const data = await response.json();
    
            return data.contactdb.contact;
        } catch (error: unknown) {
            let result = (error as Error).message;
            return rejectWithValue(result);
        }
    }
);

export const addContact = createAsyncThunk<Contact[], object, {rejectValue: string}>(
    'contacts/addContact',
    async function (data, {rejectWithValue}) {
        try {
            const response = await fetch('http://localhost:5000/api/contact/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const d = await response.json();
    
            return d.data.contact;
        } catch (error: unknown) {
            let result = (error as Error).message;
            return rejectWithValue(result);
        }
    }
);

export const editContact = createAsyncThunk<Contact[], object, {rejectValue: string}>(
    'contacts/editContact',
    async function (data, {rejectWithValue}) {
        try {
            const response = await fetch('http://localhost:5000/api/contact/contact', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const d = await response.json();
    
            return d.data.contact;
        } catch (error: unknown) {
            let result = (error as Error).message;
            return rejectWithValue(result);
        }
    }
);

export const deleteContact = createAsyncThunk<Contact[], number, {rejectValue: string}>(
    'contacts/deleteContact',
    async function (id, {rejectWithValue}) {
        try {
            const response = await fetch(`http://localhost:5000/api/contact/contact/${id}`, {method: 'DELETE',});
            const d = await response.json();
    
            return d.data.contact;
        } catch (error: unknown) {
            let result = (error as Error).message;
            return rejectWithValue(result);
        }
    }
);

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchContacts.pending, (state) => {
            state.error = null;
            state.loading = true;
          })
          .addCase(fetchContacts.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
          })
          .addCase(addContact.pending, (state) => {
            state.error = null;
            state.loading = true;
          })
          .addCase(addContact.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
          })
          .addCase(editContact.pending, (state) => {
            state.error = null;
            state.loading = true;
          })
          .addCase(editContact.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
          })
          .addCase(deleteContact.pending, (state, action) => {
            state.error = null;
            state.loading = true;
          })
          .addCase(deleteContact.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
          })
          .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
          });
      }
});

export default contactSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
};