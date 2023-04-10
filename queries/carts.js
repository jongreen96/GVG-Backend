const db = require('../db');

module.exports = {
	getCartByUserId: async (id) => {
		// Get cart
		const cart = await db.query('SELECT id, user_id FROM carts WHERE user_id = $1', [id]);
		if (cart.rows.length > 0) {
			// Get cart items
			const cartItems = await db.query(
				'SELECT product_id, name, price, quantity, images FROM carts_items JOIN products ON carts_items.product_id = products.id WHERE cart_id = $1',
				[cart.rows[0].id]
			);
			cart.rows[0].items = cartItems.rows;
			return cart.rows[0];
		} else {
			// Create new cart
			const newCart = await db.query(
				'INSERT INTO carts (user_id) VALUES ($1) RETURNING id, user_id',
				[id]
			);
			newCart.rows[0].items = [];
			return newCart.rows[0];
		}
	},
	addItemToCart: async (id, item) => {
		// Get cart
		const cart = await db.query('SELECT * FROM carts WHERE user_id = $1', [id]);
		if (!cart.rows[0]) return { error: 'Cart not found' };
		// Check if item already exists in cart
		const existingItem = await db.query(
			'SELECT * FROM carts_items WHERE cart_id = $1 AND product_id = $2',
			[cart.rows[0].id, item.product_id]
		);
		if (existingItem.rows.length > 0) {
			// Update quantity
			const updatedItem = await db.query(
				'UPDATE carts_items SET modified = NOW(), quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING product_id, quantity',
				[item.quantity, cart.rows[0].id, item.product_id]
			);
			return updatedItem.rows[0];
		} else {
			// Create new item
			const newItem = await db.query(
				'INSERT INTO carts_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity',
				[cart.rows[0].id, item.product_id, item.quantity]
			);
			return newItem.rows[0];
		}
	},
	updateItemInCart: async (id, item) => {
		// Get cart
		const cart = await db.query('SELECT * FROM carts WHERE user_id = $1', [id]);
		if (!cart.rows[0]) return null;
		// Update item
		const updatedItem = await db.query(
			'UPDATE carts_items SET modified = NOW(), quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING product_id, quantity',
			[item.quantity, cart.rows[0].id, item.product_id]
		);
		return updatedItem.rows[0];
	},
	removeItemFromCart: async (id, item) => {
		// Get cart
		const cart = await db.query('SELECT * FROM carts WHERE user_id = $1', [id]);
		if (!cart.rows[0]) return { error: 'Cart not found' };
		// Remove item
		const removedItem = await db.query(
			'DELETE FROM carts_items WHERE cart_id = $1 AND product_id = $2 RETURNING product_id',
			[cart.rows[0].id, item.product_id]
		);
		return removedItem.rows[0];
	},
	removeAllItemsFromCart: async (id) => {
		// Get cart
		const cart = await db.query('SELECT * FROM carts WHERE user_id = $1', [id]);
		if (!cart.rows[0]) return { error: 'Cart not found' };
		// Remove all items
		const removedItems = await db.query('DELETE FROM carts_items WHERE cart_id = $1', [
			cart.rows[0].id,
		]);
		return removedItems.rows;
	},
};
