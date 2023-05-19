

import "dotenv/config";
import { Sequelize } from "sequelize";

import config from "./database-env.js";
import databaseInit from "./database-init.js";

const { username, password, database, host, port, dialect } = config[process.env.NODE_ENV];

import pg from 'pg';

pg.types.setTypeParser(1082, 'text', function (text) { return text; });
pg.types.setTypeParser(1184, 'text', function (text) { return text; });
pg.types.setTypeParser(1114, 'text', function (text) { return text; });

function createConnection() {
   const sequelize = new Sequelize(
      database,
      username,
      password,
      {
         host: host,
         port: port,
         dialect: dialect,
         timezone: "America/Sao_Paulo",
         logging: process.env.NODE_ENV !== 'development' ? false : console.log,
         pool: {
            max: 50,
            min: 0,
            acquire: 30000,
            idle: 10000
         },
         define: {
            timestamps: true, // Criar coluna para data de criação e alteracao 
            underscored: true, // trabalha com padrao de associção client_id em vez de clientId 
            freezeTableName: true // Cria as tabelas com o nome definido, caso for false ele colocara em todas as tabela a letra 's' no final
         }
      },
   );

   // Inicializa os models em memoria no sequelize
   databaseInit.init(sequelize);

   (async () => {

      if (process.env.NODE_ENV == 'development') {
         await sequelize.sync({ force: false, alter: true });
         databaseInit.insertDev(sequelize);
      } else {
         await sequelize.sync({ alter: true });
      }

   })();

   return sequelize;
}



export default { createConnection };