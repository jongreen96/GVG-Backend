const db = require('../db');

const takePayment = async (userId, cartId, orderDetails, total) => {
	// TODO: Take payment using orderDetails and total
	const success = true; // TODO: Set to false if payment fails
	if (success) {
		await db.query('UPDATE orders SET status = $1 WHERE user_id = $2', ['paid', userId]);
		await db.query('DELETE FROM carts_items WHERE cart_id = $1', [cartId.rows[0].id]);
	} else {
		await db.query('UPDATE orders SET status = $1 WHERE user_id = $2', ['failed', userId]);
	}
	return success;
};

module.exports = {
	createOrder: async (userId, orderDetails) => {
		if (!orderDetails) throw new Error('No payment details provided');

		const cartId = await db.query('SELECT id FROM carts WHERE user_id = $1', [userId]);
		const cartItems = await db.query('SELECT * FROM carts_items WHERE cart_id = $1', [
			cartId.rows[0].id,
		]);

		if (cartItems.rows.length === 0) throw new Error('Cart is empty');

		const total = await db.query(
			'SELECT sum(carts_items.quantity * products.price) FROM carts_items, products WHERE carts_items.product_id = products.id AND carts_items.cart_id = $1',
			[cartId.rows[0].id]
		);
		const order = await db.query(
			'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING id, total, status',
			[userId, total.rows[0].sum, 'pending']
		);
		const orderItems = cartItems.rows.map((item) => {
			return db.query(
				'INSERT INTO orders_items (order_id, product_id, quantity, status) VALUES ($1, $2, $3, $4)',
				[order.rows[0].id, item.product_id, item.quantity, 'pending']
			);
		});

		takePayment(userId, cartId, orderDetails, total.rows[0].sum);

		return order.rows[0];
	},
};
