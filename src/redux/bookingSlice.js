import { createSlice } from '@reduxjs/toolkit';

const tomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  return date;
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    checkedInDate: new Date(),
    checkedOutDate: tomorrow(),
    guestsCount: 1,
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
    setGuestsCount: (state, action) => {
      state.guestsCount = action.payload;
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
  setGuestsCount,
} = bookingSlice.actions;

export default bookingSlice.reducer;
