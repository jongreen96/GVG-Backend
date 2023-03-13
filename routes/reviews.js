const reviewsQueries = require('../queries/reviews');

module.exports = (app) => {
	// ------------------- GET ------------------- //
	// Get all reviews
	app.get('/reviews', async (req, res) => {
		try {
			const result = await reviewsQueries.getAllReviews();
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});

	// Get review by productId
	app.get('/reviews/:productId', async (req, res) => {
		try {
			const result = await reviewsQueries.getReviewByProductId(req.params.productId);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});

	// ------------------- POST ------------------- //
	// Create review
	app.post('/reviews', async (req, res) => {
		try {
			const result = await reviewsQueries.createReview(req.body);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: 'Review not created' });
		}
	});

	// ------------------- PUT ------------------- //
	// Update review
	app.put('/reviews/:id', async (req, res) => {
		try {
			const result = await reviewsQueries.updateReview(req.params.id, req);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});

	// ------------------- DELETE ------------------- //
	// Delete review
	app.delete('/reviews/:id', async (req, res) => {
		try {
			const result = await reviewsQueries.deleteReview(req.params.id, req.user.id);
			res.send();
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});
};
