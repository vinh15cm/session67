
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface BookState {
  loading: boolean;
  books: any[];
  error: null | string;
}

const initialState: BookState = {
  loading: false,
  books: [],
  error: null,
};

export const addBook = createAsyncThunk(
  'books/addBook',
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/book', formData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookSlice.reducer;
