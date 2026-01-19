import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers, { endpoint }) => {
      // Don't set Content-Type for file uploads, let the browser set it
      if (!['uploadProfileImage', 'uploadResume'].includes(endpoint)) {
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    }
  }),
  tagTypes: ['Profile', 'Project', 'Skill', 'Experience', 'Contact', 'Visitor'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/profile',
      providesTags: ['Profile']
    }),
    getProfileSummary: builder.query({
      query: () => '/profile/summary',
      providesTags: ['Profile']
    }),
    getProjects: builder.query({
      query: (params) => ({ url: '/projects', params }),
      providesTags: ['Project']
    }),
    getFeaturedProjects: builder.query({
      query: () => '/projects/featured',
      providesTags: ['Project']
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: ['Project']
    }),
    getSkills: builder.query({
      query: () => '/skills',
      providesTags: ['Skill']
    }),
    getCoreSkills: builder.query({
      query: () => '/skills/core',
      providesTags: ['Skill']
    }),
    getExperience: builder.query({
      query: () => '/experience',
      providesTags: ['Experience']
    }),
    getCurrentExperience: builder.query({
      query: () => '/experience/current',
      providesTags: ['Experience']
    }),
    submitContact: builder.mutation({
      query: (data) => ({
        url: '/contact',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Contact']
    }),
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: '/profile/upload/image',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['Profile']
    }),
    uploadResume: builder.mutation({
      query: (formData) => ({
        url: '/profile/upload/resume',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['Profile']
    }),
    deleteFile: builder.mutation({
      query: (type) => ({
        url: `/profile/file/${type}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Profile']
    }),
    // GitHub API endpoints
    getGitHubRepos: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: '/github/repos',
        params: { page, limit }
      }),
      providesTags: ['GitHubRepos']
    }),
    getFeaturedGitHubRepos: builder.query({
      query: () => '/github/repos/featured',
      providesTags: ['GitHubRepos']
    }),
    getGitHubRepo: builder.query({
      query: (repoName) => `/github/repos/${repoName}`,
      providesTags: (result, error, repoName) => [
        { type: 'GitHubRepos', id: repoName }
      ]
    }),
    getGitHubStats: builder.query({
      query: () => '/github/stats',
      providesTags: ['GitHubStats']
    }),
    // Visitor endpoints
    getVisitorCount: builder.query({
      query: () => '/visitor',
      providesTags: ['Visitor']
    }),
    incrementVisitorCount: builder.mutation({
      query: (data) => ({
        url: '/visitor',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Visitor']
    })
  })
});

export const {
  useGetProfileQuery,
  useGetProfileSummaryQuery,
  useGetProjectsQuery,
  useGetFeaturedProjectsQuery,
  useGetProjectByIdQuery,
  useGetSkillsQuery,
  useGetCoreSkillsQuery,
  useGetExperienceQuery,
  useGetCurrentExperienceQuery,
  useSubmitContactMutation,
  useUploadProfileImageMutation,
  useUploadResumeMutation,
  useDeleteFileMutation,
  useGetGitHubReposQuery,
  useGetFeaturedGitHubReposQuery,
  useGetGitHubRepoQuery,
  useGetGitHubStatsQuery,
  useGetVisitorCountQuery,
  useIncrementVisitorCountMutation
} = apiSlice;
