import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AppProvider } from "../context/AppContext";
import { experienceReducer } from "../features/experience/experienceSlice";
import { profileReducer } from "../features/profile/profileSlice";
import { projectsReducer } from "../features/projects/projectsSlice";
import { skillsReducer } from "../features/skills/skillsSlice";

// Create a custom renderer for testing components that need the Redux store and AppContext
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Create a store with the necessary reducers
    store = configureStore({
      reducer: {
        experience: experienceReducer,
        profile: profileReducer,
        projects: projectsReducer,
        skills: skillsReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  // Wrap component in both Redux Provider and AppContext Provider
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <AppProvider>{children}</AppProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
