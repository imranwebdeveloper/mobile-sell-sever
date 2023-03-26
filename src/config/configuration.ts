export const configuration = {
  jwt: process.env.SECRETE,
};
export default () => ({
  port: parseInt(process.env.PORT) || 3001,
  database: {
    host: process.env.DB,
    // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  JWT_SECRETE: process.env.SECRETE,
});
