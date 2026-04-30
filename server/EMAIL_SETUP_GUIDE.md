# BuildTender Email Setup Guide

## Overview
This guide explains how to set up the contact form email functionality for your BuildTender website.

## Architecture
- **Frontend**: HTML form + JavaScript (sends data to backend)
- **Backend**: Node.js + Express server with Nodemailer (handles emails)
- **Email Service**: Gmail SMTP

## Prerequisites
1. Node.js installed on your system
2. A Gmail account (or other email service)
3. Gmail App Password (NOT your regular Gmail password)

---

## Step 1: Get Gmail App Password

### Why App Password?
Gmail requires an "App Password" for third-party applications to send emails for security reasons.

### How to Generate:

1. **Enable 2-Factor Authentication** on your Google Account:
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the steps to enable it

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - **Copy this password** (you'll need it in Step 3)

---

## Step 2: Install Backend Dependencies

1. Open PowerShell or Command Prompt
2. Navigate to the server directory:
   ```bash
   cd c:\Users\saura\OneDrive\Desktop\BuildTender\server
   ```

3. Install required packages:
   ```bash
   npm install
   ```

   This will install:
   - Express (web framework)
   - Nodemailer (email service)
   - CORS (handle cross-origin requests)
   - Body-parser (parse form data)
   - dotenv (secure configuration)

---

## Step 3: Configure Environment Variables

1. Open the `.env.example` file in the server folder
2. Create a new file called `.env` (without .example)
3. Fill in your details:

   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   RECIPIENT_EMAIL=info.buildtender@gmail.com
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost
   ```

   **Example:**
   ```
   EMAIL_USER=saura123@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   RECIPIENT_EMAIL=info.buildtender@gmail.com
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost
   ```

⚠️ **IMPORTANT**: 
- Never commit `.env` to version control
- Keep your App Password private
- `.env` file is already in `.gitignore`

---

## Step 4: Start the Backend Server

1. In PowerShell (navigate to server folder):
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

2. You should see:
   ```
   🚀 BuildTender API Server running on port 3000
   📧 Email service configured: your-email@gmail.com
   📨 Recipient email: info.buildtender@gmail.com
   ```

✅ **Server is running!**

---

## Step 5: Test the Contact Form

1. **Open your website**: Open `index.html` in a web browser
   - Example: `file:///c:/Users/saura/OneDrive/Desktop/BuildTender/website/index.html`

2. **Scroll to Contact Section**: Fill in the form:
   - Name: Test User
   - Email: your-test-email@gmail.com
   - Role: House Owner (or any)
   - Message: This is a test message

3. **Submit Form**: Click "Send Message"

4. **Check Results**:
   - ✅ Confirmation email in your test email inbox
   - ✅ Admin email in `info.buildtender@gmail.com` inbox

---

## Email Templates

### Admin Email (Admin Receives)
- Shows: Name, Email, Role, Message
- Has user's email for direct reply
- Professional HTML formatting

### User Email (Sender Receives)
- Confirmation that message was received
- Summary of their submission
- Phone number for urgent queries
- Professional branding

---

## Troubleshooting

### Problem: "Connection Failed" or "Cannot connect to server"
**Solution**: 
- Make sure backend server is running
- Check if `npm start` shows "running on port 3000"
- Try restarting the server

### Problem: "Invalid Email" or "Permission Denied"
**Solution**:
- Verify `.env` file has correct Gmail address
- Check if App Password is correct (16 characters with spaces)
- Ensure 2-Factor Authentication is enabled
- Gmail may block first attempt - allow access when prompted

### Problem: "Email not received"
**Solution**:
- Check spam/junk folder
- Verify recipient email in `.env` is correct
- Check server console for error messages
- Try sending test email from different address

### Problem: Emails go to spam
**Solution**:
- Add sender email to contacts
- This is normal for first deployments
- Use a professional email sending service in production

---

## Production Deployment

### For Production (Important!)

When deploying to production:

1. **Use a Professional Email Service**:
   - SendGrid
   - MailGun
   - AWS SES
   - Brevo (formerly Sendinblue)

2. **Update FRONTEND_URL** in `.env`:
   ```
   FRONTEND_URL=https://your-domain.com
   ```

3. **Update API URL** in `script.js`:
   ```javascript
   // Change from:
   const response = await fetch('http://localhost:3000/api/contact', {
   
   // To:
   const response = await fetch('https://your-domain.com/api/contact', {
   ```

4. **Set NODE_ENV**:
   ```
   NODE_ENV=production
   ```

5. **Use HTTPS** for security

---

## File Structure

```
BuildTender/
├── website/
│   ├── index.html
│   ├── assets/
│   │   ├── css/style.css
│   │   └── js/script.js (updated with email functionality)
│   └── pages/
│
└── server/
    ├── server.js (main backend server)
    ├── package.json (dependencies)
    ├── .env (your config - KEEP SECRET!)
    ├── .env.example (template)
    └── node_modules/ (installed packages)
```

---

## How It Works (Technical Details)

1. **User fills form** → Click "Send Message"
2. **JavaScript sends data** → `fetch()` POST to `/api/contact`
3. **Node.js receives data** → Validates all fields
4. **Nodemailer sends 2 emails**:
   - Email to user (confirmation)
   - Email to admin (form data)
5. **Response sent back** → Show success/error message
6. **User sees notification** → Animated popup

---

## Security Notes

✅ **Done Right**:
- Environment variables for secrets
- CORS enabled for your domain
- Input validation on backend
- No sensitive data in frontend
- HTTPS recommended for production

⚠️ **Consider**:
- Add rate limiting (prevent spam)
- Add CAPTCHA for production
- Use email templates service
- Enable email signing (SPF, DKIM, DMARC)

---

## Customization

### Change Email Template
Edit the HTML in `server.js` in the `adminMailOptions` and `userMailOptions` sections.

### Change Submission Endpoint
In `script.js`, change the fetch URL:
```javascript
const response = await fetch('http://your-api-url:3000/api/contact', {
```

### Add More Fields
1. Add input to HTML form
2. Add field to fetch request
3. Update server.js to handle new field
4. Update email templates

---

## Support

For issues:
1. Check server console (backend errors)
2. Check browser console (frontend errors)
3. Verify `.env` configuration
4. Check firewall/antivirus blocking port 3000
5. Ensure Gmail account has 2FA enabled

---

## Quick Start Checklist

- [ ] Node.js installed
- [ ] Gmail 2FA enabled
- [ ] App Password generated
- [ ] `.env` file created with correct values
- [ ] `npm install` completed in server folder
- [ ] `npm start` server running
- [ ] Website loads without errors
- [ ] Test form submission
- [ ] Receive confirmation email
- [ ] Receive admin email

---

**Setup Complete!** 🎉 Your contact form is now fully functional with email notifications.
