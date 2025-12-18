import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials not configured')

      // Fallback: Log the message and send mailto link
      console.log('Contact Form Submission (Email service not configured):')
      console.log('From:', name, '(' + email + ')')
      console.log('Subject:', subject)
      console.log('Message:', message)

      return NextResponse.json(
        {
          error: 'Email service not configured yet. For now, please email directly.',
          mailto: `mailto:ayush.kashyap7155@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`,
          contactEmail: 'ayush.kashyap7155@gmail.com'
        },
        { status: 503 }
      )
    }

    try {
      // Create transporter using Gmail
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

      // Email HTML template
      const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 30px 20px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e0e0e0;
    }
    .field:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: bold;
      color: #00d4ff;
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
    }
    .value {
      color: #333;
      font-size: 16px;
    }
    .message-box {
      background: #f8f9fa;
      padding: 20px;
      border-left: 4px solid #8b5cf6;
      margin-top: 10px;
      line-height: 1.8;
      border-radius: 4px;
    }
    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
      border-top: 1px solid #e0e0e0;
    }
    .reply-button {
      display: inline-block;
      margin: 20px 0;
      padding: 12px 30px;
      background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%);
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .info-badge {
      display: inline-block;
      background: #e7f3ff;
      color: #0066cc;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      margin-left: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Portfolio Contact</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">👤 From</span>
        <div class="value">
          <strong>${name}</strong>
          <span class="info-badge">New Message</span>
        </div>
      </div>
      
      <div class="field">
        <span class="label">✉️ Email Address</span>
        <div class="value">
          <a href="mailto:${email}" style="color: #00d4ff; text-decoration: none;">
            ${email}
          </a>
        </div>
      </div>
      
      <div class="field">
        <span class="label">📋 Subject</span>
        <div class="value">${subject}</div>
      </div>
      
      <div class="field">
        <span class="label">💬 Message</span>
        <div class="message-box">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <center>
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-button">
          Reply to ${name}
        </a>
      </center>
    </div>
    
    <div class="footer">
      <p><strong>Sent from your Portfolio Contact Form</strong></p>
      <p>Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      <p style="margin-top: 10px; color: #999;">
        This email was sent to ayush.kashyap7155@gmail.com
      </p>
    </div>
  </div>
</body>
</html>
      `

      // Plain text version
      const textEmail = `
New Portfolio Contact Message

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
Sent from your Portfolio Contact Form
      `

      // Send email
      const info = await transporter.sendMail({
        from: `"${name} via Portfolio" <${process.env.GMAIL_USER}>`,
        to: 'ayush.kashyap7155@gmail.com',
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        text: textEmail,
        html: htmlEmail,
      })

      console.log('Email sent successfully:', info.messageId)

      return NextResponse.json(
        {
          success: true,
          message: 'Message sent successfully! I\'ll get back to you soon.',
          messageId: info.messageId
        },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Gmail sending error:', emailError)

      return NextResponse.json(
        {
          error: 'Failed to send email. Please try emailing directly.',
          mailto: `mailto:ayush.kashyap7155@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`,
          details: emailError.message
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
