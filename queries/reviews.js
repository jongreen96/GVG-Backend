const db = require('../db');

module.exports = {
	getAllReviews: async () => {
		const reviews = await db.query(
			'SELECT product_id, user_id, score, description, images, created FROM reviews'
		);
		if (!reviews) throw new Error('Reviews not found');
		return reviews.rows;
	},
	getReviewByProductId: async (productId) => {
		const review = await db.query(
			'SELECT product_id, user_id, score, first_name, last_name, description, images, reviews.created FROM reviews JOIN users ON users.id = reviews.user_id WHERE product_id = $1',
			[productId]
		);
		if (!review.rows[0]) throw new Error('Reviews not found');
		return review.rows;
	},
	createReview: async (review) => {
		const result = await db.query(
			'INSERT INTO reviews (product_id, user_id, score, description, images) VALUES ($1, $2, $3, $4, $5) RETURNING product_id, user_id, score, description, images',
			[review.product_id, review.user_id, review.score, review.description, review.images]
		);
		return result.rows[0];
	},
	updateReview: async (id, req) => {
		const newReview = req.body;
		const review = await db.query('SELECT created FROM reviews WHERE id = $1', [id]);
		if (!review.rows[0]) throw new Error('Review not found');
		if (review.user_id !== req.user.id) throw new Error('User not authorized');
		if (review.created + 86400000 * 7 < Date.now())
			throw new Error('Review cannot be updated after 7 days');
		const result = await db.query(
			'UPDATE reviews SET modified = NOW(), product_id = $1, user_id = $2, score = $3, description = $4 WHERE id = $5 RETURNING product_id, user_id, score, description, images',
			[newReview.product_id, newReview.user_id, newReview.score, newReview.description, id]
		);
		return result.rows[0];
	},
	deleteReview: async (id, user_id) => {
		const review = await db.query('SELECT created FROM reviews WHERE id = $1', [id]);
		if (!review.rows[0]) throw new Error('Review not found');
		if (review.user_id !== user_id) throw new Error('User not authorized');
		if (review.created + 86400000 * 7 < Date.now())
			throw new Error('Review cannot be deleted after 7 days');
		const result = await db.query('DELETE FROM reviews WHERE id = $1', [id]);
		return result.rows[0];
	},
};
