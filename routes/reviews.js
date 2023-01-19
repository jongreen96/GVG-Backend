const reviewsQueries = require('../queries/reviews');

module.exports = (app) => {
	// ------------------- GET ------------------- //
	// Get all reviews
	app.get('/reviews', async (req, res) => {
		try {
			const result = await reviewsQueries.getAllReviews();
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Reviews not found' });
		}
	});

	// Get review by productId
	app.get('/reviews/:productId', async (req, res) => {
		try {
			const result = await reviewsQueries.getReviewByProductId(req.params.productId);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Review not found' });
		}
	});

	// ------------------- POST ------------------- //
	// Create review
	app.post('/reviews', async (req, res) => {
		try {
			const result = await reviewsQueries.createReview(req.body);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Review not created' });
		}
	});

	// ------------------- PUT ------------------- //
	// Update review
	app.put('/reviews/:id', async (req, res) => {
		try {
			const result = await reviewsQueries.updateReview(req.params.id, req.body);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Review not updated' });
		}
	});

	// ------------------- DELETE ------------------- //
	// Delete review
	app.delete('/reviews/:id', async (req, res) => {
		try {
			const result = await reviewsQueries.deleteReview(req.params.id);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Review not deleted' });
		}
	});
};
