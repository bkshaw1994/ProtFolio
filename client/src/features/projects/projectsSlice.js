import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  featured: []
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.list = action.payload;
    },
    setFeaturedProjects: (state, action) => {
      state.featured = action.payload;
    }
  }
});

export const { setProjects, setFeaturedProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
