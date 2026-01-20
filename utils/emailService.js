const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});

exports.sendEmail = async (to, subject, html) => {
    if (!process.env.AUTH_EMAIL || !process.env.AUTH_PASS) {
        console.log("Email credentials missing. Skipping email.");
        return;
    }

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};
