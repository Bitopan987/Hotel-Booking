import { createSlice } from '@reduxjs/toolkit';

// const initialState = ;

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    checkedOutDate: '',
    checkedInDate: '',
    travellersCount: '',
    selectedCity: '',
    selectedRate: '',
  },
  reducers: {
    setCheckedInDate: (state, action) => {
      state.checkedInDate = action.payload;
    },
    setCheckedOutDate: (state, action) => {
      state.checkedOutDate = action.payload;
    },
    setTravellersCount: (state, action) => {
      state.travellersCount = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setSelectedRate: (state, action) => {
      state.selectedRate = action.payload;
    },
  },
});

export const {
  setSelectedCity,
  setSelectedRate,
  setCheckedInDate,
  setCheckedOutDate,
  setTravellersCount,
} = bookingSlice.actions;

export default bookingSlice.reducer;
