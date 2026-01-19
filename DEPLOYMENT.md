# Deployment Notes

## Vercel Deployment

### Server Environment Variables (Required)

Set these in your Vercel dashboard for the **server** project:

1. `MONGODB_URI` - MongoDB connection string (e.g., from MongoDB Atlas)
2. `JWT_SECRET` - Secret key for JWT tokens
3. `NODE_ENV` - Set to `production`
4. `CLIENT_URL` - Your client URL (e.g., `https://your-client.vercel.app`)

**Email Configuration (For Contact Form):** 5. `SMTP_HOST` - SMTP host (e.g., `smtp.gmail.com` for Gmail) 6. `SMTP_PORT` - SMTP port (e.g., `587` for TLS) 7. `SMTP_SECURE` - Use SSL/TLS (e.g., `false` for port 587) 8. `SMTP_USER` - Your email address (receives contact form submissions) 9. `SMTP_PASSWORD` - Email password or app-specific password

**For Gmail:**

- Use App Password (not regular password)
- Go to Google Account → Security → 2-Step Verification → App Passwords
- Generate a new app password for "Mail"

**How to set in Vercel:**

1. Go to your server project in Vercel dashboard
2. Settings → Environment Variables
3. Add each variable for Production environment

### Client Environment Variables

The client uses `.env.production` file which is committed to the repo:

- `REACT_APP_API_URL` - Already set to `https://bishal-portfolio-server.vercel.app/api`

### File Uploads

⚠️ **Important**: File uploads currently use local filesystem storage. On Vercel's serverless environment:

- Files are stored in `/tmp` directory
- Files are **temporary** and deleted after function execution
- **Not suitable for production** file storage

### Recommended Solutions for Production:

1. **Vercel Blob** - Native Vercel storage solution

   ```bash
   npm install @vercel/blob
   ```

2. **Cloudinary** - Image hosting service

   ```bash
   npm install cloudinary
   ```

3. **AWS S3** - General file storage
   ```bash
   npm install @aws-sdk/client-s3
   ```

### Current Setup:

- Client: Static site deployed on Vercel
- Server: Serverless functions on Vercel (file uploads are temporary)
- Database: MongoDB Atlas (recommended)

### Environment Variables Required:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `NODE_ENV` - Set to `production`
- Additional variables for cloud storage (when implemented)

## Local Development

For local development, files are stored in `server/uploads/` directory and persist normally.
