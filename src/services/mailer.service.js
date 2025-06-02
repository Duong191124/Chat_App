const nodemailer = require("nodemailer");

exports.sendResetMail = async (toEmail, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Your App Name"',
    to: toEmail,
    subject: "Password Reset Code",
    html:
      '<div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">\n' +
      '    <h2 style="color: #007bff; text-align: center; font-size: 24px; margin-bottom: 20px;">Password Reset Request</h2>\n' +
      '    <p style="font-size: 16px;">Dear,</p>\n' +
      '    <p style="font-size: 16px; line-height: 1.5;">You requested a password reset. Please click the link below to reset your password:</p>\n' +
      '    <div style="background-color: #f8f9fa; padding: 15px; border: 1px dashed #007bff; text-align: center; font-size: 18px; color: #007bff; margin: 20px 0; border-radius: 5px;">\n' +
      '        <a href="http://localhost:3000/reset-password?code=' +
      code +
      "&email=" +
      toEmail +
      '" style="text-decoration: none; color: #007bff; font-weight: bold;">\n' +
      "            Click here to reset your password\n" +
      "        </a>\n" +
      "    </div>\n" +
      '    <p style="font-size: 16px; line-height: 1.5;">This link will expire in 15 minutes.</p>\n' +
      '    <p style="font-size: 16px; line-height: 1.5;">If you didn\'t request a password reset, please ignore this email.</p>\n' +
      '    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">\n' +
      '    <p style="font-size: 14px; color: #333;">Thank you,</p>\n' +
      "</div>\n",
  };

  await transporter.sendMail(mailOptions);
};
