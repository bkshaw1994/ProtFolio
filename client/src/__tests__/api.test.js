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
  create: jest.fn().mockReturnValue(mockApiInstance),
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
  default: mockToast,
  success: mockToast.success,
  error: mockToast.error
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

const {
  projectsAPI,
  skillsAPI,
  experienceAPI,
  contactAPI,
  adminAPI,
  handleApiError,
  handleApiSuccess
} = require('../services/api');

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Projects API', () => {
    it('should make GET request to projects endpoint', () => {
      mockApiInstance.get.mockResolvedValue({ data: [] });
      projectsAPI.getAllProjects({ category: 'Web' });

      expect(mockApiInstance.get).toHaveBeenCalledWith('/projects', {
        params: { category: 'Web' }
      });
    });

    it('should make POST request to create project', () => {
      const projectData = { title: 'New Project' };
      mockApiInstance.post.mockResolvedValue({ data: projectData });
      projectsAPI.createProject(projectData);

      expect(mockApiInstance.post).toHaveBeenCalledWith('/projects', projectData);
    });
  });

  describe('Skills API', () => {
    it('should make GET request to skills endpoint', () => {
      mockApiInstance.get.mockResolvedValue({ data: [] });
      skillsAPI.getAllSkills();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/skills', { params: {} });
    });
  });

  describe('Experience API', () => {
    it('should make GET request to experience endpoint', () => {
      mockApiInstance.get.mockResolvedValue({ data: [] });
      experienceAPI.getAllExperience();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/experience');
    });
  });

  describe('Contact API', () => {
    it('should make POST request to contact endpoint', () => {
      const contactData = { name: 'User', email: 'test@example.com' };
      mockApiInstance.post.mockResolvedValue({ data: contactData });
      contactAPI.submitContactForm(contactData);

      expect(mockApiInstance.post).toHaveBeenCalledWith('/contact', contactData);
    });
  });

  describe('Admin API', () => {
    it('should make GET request to dashboard endpoint', () => {
      mockApiInstance.get.mockResolvedValue({ data: {} });
      adminAPI.getDashboardStats();

      expect(mockApiInstance.get).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  describe('Utility Functions', () => {
    it('should handle API error with default message', () => {
      const error = { response: { data: {} } };
      const message = handleApiError(error);

      expect(mockToast.error).toHaveBeenCalledWith('An error occurred');
      expect(message).toBe('An error occurred');
    });

    it('should handle API success with message', () => {
      const data = { id: 1 };
      const result = handleApiSuccess('Success!', data);

      expect(mockToast.success).toHaveBeenCalledWith('Success!');
      expect(result).toEqual(data);
    });
  });
});
