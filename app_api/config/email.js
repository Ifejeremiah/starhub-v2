const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const from = '"The Starhub" <starhubdev@gmail.com>', errorRecipient = 'jerryroboy.16@gmail.com';

  return {
    send: async (to, subject, body) => {
      const info = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: body,
        generateTextFromHtml: true
      }).catch(err => console.log(err));
      console.log("Message sent: %s", info.messageId);
    },

    emailError: async (message, filename, exception) => {
      const body = `
      <h1>Starhub Site Server Error</h1>
      message: ${message}`;
      if (filename) body += `filename: ${filename}`;
      if (exception) body += `exception: ${exception}`;
      const info = await transporter.sendMail({
        from: from,
        to: errorRecipient,
        subject: 'Starhub Site Error (500)',
        html: body,
        generateTextFromHtml: true
      }).catch(err => console.log(err));
      console.log("Message sent: %s", info.messageId);
    }
  };
}
