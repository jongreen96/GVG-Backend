const authQuery = require('../queries/auth');

module.exports = (app, passport) => {
    // ------------------- POST ------------------- //
    // Register new user
    app.post('/register', async (req, res) => {
        try {
            const result = await authQuery.register(req.body);
            res.send(result);
        } catch (error) {
            res.status(400).send({ message: 'User not created' });
        }
    });

    // Login user
    app.post('/login', async (req, res) => {
            const result = await authQuery.login(req.body.email, req.body.password);
            if (result.error) return res.status(400).send({ message: result.error });
            req.session.authenticated = true;
            req.session.user = result;
            console.log(req.session);
            res.send(result);
    });
}