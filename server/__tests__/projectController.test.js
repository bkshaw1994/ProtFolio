const Project = require('../models/Project');
const {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectCategories
} = require('../controllers/projectController');

jest.mock('../models/Project');

describe('Project Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      query: {},
      params: {},
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('getAllProjects', () => {
    it('should return projects with default filter and pagination', async () => {
      const mockProjects = [{ title: 'Project 1' }, { title: 'Project 2' }];
      const queryMock = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue(mockProjects)
      };

      Project.find.mockReturnValue(queryMock);
      Project.countDocuments.mockResolvedValue(2);

      await getAllProjects(req, res);

      expect(Project.find).toHaveBeenCalledWith({ isActive: true });
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: mockProjects,
          pagination: expect.objectContaining({ current: 1, total: 1, count: 2, totalProjects: 2 })
        })
      );
    });

    it('should handle custom filters and sort options', async () => {
      req.query = {
        category: 'full-stack',
        status: 'completed',
        featured: 'true',
        sortBy: 'date',
        page: '2',
        limit: '5'
      };

      const queryMock = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue([])
      };

      Project.find.mockReturnValue(queryMock);
      Project.countDocuments.mockResolvedValue(0);

      await getAllProjects(req, res);

      expect(Project.find).toHaveBeenCalledWith({
        isActive: true,
        category: 'full-stack',
        status: 'completed',
        isFeatured: true
      });
    });

    it('should return 500 on server error', async () => {
      Project.find.mockImplementation(() => {
        throw new Error('Database Error');
      });

      await getAllProjects(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: false })
      );
    });
  });

  describe('getFeaturedProjects', () => {
    it('should return top 6 featured projects', async () => {
      const mockFeatured = [{ title: 'Featured 1' }];
      const queryMock = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue(mockFeatured)
      };
      Project.find.mockReturnValue(queryMock);

      await getFeaturedProjects(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockFeatured
      });
    });
  });

  describe('getProjectById', () => {
    it('should return project if found and active', async () => {
      req.params.id = '123';
      const mockProject = { _id: '123', isActive: true, title: 'Project 1' };
      const queryMock = { select: jest.fn().mockResolvedValue(mockProject) };
      Project.findById.mockReturnValue(queryMock);

      await getProjectById(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockProject
      });
    });

    it('should return 404 if project is missing or inactive', async () => {
      req.params.id = '123';
      const queryMock = { select: jest.fn().mockResolvedValue(null) };
      Project.findById.mockReturnValue(queryMock);

      await getProjectById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('createProject', () => {
    it('should create and save project', async () => {
      req.body = { title: 'New Project' };
      Project.prototype.save = jest.fn().mockResolvedValue(req.body);

      await createProject(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, message: 'Project created successfully' })
      );
    });
  });

  describe('updateProject & deleteProject', () => {
    it('should update project by ID', async () => {
      req.params.id = '123';
      req.body = { title: 'Updated' };
      Project.findByIdAndUpdate.mockResolvedValue({ _id: '123', title: 'Updated' });

      await updateProject(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, message: 'Project updated successfully' })
      );
    });

    it('should soft delete project by setting isActive: false', async () => {
      req.params.id = '123';
      Project.findByIdAndUpdate.mockResolvedValue({ _id: '123', isActive: false });

      await deleteProject(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, message: 'Project deleted successfully' })
      );
    });

    it('should return project categories', async () => {
      const mockCategories = [{ _id: 'web', count: 5 }];
      Project.aggregate.mockResolvedValue(mockCategories);

      await getProjectCategories(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockCategories
      });
    });
  });
});
