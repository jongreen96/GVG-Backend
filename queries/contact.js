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
			text: `Thank you for contacting us, ${name.split(' ')[0]}. 
			We will get back to you as soon as possible.`,
		};

		try {
			await transporter.sendMail(mailToMe);
			await transporter.sendMail(MailToCustomer);
		} catch (error) {
			console.log(error);
		}
	},

	sendOrderConfirmation: async (name, email, total) => {
		const mailToMe = {
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			subject: `Order from ${name} - £${total} - ${email}`,
			text: `Name: ${name}\nEmail: ${email}\nTotal: £${total}`,
		};

		const MailToCustomer = {
			from: process.env.EMAIL,
			to: email,
			subject: 'Thank you for your order from Green Vinyl Graphics',
			text: `Dear ${name.split(' ')[0]},\n\n
			We can confirm that we have received your order from Green Vinyl Graphics. Thank you for choosing our online store for your digital template needs.\n\n
			Your order is being processed, once completed visit your account page to download your files.\n
			If you need any assistance with the download process or have any questions about your purchase, please contact us by replying to this email or messaging us via our contact form at www.greenvinylgraphics.com/about.\n\n
			Thank you for choosing Green Vinyl Graphics, and we hope to serve you again in the future.\n
			Sincerely,\nJon Green.`,
		};

		try {
			await transporter.sendMail(mailToMe);
			await transporter.sendMail(MailToCustomer);
		} catch (error) {
			console.log(error);
		}
	},
};
