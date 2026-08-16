const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();

const mockApiInstance = {
  get: mockGet,
  post: mockPost,
  put: mockPut,
  delete: mockDelete,
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  }
};

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: () => mockApiInstance
  }
}));

const mockToast = {
  success: jest.fn(),
  error: jest.fn()
};

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: mockToast
}));

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  },
  writable: true
});

const {
  profileAPI,
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
    mockGet.mockResolvedValue({ data: { success: true } });
    mockPost.mockResolvedValue({ data: { success: true } });
    mockPut.mockResolvedValue({ data: { success: true } });
    mockDelete.mockResolvedValue({ data: { success: true } });
  });

  describe('Profile API', () => {
    it('should make GET request to profile endpoint', async () => {
      const mockResponse = { data: { id: 1, name: 'John Doe' } };
      mockGet.mockResolvedValue(mockResponse);

      const result = await profileAPI.getProfile();

      expect(mockGet).toHaveBeenCalledWith('/profile');
      expect(result).toEqual(mockResponse);
    });

    it('should make PUT request to update profile', async () => {
      const mockData = { name: 'Jane Doe' };
      const mockResponse = { data: { success: true } };
      mockPut.mockResolvedValue(mockResponse);

      const result = await profileAPI.updateProfile(mockData);

      expect(mockPut).toHaveBeenCalledWith('/profile', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Projects API', () => {
    it('should make GET request to projects endpoint', async () => {
      const mockResponse = { data: [{ id: 1, title: 'Project 1' }] };
      mockGet.mockResolvedValue(mockResponse);

      const result = await projectsAPI.getAllProjects();

      expect(mockGet).toHaveBeenCalledWith('/projects', { params: {} });
      expect(result).toEqual(mockResponse);
    });

    it('should make POST request to create project', async () => {
      const projectData = { title: 'New Project' };
      const mockResponse = { data: { id: 2, ...projectData } };
      mockPost.mockResolvedValue(mockResponse);

      const result = await projectsAPI.createProject(projectData);

      expect(mockPost).toHaveBeenCalledWith('/projects', projectData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Skills API', () => {
    it('should make GET request to skills endpoint', async () => {
      const mockResponse = { data: [{ id: 1, name: 'JavaScript' }] };
      mockGet.mockResolvedValue(mockResponse);

      const result = await skillsAPI.getAllSkills();

      expect(mockGet).toHaveBeenCalledWith('/skills', { params: {} });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Experience API', () => {
    it('should make GET request to experience endpoint', async () => {
      const mockResponse = { data: [{ id: 1, company: 'Tech Corp' }] };
      mockGet.mockResolvedValue(mockResponse);

      const result = await experienceAPI.getAllExperience();

      expect(mockGet).toHaveBeenCalledWith('/experience');
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
      mockPost.mockResolvedValue(mockResponse);

      const result = await contactAPI.submitContactForm(formData);

      expect(mockPost).toHaveBeenCalledWith('/contact', formData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Admin API', () => {
    it('should make GET request to dashboard endpoint', async () => {
      const mockResponse = { data: { totalProjects: 10 } };
      mockGet.mockResolvedValue(mockResponse);

      const result = await adminAPI.getDashboardStats();

      expect(mockGet).toHaveBeenCalledWith('/admin/dashboard');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Utility Functions', () => {
    it('should handle API error with default message', () => {
      const error = new Error('Network Error');
      handleApiError(error);

      expect(mockToast.error).toHaveBeenCalledWith('An error occurred');
    });

    it('should handle API success with message', () => {
      const message = 'Success message';
      handleApiSuccess(message);

      expect(mockToast.success).toHaveBeenCalledWith(message);
    });
  });
});
