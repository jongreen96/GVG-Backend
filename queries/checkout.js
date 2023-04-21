const db = require('../db');

module.exports = {
	createOrder: async (userId, pi) => {
		const cartId = await db.query('SELECT id FROM carts WHERE user_id = $1', [
			userId,
		]);
		const cartItems = await db.query(
			'SELECT * FROM carts_items WHERE cart_id = $1',
			[cartId.rows[0].id]
		);

		if (cartItems.rows.length === 0) throw new Error('Cart is empty');

		const total = await db.query(
			'SELECT sum(carts_items.quantity * products.price) FROM carts_items, products WHERE carts_items.product_id = products.id AND carts_items.cart_id = $1',
			[cartId.rows[0].id]
		);
		const order = await db.query(
			'INSERT INTO orders (user_id, total, status, pi) VALUES ($1, $2, $3, $4) RETURNING id, total, status, created',
			[userId, total.rows[0].sum, 'pending', pi]
		);
		const orderItems = cartItems.rows.map((item) => {
			return db.query(
				'INSERT INTO orders_items (order_id, product_id, quantity, status) VALUES ($1, $2, $3, $4)',
				[order.rows[0].id, item.product_id, item.quantity, 'pending']
			);
		});
		// clear cart
		await db.query('DELETE FROM carts_items WHERE cart_id = $1', [
			cartId.rows[0].id,
		]);

		return order.rows[0];
	},
	paymentProcessed: async (paymentIntent) => {
		console.log(paymentIntent);
		console.log(typeof paymentIntent);
		await db.query('UPDATE orders SET status = $1 WHERE pi = $2', [
			'paid',
			`${paymentIntent}`,
		]);
	},
};
