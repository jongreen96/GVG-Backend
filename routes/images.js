module.exports = (app) => {
	app.get('/images/:image', (req, res) => {
		const { image } = req.params;
		res.sendFile(image, {
			root: './public/images',
		});
	});
};
