const checkoutQueries = require('../queries/checkout');
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

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

	app.post(
		'/webhook',
		express.raw({ type: 'application/json' }),
		(req, res) => {
			const sig = req.headers['stripe-signature'];
			let event;
			try {
				event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
			} catch (err) {
				res.status(400).send(`Webhook Error: ${err.message}`);
				return;
			}

			// Handle the event
			switch (event.type) {
				case 'payment_intent.succeeded':
					const paymentIntent = event.data.object;
					console.log('PaymentIntent was successful!');
					console.log(paymentIntent);
					break;
				default:
					console.log(`Unhandled event type ${event.type}`);
			}

			// Return a response to acknowledge receipt of the event
			res.send();
		}
	);
};
