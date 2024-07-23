exports.Register = (name) => {
  return ` <body
    style="
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 1rem 0 1rem;
        background-color: #f4f4f4;
        justify-content: center;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <div
        style="
          background-color: #007bff;
          color: #ffffff;
          padding: 10px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        "
      >
        <h1>Welcome to Our Service!</h1>
      </div>
      <div style="padding: 20px">
        <p>Hi ${name},</p>
        <p>
          Thank you for registering with us. We are excited to have you on
          board!
        </p>
        <p>
          To get started, please verify your email address by clicking the
          button below:
        </p>
        <!-- <a href="[Verification Link]" style="display: inline-block; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #007bff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a> -->
        <!-- <p>If you did not create an account, please ignore this email.</p> -->
        <p>Best regards,<br />The [Product Company] Team</p>
      </div>
      <div
        style="
          background-color: #f1f1f1;
          color: #555555;
          padding: 10px;
          text-align: center;
          border-radius: 0 0 8px 8px;
        "
      >
        <p>&copy; 2024 [Product Company]. All rights reserved.</p>
        <p>
          If you have any questions, please visit our
          <a href="#" style="color: #007bff; text-decoration: none"
            >support page</a
          >.
        </p>
      </div>
    </div>
  </body>`;
};
