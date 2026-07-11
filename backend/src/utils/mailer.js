import nodemailer from "nodemailer";
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendDealAlert = async (productName, productUrl, productPrice) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: "learnerguy150@gmail.com",
      subject: `Price Drop: ${productName}`,
      html : `<p> Here is the updated price with url ${productPrice} and ${productUrl}</p>`
    };
    await transporter.sendMail(mailOptions);
    console.log("mail sent successfully!")
  } catch (error) {
    console.error("failed to send the mail", error);
  }
};

export {sendDealAlert};