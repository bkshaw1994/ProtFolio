# Deployment Notes

## Vercel Deployment

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
