const db = require('../db');

module.exports = {
	getAllReviews: async () => {
		const reviews = await db.query('SELECT * FROM reviews');
		return reviews.rows;
	},
	getReviewByProductId: async (productId) => {
		const review = await db.query('SELECT * FROM reviews WHERE product_id = $1', [productId]);
		return review.rows;
	},
	createReview: async (review) => {
		const result = await db.query(
			'INSERT INTO reviews (product_id, user_id, rating, review) VALUES ($1, $2, $3, $4) RETURNING *',
			[review.product_id, review.user_id, review.rating, review.review]
		);
		return result.rows[0];
	},
	updateReview: async (id, review) => {
		const review = await db.query('SELECT * FROM reviews WHERE id = $1', [id]);
		if (review.created + 86400000 * 7 < Date.now())
			throw new Error('Review cannot be updated after 7 days');
		const result = await db.query(
			'UPDATE reviews SET product_id = $1, user_id = $2, rating = $3, review = $4 WHERE id = $5 RETURNING *',
			[review.product_id, review.user_id, review.rating, review.review, id]
		);
		return result.rows[0];
	},
	deleteReview: async (id) => {
		const review = await db.query('SELECT * FROM reviews WHERE id = $1', [id]);
		if (review.created + 86400000 * 7 < Date.now())
			throw new Error('Review cannot be deleted after 7 days');
		const result = await db.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
		return result.rows[0];
	},
};
