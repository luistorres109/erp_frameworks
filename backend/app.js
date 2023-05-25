process.env.TZ = 'America/Sao_Paulo';

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "./src/routes.js";

import dotenv from "dotenv";
dotenv.config();

import sequelize from "#SEQUELIZE";
import Logger from "#MIDDLEWARE/Logger.js";

(async () => {
   console.log(new Date().toString())

   console.log("Ambiente: " + process.env.NODE_ENV + "\n")

   sequelize.createConnection();

   var app = express();

   app.use(bodyParser.json());

   app.use(cors());

   app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
   });
   app.disable('x-powered-by')

   app.use(Logger);

   app.use(routes);

   const port = process.env.PORT | 3003;

   app.listen(port, () => {
      console.log('Backend executando... port:' + port)
   })
})();

