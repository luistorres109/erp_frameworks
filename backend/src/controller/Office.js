import { LoggerError } from "#MIDDLEWARE/Logger.js";
import { DBOffice } from "#MODELS/DBOffice.js";
import { NotExisteError, Exist } from "#VALIDADORES";
import { request, response } from "express";


async function query(req = request, res = response) {
    try {
        const offic = await DBOffice.findAll({
            where: {
                isinactive: false
            }
        });
        return res.send(offic);
    } catch (e) {
        LoggerError(req.logger_id, e)
        return res.status(400).send({ msg: "Erro ao buscar todos os cargos" })
    }
}

async function register(req = request, res = response) {
    try {
        let { name, isinactive = false } = req.body;

        NotExisteError(name, "Nome não informado");

        try {
            const offic = await DBOffice.create({ name, isinactive });
            return res.status(201).send(offic);
        } catch (db) {
            LoggerError(req.logger_id, db)
            throw "Erro ao salvar novo cargo!"
        }
    } catch (e) {
        LoggerError(req.logger_id, e)
        return res.status(400).send({ msg: e });
    }
}
async function edit(req = request, res = response) {
    try {
        let { name, isinactive = null } = req.body;

        let { id } = req.params;

        NotExisteError(id, "Cargo invalido");

        let offic;
        try {
            offic = await DBOffice.findByPk(id);
        } catch (dbe) {
            console.error(dbe);
            throw "Cargo não encontrado!"
        }

        NotExisteError(offic, "Cargo não encontrado");

        const alter = {};

        if (Exist(name)) {
            alter.name = name
        }

        if (isinactive != null) {
            alter.isinactive = isinactive
        }


        try {
            if (Exist(alter)) {
                await DBOffice.update(alter, { where: { id } });
            }

            return res.send();
        } catch (db) {
            LoggerError(req.logger_id, db)
            throw "Erro ao salvar novo cargo!"
        }
    } catch (e) {
        LoggerError(req.logger_id, e)
        return res.status(400).send({ msg: e });
    }
}

export default { query, register, edit }