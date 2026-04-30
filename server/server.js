const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost', 'http://localhost:8000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify email connection
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email service is ready');
    }
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'BuildTender Contact Form API is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, role, message } = req.body;

        // Validate input
        if (!name || !email || !role || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: `New Contact Form Submission - ${role}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FF6B35;">New Contact Form Submission</h2>
                    <hr style="border: none; border-top: 2px solid #FF6B35;">
                    
                    <h3>User Details:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Name:</td>
                            <td style="padding: 10px;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Email:</td>
                            <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Role:</td>
                            <td style="padding: 10px;">
                                ${role === 'owner' ? 'House Owner' : role === 'contractor' ? 'Contractor' : role === 'vendor' ? 'Vendor' : role}
                            </td>
                        </tr>
                    </table>
                    
                    <h3 style="margin-top: 20px;">Message:</h3>
                    <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #FF6B35; border-radius: 4px;">
                        <p>${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
                    <p style="color: #666; font-size: 12px; text-align: center;">
                        This is an automated email from BuildTender Contact Form.<br>
                        <strong>Do not reply to this email.</strong> Reply directly to the user at ${email}
                    </p>
                </div>
            `
        };

        // Confirmation email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'BuildTender - We received your message!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: white; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0;">BuildTender</h1>
                        <p style="margin: 5px 0 0 0;">Thank you for contacting us!</p>
                    </div>
                    
                    <div style="padding: 30px; background: #f9f9f9;">
                        <h2 style="color: #333;">Hi ${name},</h2>
                        <p style="color: #666; line-height: 1.6;">
                            Thank you for reaching out to BuildTender! We have received your message and will get back to you as soon as possible.
                        </p>
                        
                        <div style="background: white; padding: 20px; border-left: 4px solid #FF6B35; margin: 20px 0; border-radius: 4px;">
                            <h3 style="margin-top: 0; color: #333;">Your Message Summary:</h3>
                            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                            <p style="margin: 5px 0;"><strong>Category:</strong> ${role === 'owner' ? 'House Owner' : role === 'contractor' ? 'Contractor' : role === 'vendor' ? 'Vendor' : role}</p>
                            <p style="margin: 5px 0; white-space: pre-wrap;"><strong>Message:</strong><br>${message}</p>
                        </div>
                        
                        <h3 style="color: #333; margin-top: 30px;">What's Next?</h3>
                        <ul style="color: #666; line-height: 1.8;">
                            <li>Our team will review your message</li>
                            <li>We'll respond within 24 hours</li>
                            <li>You'll receive updates via this email</li>
                        </ul>
                        
                        <div style="background: white; padding: 20px; margin-top: 30px; border-radius: 8px; text-align: center;">
                            <p style="color: #666; margin: 0;">If you have any urgent questions, feel free to call us:</p>
                            <p style="color: #FF6B35; font-size: 18px; font-weight: bold; margin: 10px 0;">
                                <a href="tel:+918830232821" style="color: #FF6B35; text-decoration: none;">+91 8830232821</a>
                            </p>
                        </div>
                    </div>
                    
                    <div style="padding: 20px; background: #333; color: white; text-align: center; border-radius: 0 0 8px 8px;">
                        <p style="margin: 0; font-size: 12px;">
                            BuildTender - Transforming Private Home Construction<br>
                            <a href="https://buildtender.com" style="color: #FF6B35; text-decoration: none;">Visit our website</a>
                        </p>
                    </div>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        console.log(`✅ Emails sent successfully for: ${name} (${email})`);

        res.status(200).json({
            success: true,
            message: 'Thank you! Your message has been sent successfully. Check your email for confirmation.'
        });

    } catch (error) {
        console.error('❌ Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again later.'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 BuildTender API Server running on port ${PORT}`);
    console.log(`📧 Email service configured: ${process.env.EMAIL_USER}`);
    console.log(`📨 Recipient email: ${process.env.RECIPIENT_EMAIL}\n`);
});
