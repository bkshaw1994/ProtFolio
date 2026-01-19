# Contact Form Email Setup

## Overview

The contact form automatically:

- ✅ Saves contact details to MongoDB
- ✅ Sends you (admin) an email with all contact details
- ✅ Sends the user a confirmation email

## Required Environment Variables

Add these to your Vercel server project (Settings → Environment Variables):

### Option 1: Gmail (Recommended for personal use)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Steps to get Gmail App Password:**

1. Enable 2-Factor Authentication on your Google Account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate a new app password for "Mail"
4. Use that 16-character password as `EMAIL_PASS`

### Option 2: Outlook/Hotmail

```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

### Option 3: SendGrid (Recommended for production)

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

## Testing Contact Form

1. Add environment variables in Vercel
2. Redeploy your server
3. Submit a test contact form
4. Check:
   - MongoDB for saved entry
   - Your inbox for notification email
   - Test user's inbox for confirmation email

## Email Templates

### Admin Notification Email

You'll receive an email with:

- Name, Email, Phone, Company
- Project Type, Budget, Timeline
- Subject and Message
- Timestamp

### User Confirmation Email

The user receives:

- Thank you message
- Copy of their submitted message
- Estimated response time (24-48 hours)

## Troubleshooting

**Emails not sending:**

- Check Vercel logs for email errors
- Verify environment variables are set correctly
- For Gmail, ensure 2FA is enabled and using App Password
- Check spam folder

**MongoDB not saving:**

- Verify MONGODB_URI is set
- Check `/api/test-db` endpoint shows `success: true`
- Check Vercel logs for database errors

## Local Development

Create `server/.env` file:

```env
MONGODB_URI=your-mongodb-uri
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```
