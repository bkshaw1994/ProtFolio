import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: {},
  core: [],
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills: (state, action) => {
      state.all = action.payload;
    },
    setCoreSkills: (state, action) => {
      state.core = action.payload;
    },
  },
});

export const { setSkills, setCoreSkills } = skillsSlice.actions;
export default skillsSlice.reducer;
