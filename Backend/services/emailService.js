const nodemailer = require("nodemailer");

async function sendResetEmail(to, token) {
  // Configure transporter with Gmail + App Password
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your Gmail App Password
    },
  });

  // Reset link pointing to your frontend
const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  // Send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
      <p>This link will expire in 15 minutes.</p>
    `,
  });
}

module.exports = { sendResetEmail };
