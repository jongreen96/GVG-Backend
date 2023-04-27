const contactQueries = require('../queries/contact');

module.exports = (app) => {
	// ----------------- POST ----------------- //
	// Send contact form
	app.post('/contact', async (req, res) => {
		try {
			const { name, email, message } = req.body;
			const result = await contactQueries.sendContactForm(name, email, message);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});

	// Send order confirmation
	app.post('/order-confirmation', async (req, res) => {
		try {
			const { name, email, total } = req.body;
			const result = await contactQueries.sendOrderConfirmation(
				name,
				email,
				total
			);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});
};
