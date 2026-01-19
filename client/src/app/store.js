import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import profileReducer from '../features/profile/profileSlice';
import projectsReducer from '../features/projects/projectsSlice';
import skillsReducer from '../features/skills/skillsSlice';
import experienceReducer from '../features/experience/experienceSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    profile: profileReducer,
    projects: projectsReducer,
    skills: skillsReducer,
    experience: experienceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
