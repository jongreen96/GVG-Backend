const db = require('../db');

module.exports = {
	getAllOrdersByUserId: async (userId) => {
		const result = await db.query(
			'SELECT id, status, total, created FROM orders WHERE user_id = $1',
			[userId]
		);
		if (result.rows.length === 0) throw new Error('No orders found');
		return result.rows;
	},
	getOrderById: async (orderId) => {
		const order = await db.query(
			'SELECT id, status, total, created FROM orders WHERE id = $1',
			[orderId]
		);
		if (order.rows.length === 0) throw new Error('No order found');
		const orderItems = await db.query(
			'SELECT product_id, quantity, status FROM orders_items WHERE order_id = $1',
			[orderId]
		);
		order.rows[0].items = orderItems.rows;
		return order.rows[0];
	},
};
