const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

module.exports = {
	sendContactForm: async (name, email, message) => {
		const mailOptions = {
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: `Contact form from ${name} - ${email}`,
			text: message,
		};

		try {
			await transporter.sendMail(mailOptions);
		} catch (error) {
			console.log(error);
		}
	},
};
