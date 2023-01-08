const { Client } = require('pg');
const { DB } = require('./config');

(async () => {
	const usersTable = `
    CREATE TABLE users (
        id              SERIAL          PRIMARY KEY,
        email           VARCHAR(100)    UNIQUE NOT NULL,
        password        VARCHAR(255)    NOT NULL,
        username        VARCHAR(50)     UNIQUE,
        first_name      VARCHAR(50)     NOT NULL,
        last_name       VARCHAR(50)     NOT NULL,
        address         VARCHAR(255),
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp       DEFAULT CURRENT_TIMESTAMP
    );
    `;

	const productsTable = `
    CREATE TABLE products (
        id              SERIAL          PRIMARY KEY,
        name            VARCHAR(100)    UNIQUE NOT NULL,
        price           NUMERIC,
        description     TEXT            NOT NULL,
        type            VARCHAR(50)     NOT NULL,
        images          TEXT[]          NOT NULL,
        download_link   VARCHAR(255),
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp       DEFAULT CURRENT_TIMESTAMP
    );
    `;

	const cartsTable = `
    CREATE TABLE carts (
        id              SERIAL          PRIMARY KEY,
        total           NUMERIC,
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp       DEFAULT CURRENT_TIMESTAMP
    );
    `;

	const ordersTable = `
    CREATE TABLE orders (
        id              SERIAL          PRIMARY KEY,
        user_id         INTEGER         REFERENCES users(id) NOT NULL,
        status          VARCHAR(50)     NOT NULL,
        total           NUMERIC,
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp       DEFAULT CURRENT_TIMESTAMP
    );
    `;

	const reviewsTable = `
    CREATE TABLE reviews (
        id              SERIAL          PRIMARY KEY,
        product_id      INTEGER         REFERENCES products(id) NOT NULL,
        user_id         INTEGER         REFERENCES users(id) NOT NULL,
        score           INTEGER         NOT NULL,
        description     TEXT,
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp       DEFAULT CURRENT_TIMESTAMP
    );
    `;

	const ordersItemsTable = `
    CREATE TABLE orders_items (
        id              SERIAL          PRIMARY KEY,
        order_id        INTEGER         REFERENCES orders(id) NOT NULL,
        product_id      INTEGER         REFERENCES products(id) NOT NULL,
        quantity        INTEGER         NOT NULL,
        status          VARCHAR(50)     NOT NULL,
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp       DEFAULT CURRENT_TIMESTAMP
    );
    `;

	const cartsItemsTable = `
    CREATE TABLE carts_items (
        id              SERIAL          PRIMARY KEY,
        product_id      INTEGER         REFERENCES products(id) NOT NULL,
        cart_id         INTEGER         REFERENCES carts(id) NOT NULL,
        quantity        INTEGER         NOT NULL,
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp       DEFAULT CURRENT_TIMESTAMP
    );
    `;

	try {
		const db = new Client({
			user: DB.PGUSER,
			host: DB.PGHOST,
			database: DB.PGDATABASE,
			password: DB.PGPASSWORD,
			port: DB.PGPORT,
		});

		await db.connect();

		await db.query(usersTable);
		await db.query(productsTable);
		await db.query(cartsTable);
		await db.query(ordersTable);
		await db.query(reviewsTable);
		await db.query(ordersItemsTable);
		await db.query(cartsItemsTable);

		await db.end();
	} catch (err) {
		console.log('Error creating one or more tables: ', err);
	}
})();
