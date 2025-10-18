import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, textOrHtml, isHtml = false) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const payload = {
    from: process.env.EMAIL_USER,
    to,
    subject,
  };
  if (isHtml) {
    payload.html = textOrHtml;
  } else {
    payload.text = textOrHtml;
  }
  await transporter.sendMail(payload);
};


