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

	app.post('/stripe-webhook', async (req, res) => {
		const sig = req.headers['stripe-signature'];

		let event;

		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				sig,
				process.env.STRIPE_WEBHOOK_SECRET
			);
		} catch (err) {
			res.status(400).send(`Webhook Error: ${err.message}`);
		}

		switch (event.type) {
			case 'checkout.session.async_payment_failed':
				const checkoutSessionAsyncPaymentFailed = event.data.object;
				// Then define and call a function to handle the event checkout.session.async_payment_failed
				console.log(
					'checkout.session.async_payment_failed' +
						checkoutSessionAsyncPaymentFailed
				);
				break;
			case 'checkout.session.async_payment_succeeded':
				const checkoutSessionAsyncPaymentSucceeded = event.data.object;
				// Then define and call a function to handle the event checkout.session.async_payment_succeeded
				console.log(
					'checkout.session.async_payment_succeeded' +
						checkoutSessionAsyncPaymentSucceeded
				);
				break;
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		res.send();
	});
};
