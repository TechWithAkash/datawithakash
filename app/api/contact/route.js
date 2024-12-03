// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     // Parse the request body
//     const body = await request.json();

//     // Destructure form data
//     const { firstName, lastName, email, message } = body;

//     // Validate input
//     if (!firstName || !lastName || !email || !message) {
//       return NextResponse.json(
//         { message: 'All fields are required' }, 
//         { status: 400 }
//       );
//     }

//     // Create a Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       secure: false, // Use TLS
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     // Send email
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: `New Contact Form Submission from ${firstName} ${lastName}`,
//       text: `
//         Name: ${firstName} ${lastName}
//         Email: ${email}
//         Message: ${message}
//       `,
//       html: `
//         <h3>New Contact Form Submission</h3>
//         <p><strong>Name:</strong> ${firstName} ${lastName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `
//     });

//     // Respond with success
//     return NextResponse.json(
//       { message: 'Message sent successfully!' }, 
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error sending email:', error);
    
//     // Respond with error
//     return NextResponse.json(
//       { 
//         message: 'Failed to send message', 
//         error: error.message 
//       }, 
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation Schema (same as in frontend)
const ContactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message cannot exceed 500 characters" })
});

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate input using Zod
    const validationResult = ContactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: 'Invalid form data',
          errors: validationResult.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }

    // Destructure validated data
    const { firstName, lastName, email, message } = validationResult.data;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email, // Set reply-to to sender's email
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `
    });

    // Respond with success
    return NextResponse.json(
      { message: 'Message sent successfully!' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Respond with error
    return NextResponse.json(
      { 
        message: 'Failed to send message', 
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}