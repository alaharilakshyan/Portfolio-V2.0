import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject = 'Contact Form Submission', message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // 1. Email to you (the site owner)
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.EMAIL_TO || 'your-email@example.com',
      replyTo: email,
      subject: `New Contact: ${subject}`,
      text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #4f46e5;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-line; background-color: white; padding: 10px; border-radius: 4px; border: 1px solid #e2e8f0;">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    // 2. Thank you email to the sender
    await resend.emails.send({
      from: 'Your Name <onboarding@resend.dev>',
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      text: `Hi ${name},\n\nThank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.\n\nHere's a copy of your message:\n-------------------------\nSubject: ${subject}\n\n${message}\n-------------------------\n\nBest regards,\nYour Name\nYour Website`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #4f46e5; margin-bottom: 5px;">Thank You!</h1>
            <p style="color: #4b5563;">I've received your message and will get back to you soon.</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #4f46e5;">
            <h3 style="color: #1a365d; margin-top: 0;">Your Message:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background-color: white; padding: 15px; border-radius: 6px; margin-top: 10px; border: 1px solid #e2e8f0;">
              <p style="white-space: pre-line; margin: 0;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="margin-bottom: 5px;">Best regards,</p>
            <p style="margin: 0; font-weight: 600; color: #1a365d;">Your Name</p>
            <p style="margin: 0; color: #4b5563;">Your Title</p>
            <p style="margin: 5px 0 0 0;">
              <a href="https://yourwebsite.com" style="color: #4f46e5; text-decoration: none;">yourwebsite.com</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
