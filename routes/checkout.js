const checkoutQueries = require('../queries/checkout');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = (app) => {
	// --------------------- POST --------------------- //
	app.post('/carts/checkout', async (req, res) => {
		try {
			const result = await checkoutQueries.createOrder(req.user.id);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});

	app.post('/create-payment-intent', async (req, res) => {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: req.body.total * 100,
			currency: 'gbp',
			automatic_payment_methods: {
				enabled: true,
			},
		});

		res.send({ clientSecret: paymentIntent.client_secret });
	});
};
