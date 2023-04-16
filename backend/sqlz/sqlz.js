

import "dotenv/config";
import { Sequelize } from "sequelize";

import config from "./database.js";
const { username, password, database, host, port, dialect } = config[process.env.NODE_ENV];

export default new Sequelize(
   database,
   username,
   password,
   {
      host: host,
      port: port,
      dialect: dialect,
      timezone: "-03:00",
      logging: process.env.NODE_ENV !== 'development' ? false : console.log,
      query: {
         raw: true
      }
   },
);

