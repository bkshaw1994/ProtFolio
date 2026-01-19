import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  profileAPI,
  projectsAPI,
  skillsAPI,
  experienceAPI,
} from "../services/api";

// Initial state
const initialState = {
  profile: null,
  projects: [],
  featuredProjects: [],
  skills: {},
  coreSkills: [],
  experience: [],
  loading: {
    profile: false,
    projects: false,
    skills: false,
    experience: false,
  },
  error: {
    profile: null,
    projects: null,
    skills: null,
    experience: null,
  },
  filters: {
    projects: {
      category: "",
      status: "",
      search: "",
    },
  },
};

// Action types
const actionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_PROFILE: "SET_PROFILE",
  SET_PROJECTS: "SET_PROJECTS",
  SET_FEATURED_PROJECTS: "SET_FEATURED_PROJECTS",
  SET_SKILLS: "SET_SKILLS",
  SET_CORE_SKILLS: "SET_CORE_SKILLS",
  SET_EXPERIENCE: "SET_EXPERIENCE",
  SET_PROJECT_FILTERS: "SET_PROJECT_FILTERS",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.value,
        },
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.type]: action.payload.value,
        },
        loading: {
          ...state.loading,
          [action.payload.type]: false,
        },
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload]: null,
        },
      };

    case actionTypes.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: { ...state.loading, profile: false },
        error: { ...state.error, profile: null },
      };

    case actionTypes.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: { ...state.loading, projects: false },
        error: { ...state.error, projects: null },
      };

    case actionTypes.SET_FEATURED_PROJECTS:
      return {
        ...state,
        featuredProjects: action.payload,
      };

    case actionTypes.SET_SKILLS:
      return {
        ...state,
        skills: action.payload,
        loading: { ...state.loading, skills: false },
        error: { ...state.error, skills: null },
      };

    case actionTypes.SET_CORE_SKILLS:
      return {
        ...state,
        coreSkills: action.payload,
      };

    case actionTypes.SET_EXPERIENCE:
      return {
        ...state,
        experience: action.payload,
        loading: { ...state.loading, experience: false },
        error: { ...state.error, experience: null },
      };

    case actionTypes.SET_PROJECT_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          projects: {
            ...state.filters.projects,
            ...action.payload,
          },
        },
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// App Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const setLoading = (type, value) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: { type, value },
    });
  };

  const setError = (type, value) => {
    dispatch({
      type: actionTypes.SET_ERROR,
      payload: { type, value },
    });
  };

  const clearError = (type) => {
    dispatch({
      type: actionTypes.CLEAR_ERROR,
      payload: type,
    });
  };

  // API calls
  const fetchProfile = async () => {
    try {
      setLoading("profile", true);
      const response = await profileAPI.getProfile();
      dispatch({
        type: actionTypes.SET_PROFILE,
        payload: response.data.data,
      });
    } catch (error) {
      setError(
        "profile",
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  };

  const fetchProjects = async (params = {}) => {
    try {
      setLoading("projects", true);
      const response = await projectsAPI.getAllProjects(params);
      dispatch({
        type: actionTypes.SET_PROJECTS,
        payload: response.data,
      });
    } catch (error) {
      setError(
        "projects",
        error.response?.data?.message || "Failed to fetch projects",
      );
    }
  };

  const fetchFeaturedProjects = async () => {
    try {
      const response = await projectsAPI.getFeaturedProjects();
      dispatch({
        type: actionTypes.SET_FEATURED_PROJECTS,
        payload: response.data.data,
      });
    } catch (error) {
      console.error("Failed to fetch featured projects:", error);
    }
  };

  const fetchSkills = async (params = {}) => {
    try {
      setLoading("skills", true);
      const response = await skillsAPI.getAllSkills(params);
      dispatch({
        type: actionTypes.SET_SKILLS,
        payload: response.data.data,
      });
    } catch (error) {
      setError(
        "skills",
        error.response?.data?.message || "Failed to fetch skills",
      );
    }
  };

  const fetchCoreSkills = async () => {
    try {
      const response = await skillsAPI.getCoreSkills();
      dispatch({
        type: actionTypes.SET_CORE_SKILLS,
        payload: response.data.data,
      });
    } catch (error) {
      console.error("Failed to fetch core skills:", error);
    }
  };

  const fetchExperience = async () => {
    try {
      setLoading("experience", true);
      const response = await experienceAPI.getAllExperience();
      dispatch({
        type: actionTypes.SET_EXPERIENCE,
        payload: response.data.data,
      });
    } catch (error) {
      setError(
        "experience",
        error.response?.data?.message || "Failed to fetch experience",
      );
    }
  };

  const setProjectFilters = (filters) => {
    dispatch({
      type: actionTypes.SET_PROJECT_FILTERS,
      payload: filters,
    });
  };

  // Load initial data
  useEffect(() => {
    fetchProfile();
    fetchFeaturedProjects();
    fetchCoreSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    // State
    ...state,

    // Actions
    fetchProfile,
    fetchProjects,
    fetchFeaturedProjects,
    fetchSkills,
    fetchCoreSkills,
    fetchExperience,
    setProjectFilters,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
