const Contact = require('../models/Contact');
const {
  submitContactForm,
  getAllContacts,
  getContactById
} = require('../controllers/contactController');

jest.mock('../models/Contact');
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue(true)
  }))
}));

describe('Contact Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {},
      query: {},
      params: {},
      ip: '127.0.0.1',
      get: jest.fn().mockReturnValue('jest-agent')
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('submitContactForm', () => {
    it('should save contact entry and attempt sending notification email', async () => {
      req.body = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Project inquiry'
      };
      Contact.prototype.save = jest.fn().mockResolvedValue(req.body);

      await submitContactForm(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Message sent successfully! I\'ll get back to you soon.'
        })
      );
    });
  });

  describe('getAllContacts', () => {
    it('should return contacts with pagination', async () => {
      const mockContacts = [{ name: 'Contact 1' }];
      const queryMock = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue(mockContacts)
      };
      Contact.find.mockReturnValue(queryMock);
      Contact.countDocuments.mockResolvedValue(1);

      await getAllContacts(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: mockContacts,
          pagination: expect.objectContaining({ totalContacts: 1 })
        })
      );
    });
  });

  describe('getContactById', () => {
    it('should return contact and mark as read if unread', async () => {
      req.params.id = 'c123';
      const mockContact = {
        _id: 'c123',
        isRead: false,
        save: jest.fn().mockResolvedValue(true)
      };
      Contact.findById.mockResolvedValue(mockContact);

      await getContactById(req, res);

      expect(mockContact.isRead).toBe(true);
      expect(mockContact.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockContact
      });
    });

    it('should return 404 if contact not found', async () => {
      req.params.id = 'invalid';
      Contact.findById.mockResolvedValue(null);

      await getContactById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
