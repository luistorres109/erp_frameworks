import { DBUser } from "#MODELS/DBUser.js";
import { Exist, ExisteError, NotExisteError } from "#VALIDADORES";
import { v4 } from 'uuid';

import bcrypt from "bcrypt";
import { DBOffice } from "#MODELS/DBOffice.js";
import { request, response } from "express";
import { DBUserPermission } from "#MODELS/DBUserPermission.js";
import { DBPermission } from "#MODELS/DBPermission.js";
import { DBOfficePermissions } from "#MODELS/DBOfficePermission.js";
import { LoggerError } from "#MIDDLEWARE/Logger.js";


async function query(req = request, res = response) {
   let users = await DBUser.findAll({
      attributes: ['uuid', 'name'], where: {
         isinactive: false
      },
      include: {
         model: DBUserPermission,
         attributes: ['register', 'edit', 'query', 'delete'],
         include: {
            model: DBPermission,
            attributes: ['id', 'name'],
         }
      }
   });
   return res.send(users);
}

async function register(req = request, res = response) {
   try {
      let { name, office_id, login, password, permissions = [] } = req.body;

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
      const user = await DBUser.create({ uuid, name, office_id, login, password });

      const officepermission = await DBOfficePermissions.findAll({
         attributes: [
            'permission_id',
            'query',
            'register',
            'edit',
            'delete'
         ], where: { office_id }
      });

      await Promise.all(officepermission.map(async (perm) => {
         await DBUserPermission.create({ user_uuid: uuid, permission_id: perm.permission_id, query: perm.query, edit: perm.edit, register: perm.register, delete: perm.delete });
      }));

      if (Exist(permissions)) {
         await Promise.all(permissions.map(async (perm) => {
            const permission = await DBUserPermission.findOne({ where: { user_uuid: uuid, permission_id: perm.permission_id } });
            if (Exist(permission)) {
               await permission.update({ query: perm.query, edit: perm.edit, register: perm.register, delete: perm.delete }, { where: { user_uuid: uuid, permission_id: perm.permission_id } });
            } else {
               await DBUserPermission.create({ user_uuid: uuid, permission_id: perm.permission_id, query: perm.query, edit: perm.edit, register: perm.register, delete: perm.delete });
            }
         }));
      }

      return res.status(201).send({ uuid });
   } catch (err) {
      LoggerError(req.logger_id, err);
      return res.status(400).send({ msg: err });
   }
}

async function edit(req = request, res = response) {
   const { uuid } = req.params;
   const { permission, isinactive = null } = req.body;

   try {
      const user = await DBUser.findByPk(uuid);

      if (isinactive != null) {
         await user.update({ isinactive });
      }

      if (Exist(permission)) {
         await DBUserPermission.destroy({ where: { user_uuid: uuid } });
         await Promise.all(permissions.map(async (perm) => {
            await DBUserPermission.create({ user_uuid: uuid, permission_id: perm.permission_id, query: perm.query, edit: perm.edit, register: perm.register, delete: perm.delete });
         }));
      }
      return res.send();

   } catch (e) {
      LoggerError(req.logger_id, e);
      return res.status(400).send({ error: e });
   }

}

export default { query, register, edit }