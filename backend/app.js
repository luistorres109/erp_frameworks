process.env.TZ = 'America/Sao_Paulo';

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes.js";

import dotenv from "dotenv";
import sqlz from "#SQLZ";
dotenv.config();


(async () => {
   console.log(new Date().toString() + "\n")
   console.log("Ambiente: " + process.env.NODE_ENV + "\n")

   try {
      await sqlz.authenticate();
      console.log("Autenticado!\n");
   } catch (erro) {
      console.error(erro);
      return;
   }

   var app = express();


   app.use(bodyParser.json());
   app.use(cors())
   app.disable('x-powered-by')

   app.use(routes);

   const port = process.env.PORT | 3003;

   app.listen(port, () => {
      console.log('Backend executando... port:' + port)
   })
})();

