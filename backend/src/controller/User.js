import DBuser from "#MODELS/DBuser.js";
import { ExisteError, NotExisteError } from "#VALIDADORES";
import { v4 } from 'uuid';

import bcrypt from "bcrypt";
import DBoffice from "#MODELS/DBoffice.js";

const query = async (req, res) => {

   let users = await DBuser.findAll({ attributes: ['user_uuid', 'user_name'] });

   return res.send(users);
}

const register = async (req, res) => {
   try {
      let { user_name, user_id_office, user_login, user_password } = req.body;

      NotExisteError(user_name, "Nome não informado");

      NotExisteError(user_id_office, "Cargo não informado");

      NotExisteError(user_login, "Login para acesso não informado");

      NotExisteError(user_password, "Senha para acesso não informado");

      const offc = await DBoffice.findByPk(user_id_office);

      NotExisteError(offc, "Cargo não encontrado");

      const extuser = await DBuser.findOne({
         where: {
            user_login
         }
      });

      ExisteError(extuser, "Usuario ja cadastrado")

      user_password = await bcrypt.hash(user_password, 10);

      const user_uuid = v4();
      await DBuser.create({ user_uuid, user_name, user_id_office, user_login, user_password });

      return res.status(201).send({ user_uuid });
   } catch (err) {
      console.error(err)
      return res.status(400).send({ msg: err });
   }
}

export default { query, register };