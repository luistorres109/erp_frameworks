import { DBPermission } from "#MODELS/DBPermission.js";
import { DBUser } from "#MODELS/DBUser.js";
import { DBUserPermission } from "#MODELS/DBUserPermission.js";
import { ExisteError, NotExisteError } from "#VALIDADORES";
import { request, response } from "express";
import { verify } from "jsonwebtoken";

export default async (req = request, res = response, next) => {
   try {
      if (process.env.NODE_ENV == "development") {
         const user = await DBUser.findOne({
            attributes: ['uuid', 'name'],
            where: { login: 'admin' }
         });

         req.userUUID = user.uuid;
         req.userName = user.name;

         try {
            await validarAcesso(req)
         } catch (e) {
            console.error(e)
            return res.status(403).send({ msg: e });
         }
         return next();
      }

      let { authorization } = req.headers;

      NotExisteError(authorization, "Necessario autenticação!");

      authorization = authorization.replace("Bearer ", "");

      verify(authorization, process.env.JWT_SECRET_KEY, (err, decoded) => {
         ExisteError(err, "Token invalido!");
         req.userUUID = decoded.userUUID;
         req.userName = decoded.userName;
      });

      try {
         await validarAcesso(req)
      } catch (e) {
         return res.status(403).send({ msg: e });
      }

      next();
   } catch (err) {
      console.error(err)
      return res.status(401).send({ msg: err });
   }
}

async function validarAcesso(req = request) {
   const { userUUID: uuid, method } = req;
   let path = req.route.path;
   if (path == "/api/login/verify") {
      return true;
   }
   if (path.includes("/:")) {
      path = path.split("/:")[0];
   }

   if (method != "GET" && method != "POST" && method != "PUT" && method != "DELETE") {
      throw "Metodo de requisição invalido!"
   }

   const permission = await DBUserPermission.findOne({
      attributes: ['query', 'register', 'edit', 'delete'],
      where: { user_uuid: uuid }, include: [
         {
            model: DBPermission,
            where: { path }
         }
      ]
   });

   NotExisteError(permission, "Usuário sem permissão para ação");

   if (method == "GET" && !permission.query) {
      throw "Usuário sem permissão para ação";
   } else if (method == "POST" && !permission.register) {
      throw "Usuário sem permissão para ação";
   } else if (method == "PUT" && !permission.edit) {
      throw "Usuário sem permissão para ação";
   } else if (method == "DELETE" && !permission.delete) {
      throw "Usuário sem permissão para ação";
   }

}