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
		const mailToMe = {
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: `Contact form from ${name} - ${email}`,
			text: message,
		};

		const MailToCustomer = {
			from: process.env.EMAIL,
			to: email,
			subject: 'Thank you for contacting Green Vinyl Graphics',
			text: `Thank you for contacting us, ${name.split(' ').shift()}. We will get back to you as soon as possible.`,
		}

		try {
			await transporter.sendMail(mailToMe);
			await transporter.sendMail(MailToCustomer);
		} catch (error) {
			console.log(error);
		}
	},
};
