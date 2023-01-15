const db = require('../db');

module.exports = {
	getAllProducts: async () => {
		const result = await db.query('SELECT * FROM products');
		return result.rows;
	},
	getProductById: async (id) => {
		const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
		return result.rows[0];
	},
	createProduct: async (product) => {
		const result = await db.query(
			'INSERT INTO products (name, price, description, type, images, download_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[
				product.name,
				product.price,
				product.description,
				product.type,
				product.images,
				product.download_link,
			]
		);
		return result.rows[0];
	},
	updateProduct: async (id, product) => {
		let queryStr = 'UPDATE products SET ';
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
		queryStr += ' WHERE id = $' + i + ' RETURNING *';
		values.push(id);
		const updatedproduct = await db.query(queryStr, values);
		return updatedproduct.rows[0];
	},
	deleteProduct: async (id) => {
		const result = await db.query('DELETE FROM products WHERE id = $1', [id]);
		return result.rows[0];
	},
};
