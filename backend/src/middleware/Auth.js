import { ExisteError, NotExisteError } from "#VALIDADORES";

export default async (req, res, next) => {
   try {

      let { authorization } = req.headers;

      NotExisteError(authorization, "Necessario autenticação!");

      authorization = authorization.replace("Bearer ", "");

      jwt.verify(authorization, process.env.JWT_SECRET_KEY, (err, decoded) => {
         ExisteError(err, "Token invalido!");
         req.userId = decoded.userUUID;
         req.userName = decoded.userName;
      });

      next();
   } catch (err) {
      return res.status(401).send({ msg: err });
   }
}