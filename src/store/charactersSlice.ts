import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  }
);
const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters:<any> [],
    loading: false,
    error:<any> null,
    nextPage: 'https://swapi.dev/api/people',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.characters = [...state.characters, ...action.payload.results];
      state.nextPage = action.payload.next;
      state.loading = false;
    });
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default charactersSlice.reducer;
