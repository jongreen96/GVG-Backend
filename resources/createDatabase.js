const { Client } = require('pg');
const { DB } = require('../config');

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
        modified        timestamp
    );
    `;

	const productsTable = `
    CREATE TABLE products (
        id              SERIAL          PRIMARY KEY,
        name            VARCHAR(100)    UNIQUE NOT NULL,
        price           NUMERIC         NOT NULL,
        description     TEXT            NOT NULL,
        category        VARCHAR(50)     NOT NULL,
        type            VARCHAR(50)     NOT NULL,
        images          TEXT[]          NOT NULL,
        download_link   VARCHAR(255),
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp
    );
    `;

	const cartsTable = `
    CREATE TABLE carts (
        id              SERIAL          PRIMARY KEY,
        user_id         INTEGER         REFERENCES users(id) NOT NULL,
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp
    );
    `;

	const ordersTable = `
    CREATE TABLE orders (
        id              SERIAL          PRIMARY KEY,
        user_id         INTEGER         REFERENCES users(id) NOT NULL,
        status          VARCHAR(50)     NOT NULL,
        total           NUMERIC,
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp
    );
    `;

	const reviewsTable = `
    CREATE TABLE reviews (
        id              SERIAL          PRIMARY KEY,
        product_id      INTEGER         REFERENCES products(id) NOT NULL,
        user_id         INTEGER         REFERENCES users(id) NOT NULL,
        score           INTEGER         NOT NULL,
        description     TEXT,
        images          TEXT[],
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp
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
        modified        timestamp
    );
    `;

	const cartsItemsTable = `
    CREATE TABLE carts_items (
        id              SERIAL          PRIMARY KEY,
        product_id      INTEGER         REFERENCES products(id) NOT NULL,
        cart_id         INTEGER         REFERENCES carts(id) NOT NULL,
        quantity        INTEGER         NOT NULL,
        created         timestamp       DEFAULT CURRENT_TIMESTAMP,
        modified        timestamp
    );
    `;

	const sessionsTable = `
    CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);
    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
    CREATE INDEX "IDX_session_expire" ON "session" ("expire");
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
		await db.query(sessionsTable);

		await db.end();
	} catch (err) {
		console.log('Error creating one or more tables: ', err);
	}
})();
