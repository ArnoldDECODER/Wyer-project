import { betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { db } from '../db/client';
import { users } from '../db/schema';
import nodemailer from 'nodemailer';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { users },
  }),
  emailAndPassword: {
    enabled: false, // Disable password-based login
  },
  emailVerification: {
    enabled: true,
    async sendVerificationEmail(data) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email app password
        },
      });

      await transporter.sendMail({
        from: '"Wyer Backend" <your-email@gmail.com>',
        to: data.email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${data.otp}. It expires in 10 minutes.`,
        html: `<p>Your OTP code is <b>${data.otp}</b>. It expires in 10 minutes.</p>`,
      });
    },
  },
});

export type Auth = typeof auth;