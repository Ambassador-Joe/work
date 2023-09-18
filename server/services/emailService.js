import sgMail  from '@sendgrid/mail';


sgMail.setApiKey("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");

// Function to send a verification email
export const sendVerificationEmail = async (user) => {
  try {
    const msg = {
      to: user.email,
      from: process.env.EMAIL_USER, // Sender's email address (must be a verified sender in SendGrid)
      subject: 'Email Verification',
      html: `
        <p>Hello ${user.firstName},</p>
        <p>Click the following link to verify your account:</p>
        <p><a href="https://yourapp.com/verify/${user.verificationToken}">Verify Email</a></p>
      `,
    };

    await sgMail.send(msg);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

// Function to send a password reset email
export const sendPasswordResetEmail = async (user, resetToken) => {
  try {
    const msg = {
      to: user.email,
      from: process.env.EMAIL_USER, // Sender's email address (must be a verified sender in SendGrid)
      subject: 'Password Reset',
      html: `
        <p>Hello ${user.firstName},</p>
        <p>Click the following link to reset your password:</p>
        <p><a href="https://yourapp.com/reset-password/${resetToken}">Reset Password</a></p>
      `,
    };

    await sgMail.send(msg);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};
