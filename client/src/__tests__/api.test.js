// Mock axios module first
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

const mockAxios = {
  create: jest.fn(() => mockApiInstance),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
};

jest.mock('axios', () => mockAxios);

// Mock react-hot-toast
const mockToast = {
  success: jest.fn(),
  error: jest.fn()
};
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: mockToast
}));

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
  let apiServices;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    mockAxios.create.mockImplementation(() => mockApiInstance);
    mockApiInstance.get.mockResolvedValue({ data: { success: true } });
    mockApiInstance.post.mockResolvedValue({ data: { success: true } });
    mockApiInstance.put.mockResolvedValue({ data: { success: true } });
    mockApiInstance.delete.mockResolvedValue({ data: { success: true } });
    apiServices = require('../services/api');
  });

  describe('Profile API', () => {
    it('should make GET request to profile endpoint', async () => {
      const mockResponse = { data: { id: 1, name: 'John Doe' } };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await apiServices.profileAPI.getProfile();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/profile');
      expect(result).toEqual(mockResponse);
    });

    it('should make PUT request to update profile', async () => {
      const mockData = { name: 'Jane Doe' };
      const mockResponse = { data: { success: true } };
      mockApiInstance.put.mockResolvedValue(mockResponse);

      const result = await apiServices.profileAPI.updateProfile(mockData);

      expect(mockApiInstance.put).toHaveBeenCalledWith('/profile', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Projects API', () => {
    it('should make GET request to projects endpoint', async () => {
      const mockResponse = { data: [{ id: 1, title: 'Project 1' }] };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await apiServices.projectsAPI.getAllProjects();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/projects', {
        params: {}
      });
      expect(result).toEqual(mockResponse);
    });

    it('should make POST request to create project', async () => {
      const projectData = { title: 'New Project' };
      const mockResponse = { data: { id: 2, ...projectData } };
      mockApiInstance.post.mockResolvedValue(mockResponse);

      const result = await apiServices.projectsAPI.createProject(projectData);

      expect(mockApiInstance.post).toHaveBeenCalledWith(
        '/projects',
        projectData
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Skills API', () => {
    it('should make GET request to skills endpoint', async () => {
      const mockResponse = { data: [{ id: 1, name: 'JavaScript' }] };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await apiServices.skillsAPI.getAllSkills();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/skills', {
        params: {}
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Experience API', () => {
    it('should make GET request to experience endpoint', async () => {
      const mockResponse = { data: [{ id: 1, company: 'Tech Corp' }] };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await apiServices.experienceAPI.getAllExperience();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/experience');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Contact API', () => {
    it('should make POST request to contact endpoint', async () => {
      const formData = {
        name: 'John',
        email: 'john@example.com',
        message: 'Hello'
      };
      const mockResponse = { data: { success: true } };
      mockApiInstance.post.mockResolvedValue(mockResponse);

      const result = await apiServices.contactAPI.submitContactForm(formData);

      expect(mockApiInstance.post).toHaveBeenCalledWith('/contact', formData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Admin API', () => {
    it('should make GET request to dashboard endpoint', async () => {
      const mockResponse = { data: { totalProjects: 10 } };
      mockApiInstance.get.mockResolvedValue(mockResponse);

      const result = await apiServices.adminAPI.getDashboardStats();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/admin/dashboard');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Utility Functions', () => {
    it('should handle API error with default message', () => {
      const error = new Error('Network Error');
      apiServices.handleApiError(error);

      expect(mockToast.error).toHaveBeenCalledWith('An error occurred');
    });

    it('should handle API success with message', () => {
      const message = 'Success message';
      apiServices.handleApiSuccess(message);

      expect(mockToast.success).toHaveBeenCalledWith(message);
    });
  });
});
