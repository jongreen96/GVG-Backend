module.exports = {
	PORT: process.env.PORT,
	DB: {
		PGHOST: process.env.PGHOST,
		PGUSER: process.env.PGUSER,
		PGDATABASE: process.env.PGDATABASE,
		PGPASSWORD: process.env.PGPASSWORD,
		PGPORT: process.env.PGPORT,
		DATABASE_URL: process.env.DATABASE_URL,
	},
	SESSION_SECRET: process.env.SESSION_SECRET,
};
