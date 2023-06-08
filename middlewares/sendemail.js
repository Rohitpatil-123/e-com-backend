export const sendemail = async (options) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b6676495f77c8e",
      pass: "3d68fce8632d7c",
    },
  });

  const mailoptions = {
    from: "rohitpatil8794@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transport.sendMail(mailoptions);
};
