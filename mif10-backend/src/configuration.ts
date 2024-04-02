export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    type: 'postgres',
    synchronize: true,
    username: process.env.DATABASE_USERNAME || "admin",
    password: process.env.DATABASE_PASSWORD || "admin",
    database: process.env.DATABASE_DB || "flightsdb",
    host: process.env.DATABASE_HOST || "192.168.75.63",
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});
