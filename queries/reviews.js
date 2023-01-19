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
			'INSERT INTO reviews (product_id, user_id, score, description) VALUES ($1, $2, $3, $4) RETURNING *',
			[review.product_id, review.user_id, review.score, review.description]
		);
		return result.rows[0];
	},
	updateReview: async (id, newReview) => {
		const review = await db.query('SELECT * FROM reviews WHERE id = $1', [id]);
		if (review.created + 86400000 * 7 < Date.now())
			throw new Error('Review cannot be updated after 7 days');
		const result = await db.query(
			'UPDATE reviews SET product_id = $1, user_id = $2, score = $3, description = $4 WHERE id = $5 RETURNING *',
			[newReview.product_id, newReview.user_id, newReview.score, newReview.description, id]
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
