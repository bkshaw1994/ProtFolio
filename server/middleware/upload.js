const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = ['uploads/images', 'uploads/resumes'];
uploadDirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profileImage') {
      cb(null, 'uploads/images');
    } else if (file.fieldname === 'resume') {
      cb(null, 'uploads/resumes');
    } else {
      cb(new Error('Invalid field name'), null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profileImage') {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for profile image'), false);
    }
  } else if (file.fieldname === 'resume') {
    // Accept PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for resume'), false);
    }
  } else {
    cb(new Error('Invalid field name'), false);
  }
};

// Create multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 2 // Maximum 2 files (1 image + 1 resume)
  }
});

// Export different upload configurations
module.exports = {
  uploadProfileImage: upload.single('profileImage'),
  uploadResume: upload.single('resume'),
  uploadBoth: upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ])
};