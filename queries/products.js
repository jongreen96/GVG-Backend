const db = require('../db');

module.exports = {
	getAllProducts: async (query) => {
		let queryStr = 'SELECT id, name, price, description, category, type, images FROM products';

		// Add query parameters if they exist
		if (Object.keys(query).length > 0) {
			queryStr += ' WHERE';
			for (const key in query) {
				if (query.hasOwnProperty(key)) {
					if (['id', 'otherProperties'].includes(key)) continue;
					queryStr += ` ${key} = '${query[key]}' AND`;
				}
			}
			queryStr = queryStr.slice(0, -4);
		}

		const result = await db.query(queryStr);
		if (result.rows.length === 0) throw new Error('No products found');
		let products = [];
		result.rows.map((product) => {
			products.push(product);
		});
		return products;
	},
	getProductById: async (id) => {
		const result = await db.query('SELECT name, price, description, category, type, images FROM products WHERE id = $1', [id]);
		if (result.rows.length === 0) throw new Error('No product found');
		return result.rows[0];
	},
	createProduct: async (product) => {
		const result = await db.query('INSERT INTO products (name, price, description, category, type, images, download_link) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING name, price, description, category, type, images, download_link', [product.name, product.price, product.description, product.category, product.type, product.images, product.download_link]);
		if (result.rows.length === 0) throw new Error('Error creating product');
		return result.rows[0];
	},
	updateProduct: async (id, product) => {
		let queryStr = 'UPDATE products SET modified = now(), ';
		const values = [];
		let i = 1;

		for (const key in product) {
			if (product.hasOwnProperty(key)) {
				if (['id', 'otherProperties'].includes(key)) continue;
				queryStr += `${key} = $${i}, `;
				values.push(product[key]);
				i++;
			}
		}
		queryStr = queryStr.slice(0, -2);
		queryStr += ' WHERE id = $' + i + ' RETURNING name, price, description, category, type, images';
		values.push(id);
		const updatedproduct = await db.query(queryStr, values);
		if (updatedproduct.rows.length === 0) throw new Error('Error updating product');
		return updatedproduct.rows[0];
	},
	deleteProduct: async (id) => {
		const product = await db.query('SELECT * FROM products WHERE id = $1', [id]);
		if (product.rows.length === 0) throw new Error('No product found');
		const result = await db.query('DELETE FROM products WHERE id = $1', [id]);
		return {
			message: 'Product deleted',
		};
	},
};
