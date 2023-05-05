import { ValidadarSeExiste } from "#VALIDADORES";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DBUser } from "#MODELS/DBUser.js";

export default async (req, res) => {
   try {
      const b64auth = (req.headers.authorization || '').split(' ')[1] || '';

      const [usuario, senha] = Buffer.from(b64auth, 'base64').toString().split(':');

      const user = await DBUser.findOne({
         where: {
            login: usuario,
         }
      });

      if (!ValidadarSeExiste(user)) {
         throw "Usuario ou senha invalido";
      }

      const match = await bcrypt.compare(senha, user.password);

      if (match) {
         const token = Jwt.sign({ userUUID: user.uuid, userName: user.name },
            process.env.JWT_SECRET_KEY, { expiresIn: "8h", algorithm: 'HS256' });

         return res.send({ token });
      } else {
         throw "Usuario ou senha invalido";
      }

   } catch (err) {
      return res.status(400).send({ msg: err });
   }
}
