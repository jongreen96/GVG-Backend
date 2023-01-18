const db = require('../db');

module.exports = {
	getAllOrdersByUserId: async (userId) => {
		const result = await db.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
		return result.rows;
	},
	getOrderById: async (orderId) => {
		const order = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
		const orderItems = await db.query('SELECT * FROM orders_items WHERE order_id = $1', [
			orderId,
		]);
		order.items = orderItems.rows;
		return order;
	},
};
