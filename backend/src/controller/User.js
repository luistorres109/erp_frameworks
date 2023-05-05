import { DBUser } from "#MODELS/DBUser.js";
import { ExisteError, NotExisteError } from "#VALIDADORES";
import { v4 } from 'uuid';

import bcrypt from "bcrypt";
import { DBOffice } from "#MODELS/DBOffice.js";
import { request, response } from "express";


async function query(req = request, res = response) {

   let users = await DBUser.findAll({
      attributes: ['uuid', 'name'], where: {
         isinactive: false
      }
   });

   return res.send(users);
}

async function register(req = request, res = response) {
   try {
      let { name, office_id, login, password } = req.body;

      NotExisteError(name, "Nome não informado");

      NotExisteError(office_id, "Cargo não informado");

      NotExisteError(login, "Login para acesso não informado");

      NotExisteError(password, "Senha para acesso não informado");

      const offc = await DBOffice.findByPk(office_id);

      NotExisteError(offc, "Cargo não encontrado");

      const extuser = await DBUser.findOne({
         attributes: ['login'],
         where: {
            login
         }
      });

      ExisteError(extuser, "Usuario ja cadastrado")

      password = await bcrypt.hash(password, 10);

      const uuid = v4();
      await DBUser.create({ uuid, name, office_id, login, password });

      return res.status(201).send({ uuid });
   } catch (err) {
      console.error(err)
      return res.status(400).send({ msg: err });
   }
}

async function edit(req = request, res = response) {
   let { id } = req.params;
   let { permission } = req.body;
   try {



   } catch (e) {
      return res.status(400).send({ error: e });
   }

}

export default { query, register }