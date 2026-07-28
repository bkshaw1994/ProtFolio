const Profile = require('../models/Profile');
const { getProfile, createOrUpdateProfile } = require('../controllers/profileController');

jest.mock('../models/Profile');

describe('Profile Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {}
    };
    res = {
      set: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('getProfile', () => {
    it('should return active profile', async () => {
      const mockProfile = { name: 'Bishal Kumar Shaw', title: 'Full Stack Developer' };
      const queryMock = { select: jest.fn().mockResolvedValue(mockProfile) };
      Profile.findOne.mockReturnValue(queryMock);

      await getProfile(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockProfile
      });
    });

    it('should return 404 if no active profile exists', async () => {
      const queryMock = { select: jest.fn().mockResolvedValue(null) };
      Profile.findOne.mockReturnValue(queryMock);

      await getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Profile not found'
      });
    });
  });

  describe('createOrUpdateProfile', () => {
    it('should update profile if one already exists', async () => {
      req.body = { name: 'John Updated' };
      const existingProfile = { _id: 'profile123' };
      Profile.findOne.mockResolvedValue(existingProfile);
      Profile.findByIdAndUpdate.mockResolvedValue({ _id: 'profile123', name: 'John Updated' });

      await createOrUpdateProfile(req, res);

      expect(Profile.findByIdAndUpdate).toHaveBeenCalledWith(
        'profile123',
        expect.any(Object),
        { new: true, runValidators: true }
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, message: 'Profile updated successfully' })
      );
    });

    it('should create profile if none exists', async () => {
      req.body = { name: 'New Profile' };
      Profile.findOne.mockResolvedValue(null);
      Profile.prototype.save = jest.fn().mockResolvedValue(req.body);

      await createOrUpdateProfile(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });
});
