import nodemailer from "nodemailer";
import { generateEmailVerifyToken } from "./auth.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sn.fruman@gmail.com",
    pass: "mich ghqp yxzk afgx",
  },
});

export const sendNotification = async ({user, medications}) => {

  const text =`👋 Hi ${user.first_name},\n\n` +
  `It's time to take your medication:\n\n` +
  medications.map(med => `💊 *${med.pill_name}* (${med.dosage}) at ${med.reminder_time}`).join("\n") + 
  `\n\nTake care of yourself and stay healthy! 😊`;


  const mailOptions = {
    from: `"No Reply" <sn.fruman@gmail.com>`,
    to: user.email,
    subject: "Medicine reminder",
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📩 Notification sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendEmailVerification = async (user, EmailVerifyToken) => {

  const verificationLink = `${process.env.DEFAULT_URL}/api/users/emailverify?token=${EmailVerifyToken}`;

  const mailOptions = {
    from: `"No Reply" <sn.fruman@gmail.com>`,
    to: user.email,
    subject: "Verify your email",
    text: `Click the link to verify your email: ${verificationLink}`,
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);

    console.log(`📩 Verify email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
