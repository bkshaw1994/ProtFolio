const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      subject,
      message,
      phone,
      company,
      projectType,
      budget,
      timeline
    } = req.body;

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create contact entry
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      phone,
      company,
      projectType,
      budget,
      timeline,
      ipAddress,
      userAgent
    });

    await contact.save();

    // Send notification email (optional)
    try {
      const transporter = createTransporter();
      
      // Email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting me!',
        html: `
          <h2>Thank you for reaching out, ${name}!</h2>
          <p>I've received your message and will get back to you within 24-48 hours.</p>
          <p>Here's a copy of your message:</p>
          <blockquote>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
          </blockquote>
          <p>Best regards,<br>Your Name</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while submitting form'
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
const getAllContacts = async (req, res) => {
  try {
    const {
      status,
      priority,
      limit = 20,
      page = 1,
      sortBy = 'createdAt'
    } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Build sort
    const sortOptions = {};
    switch (sortBy) {
      case 'name':
        sortOptions.name = 1;
        break;
      case 'priority':
        sortOptions.priority = -1;
        sortOptions.createdAt = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const contacts = await Contact.find(filter)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: contacts.length,
        totalContacts: total
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contacts'
    });
  }
};

// @desc    Get contact by ID
// @route   GET /api/contact/:id
// @access  Private (Admin)
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Mark as read
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching contact'
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
const updateContact = async (req, res) => {
  try {
    const { status, priority, notes, reply } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (notes !== undefined) updateData.notes = notes;
    if (reply !== undefined) {
      updateData.reply = reply;
      updateData.repliedAt = new Date();
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating contact'
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private (Admin)
const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $facet: {
          statusCounts: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          priorityCounts: [
            { $group: { _id: '$priority', count: { $sum: 1 } } }
          ],
          projectTypeCounts: [
            { $group: { _id: '$projectType', count: { $sum: 1 } } }
          ],
          monthlyStats: [
            {
              $group: {
                _id: {
                  year: { $year: '$createdAt' },
                  month: { $month: '$createdAt' }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 }
          ]
        }
      }
    ]);

    res.json({
      success: true,
      data: stats[0]
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};

module.exports = {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContact,
  getContactStats
};
