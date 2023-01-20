const { isAdmin } = require('../loaders/middleware');
const productQueries = require('../queries/products');

module.exports = (app) => {
	// ------------------- GET ------------------- //
	// Get all products
	app.get('/products', async (req, res) => {
		try {
			const result = await productQueries.getAllProducts(req.query);
			res.send(result);
		} catch (err) {
			res.status(404).send({ message: err.message });
		}
	});

	// Get product by id
	app.get('/products/:id', async (req, res) => {
		try {
			const result = await productQueries.getProductById(req.params.id);
			res.send(result);
		} catch (err) {
			res.status(404).send({ message: err.message });
		}
	});

	// ------------------- POST ------------------- //
	// Create new product
	app.post('/products', isAdmin, async (req, res) => {
		try {
			const result = await productQueries.createProduct(req.body);
			res.send(result);
		} catch (err) {
			err.column
				? res.status(400).send({ message: `Missing input: ${err.column}` })
				: res.status(500).send({ message: err.message });
		}
	});

	// ------------------- PUT ------------------- //
	// Update product
	app.put('/products/:id', isAdmin, async (req, res) => {
		try {
			const result = await productQueries.updateProduct(req.params.id, req.body);
			res.send(result);
		} catch (err) {
			console.log(err);
			err.column
				? res.status(400).send({ message: `${err.column} does not exist` })
				: res.status(500).send({ message: err.message });
		}
	});

	// ------------------- DELETE ------------------- //
	// Delete product
	app.delete('/products/:id', isAdmin, async (req, res) => {
		try {
			const result = await productQueries.deleteProduct(req.params.id);
			res.send(result);
		} catch (err) {
			res.status(404).send({ message: err.message });
		}
	});
};
