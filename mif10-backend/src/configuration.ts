export default () => ({
  port: parseInt(process.env.PORT, 10),
  db: {
    username: process.env.DATABASE_USERNAME || "",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_DB || "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  },
  pwd: {
    pepper: process.env.PWD_PEPPER || "yazeghazyebaznc",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "ayeaebycnazecba"
  }
});
