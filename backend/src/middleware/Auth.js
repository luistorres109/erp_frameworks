import { ExisteError, NotExisteError } from "#VALIDADORES";
import { request, response } from "express";
import { verify } from "jsonwebtoken";

export default async (req = request, res = response, next) => {
   try {

      let { authorization } = req.headers;

      NotExisteError(authorization, "Necessario autenticação!");

      authorization = authorization.replace("Bearer ", "");

      verify(authorization, process.env.JWT_SECRET_KEY, (err, decoded) => {
         ExisteError(err, "Token invalido!");
         req.userId = decoded.userUUID;
         req.userName = decoded.userName;
      });

      next();
   } catch (err) {
      console.error(err)
      return res.status(401).send({ msg: err });
   }
}