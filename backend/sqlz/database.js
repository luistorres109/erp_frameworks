import "dotenv/config";

export default {
  development: {
    username: process.env.DEV_USER_SEQ,
    password: process.env.DEV_PASSWORD_SEQ,
    database: process.env.DEV_DATABASE_SEQ,
    host: process.env.DEV_HOST_SEQ,
    port: process.env.DEV_PORT_SEQ,
    dialect: process.env.DEV_DIALECT_SEQ
  },
  production: {
    username: process.env.USER_SEQ,
    password: process.env.PASSWORD_SEQ,
    database: process.env.DATABASE_SEQ,
    host: process.env.HOST_SEQ,
    port: process.env.PORT_SEQ,
    dialect: process.env.DIALECT_SEQ
  }
}
