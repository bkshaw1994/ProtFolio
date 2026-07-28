// Mock axios module first
const mockAxios = {
  create: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
};

const mockApiInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  }
};

mockAxios.create.mockReturnValue(mockApiInstance);

jest.mock('axios', () => mockAxios);

// Mock react-hot-toast
const mockToast = {
  success: jest.fn(),
  error: jest.fn()
};
jest.mock('react-hot-toast', () => ({ default: mockToast }));

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  },
  writable: true
});

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApiInstance.get.mockResolvedValue({ data: { success: true } });
    mockApiInstance.post.mockResolvedValue({ data: { success: true } });
    mockApiInstance.put.mockResolvedValue({ data: { success: true } });
    mockApiInstance.delete.mockResolvedValue({ data: { success: true } });
  });

  describe('Profile API', () => {
    it('should make GET request to profile endpoint', async () => {
      // Import here to ensure mocks are set up
      const { profileAPI } = require('../services/api');

      const mockResponse = { data: { id: 1, name: 'John Doe' } };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await profileAPI.getProfile();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/profile');
      expect(result).toEqual(mockResponse.data);
    });

    it('should make PUT request to update profile', async () => {
      const { profileAPI } = require('../services/api');

      const mockData = { name: 'Jane Doe' };
      const mockResponse = { data: { success: true } };
      mockApiInstance.put.mockResolvedValue(mockResponse);

      const result = await profileAPI.updateProfile(mockData);

      expect(mockApiInstance.put).toHaveBeenCalledWith('/profile', mockData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Projects API', () => {
    it('should make GET request to projects endpoint', async () => {
      const { projectsAPI } = require('../services/api');

      const mockResponse = { data: [{ id: 1, title: 'Project 1' }] };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await projectsAPI.getAllProjects();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/projects', {
        params: {}
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should make POST request to create project', async () => {
      const { projectsAPI } = require('../services/api');

      const projectData = { title: 'New Project' };
      const mockResponse = { data: { id: 2, ...projectData } };
      mockApiInstance.post.mockResolvedValue(mockResponse);

      const result = await projectsAPI.createProject(projectData);

      expect(mockApiInstance.post).toHaveBeenCalledWith(
        '/projects',
        projectData
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Skills API', () => {
    it('should make GET request to skills endpoint', async () => {
      const { skillsAPI } = require('../services/api');

      const mockResponse = { data: [{ id: 1, name: 'JavaScript' }] };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await skillsAPI.getAllSkills();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/skills', {
        params: {}
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Experience API', () => {
    it('should make GET request to experience endpoint', async () => {
      const { experienceAPI } = require('../services/api');

      const mockResponse = { data: [{ id: 1, company: 'Tech Corp' }] };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await experienceAPI.getAllExperience();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/experience');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Contact API', () => {
    it('should make POST request to contact endpoint', async () => {
      const { contactAPI } = require('../services/api');

      const formData = {
        name: 'John',
        email: 'john@example.com',
        message: 'Hello'
      };
      const mockResponse = { data: { success: true } };
      mockApiInstance.post.mockResolvedValue(mockResponse);

      const result = await contactAPI.submitContactForm(formData);

      expect(mockApiInstance.post).toHaveBeenCalledWith('/contact', formData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Admin API', () => {
    it('should make GET request to dashboard endpoint', async () => {
      const { adminAPI } = require('../services/api');

      const mockResponse = { data: { totalProjects: 10 } };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await adminAPI.getDashboardStats();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/admin/dashboard');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Utility Functions', () => {
    it('should handle API error with default message', () => {
      const { handleApiError } = require('../services/api');

      const error = new Error('Network Error');
      handleApiError(error);

      expect(mockToast.error).toHaveBeenCalledWith(
        'An error occurred. Please try again.'
      );
    });

    it('should handle API success with message', () => {
      const { handleApiSuccess } = require('../services/api');

      const message = 'Success message';
      handleApiSuccess(message);

      expect(mockToast.success).toHaveBeenCalledWith(message);
    });
  });
});
