const ordersQuery = require('../queries/orders');

module.exports = (app) => {
	app.get('/images/:image', (req, res) => {
		const { image } = req.params;
		res.sendFile(image, {
			root: './public/images',
		});
	});

	app.get('/download/:file', async (req, res) => {
		const { file } = req.params;
		const userId = req.user ? req.user.id : null;
		try {
			const result = await ordersQuery.ownsProduct(userId, file);
			if (result || userId === 1) {
				res.download(`./downloads/${file}`);
			} else {
				res
					.status(401)
					.send(
						'Please log into greenvinylgraphics.com to download this file.'
					);
			}
		} catch (err) {
			res.status(500).send(err.message);
		}
	});
};
