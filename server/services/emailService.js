const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * 🔥 BASE URL HELPER
 */
function getBaseUrl() {
  return process.env.CLIENT_URL || "http://localhost:5173";
}


/**
 * 🔥 VERIFY EMAIL
 */
async function sendVerificationEmail(user, token) {
  try {
    const baseUrl = getBaseUrl();

    // ✅ FIXED (ENCODE TOKEN)
    const verifyLink = `${baseUrl}/verify?token=${encodeURIComponent(token)}`;

    const email = {
      sender: {
        name: "LGC Articulate - DevLang",
        email: process.env.EMAIL_FROM
      },
      to: [
        {
          email: user.email,
          name: user.name
        }
      ],
      subject: "Verify your account",
      htmlContent: `
        <h2>Hello ${user.name},</h2>
        <p>Please verify your account by clicking below:</p>

        <a href="${verifyLink}" 
           style="padding:10px 20px;background:#6c5ce7;color:white;text-decoration:none;border-radius:5px;">
          Verify Account
        </a>

        <p>This link will expire in 1 hour.</p>
      `
    };

    await emailApi.sendTransacEmail(email);

    console.log("Verification email sent");

  } catch (error) {
    console.error("Email send error:", error.message);
    throw error;
  }
}


/**
 * 🔥 RESET PASSWORD EMAIL
 */
async function sendResetEmail(user, token) {
  try {
    const baseUrl = getBaseUrl();

    // ✅ FIXED (ENCODE TOKEN)
    const resetLink = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;

    const email = {
      sender: {
        name: "LGC Articulate - DevLang",
        email: process.env.EMAIL_FROM
      },
      to: [
        {
          email: user.email,
          name: user.name
        }
      ],
      subject: "Reset your password",
      htmlContent: `
        <h2>Hello ${user.name},</h2>
        <p>You requested a password reset.</p>

        <a href="${resetLink}" 
           style="padding:10px 20px;background:#6c5ce7;color:white;text-decoration:none;border-radius:5px;">
          Reset Password
        </a>

        <p>This link will expire in 1 hour.</p>

        <p>If you did not request this, you can safely ignore this email.</p>
      `
    };

    await emailApi.sendTransacEmail(email);

    console.log("Reset email sent");

  } catch (error) {
    console.error("Reset email error:", error.message);
    throw error;
  }
}


module.exports = {
  sendVerificationEmail,
  sendResetEmail
};