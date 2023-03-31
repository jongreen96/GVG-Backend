const db = require('../db');

module.exports = {
	getAllOrdersByUserId: async (userId) => {
		const result = await db.query(
			`SELECT orders.id, orders.status, orders.total, orders.created, orders_items.quantity,
			products.id AS product_id, products.name, products.price, products.download_link, products.images
			FROM orders 
			JOIN orders_items ON orders.id = orders_items.order_id 
			JOIN products ON orders_items.product_id = products.id 
			WHERE user_id = $1 
			ORDER BY orders.created DESC;`,
			[userId]
		);
		if (result.rows.length === 0) throw new Error('No orders found');
		const orders = [];
		result.rows.forEach((row) => {
			const order = orders.find((o) => o.id === row.id);
			if (order) {
				order.items.push({
					product_id: row.product_id,
					quantity: row.quantity,
					name: row.name,
					price: row.price,
					download_link: row.download_link,
					images: row.images,
					status: row.status,
				});
			} else {
				orders.push({
					id: row.id,
					status: row.status,
					total: row.total,
					created: row.created,
					items: [
						{
							product_id: row.product_id,
							quantity: row.quantity,
							name: row.name,
							price: row.price,
							download_link: row.download_link,
							images: row.images,
							status: row.status,
						},
					],
				});
			}
		});
		return orders;
	},
	getOrderById: async (orderId) => {
		const order = await db.query('SELECT id, status, total, created FROM orders WHERE id = $1', [orderId]);
		if (order.rows.length === 0) throw new Error('No order found');
		const orderItems = await db.query('SELECT product_id, quantity, status FROM orders_items WHERE order_id = $1', [orderId]);
		order.rows[0].items = orderItems.rows;
		return order.rows[0];
	},
};
