export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "admin",
    database: process.env.DATABASE_DB || "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});
