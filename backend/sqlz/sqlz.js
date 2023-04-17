

import "dotenv/config";
import { Sequelize } from "sequelize";

import config from "./database.js";
const { username, password, database, host, port, dialect } = config[process.env.NODE_ENV];

import pg from 'pg';

pg.types.setTypeParser(1082, 'text', function (text) { return text; });
pg.types.setTypeParser(1184, 'text', function (text) { return text; });
pg.types.setTypeParser(1114, 'text', function (text) { return text; });

export default new Sequelize(
   database,
   username,
   password,
   {
      host: host,
      port: port,
      dialect: dialect,
      timezone: "America/Sao_Paulo",
      logging: process.env.NODE_ENV !== 'development' ? false : console.log,
      query: {
         raw: true
      },
      define: {
         freezeTableName: true
      }
   },
);

