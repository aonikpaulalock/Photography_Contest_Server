import nodemailer from "nodemailer"
import config from "../app/config";
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",//Safe to production
    auth: {
      user: "alockpaul9845@gmail.com",
      pass: "txvq dbee cxur yjmc",
    },
  });

  await transporter.sendMail({
    from: 'alockpaul9845@gmail.com', // sender address premium
    to, // list of receivers
    subject: "Reset your password", // Subject line
    text: "password change within 10 min", // plain text body
    html
  })
}