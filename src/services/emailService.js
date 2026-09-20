const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  console.log("Verification URL:", verificationUrl);

  // Later:
  // await transporter.sendMail({
  //   from: process.env.EMAIL_FROM,
  //   to: email,
  //   subject: "Verify your email",
  //   html: `
  //     <h2>Verify your email</h2>
  //     <p>Click the link below:</p>
  //     <a href="${verificationUrl}">
  //       Verify Email
  //     </a>
  //   `,
  // });
};

module.exports = {
  sendVerificationEmail,
};
