import nodemailer from "nodemailer";
export const sendemail = async (options) => {
  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "rspatil4518@gmail.com",
      pass: "Rohit@123",
    },
  });

  const mailoptions = {
    from: "rspatil4518@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transport.sendMail(mailoptions);
};
