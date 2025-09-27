import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setExperience: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setExperience } = experienceSlice.actions;
export default experienceSlice.reducer;
