const checkoutQueries = require('../queries/checkout');
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
		(request, response) => {
			const sig = request.headers['stripe-signature'];

			let event;

			try {
				event = stripe.webhooks.constructEvent(
					request.body,
					sig,
					endpointSecret
				);
			} catch (err) {
				response.status(400).send(`Webhook Error: ${err.message}`);
				return;
			}

			console.log(event);

			// Handle the event
			switch (event.type) {
				case 'payment_intent.amount_capturable_updated':
					const paymentIntentAmountCapturableUpdated = event.data.object;
					// Then define and call a function to handle the event payment_intent.amount_capturable_updated
					console.log(paymentIntentAmountCapturableUpdated);
					break;
				case 'payment_intent.canceled':
					const paymentIntentCanceled = event.data.object;
					// Then define and call a function to handle the event payment_intent.canceled
					console.log(paymentIntentCanceled);
					break;
				case 'payment_intent.created':
					const paymentIntentCreated = event.data.object;
					// Then define and call a function to handle the event payment_intent.created
					console.log(paymentIntentCreated);
					break;
				case 'payment_intent.partially_funded':
					const paymentIntentPartiallyFunded = event.data.object;
					// Then define and call a function to handle the event payment_intent.partially_funded
					console.log(paymentIntentPartiallyFunded);
					break;
				case 'payment_intent.payment_failed':
					const paymentIntentPaymentFailed = event.data.object;
					// Then define and call a function to handle the event payment_intent.payment_failed
					console.log(paymentIntentPaymentFailed);
					break;
				case 'payment_intent.processing':
					const paymentIntentProcessing = event.data.object;
					// Then define and call a function to handle the event payment_intent.processing
					console.log(paymentIntentProcessing);
					break;
				case 'payment_intent.requires_action':
					const paymentIntentRequiresAction = event.data.object;
					// Then define and call a function to handle the event payment_intent.requires_action
					console.log(paymentIntentRequiresAction);
					break;
				case 'payment_intent.succeeded':
					const paymentIntentSucceeded = event.data.object;
					// Then define and call a function to handle the event payment_intent.succeeded
					console.log(paymentIntentSucceeded);
					break;
				// ... handle other event types
				default:
					console.log(`Unhandled event type ${event.type}`);
			}

			// Return a 200 response to acknowledge receipt of the event
			response.send();
		}
	);
};
