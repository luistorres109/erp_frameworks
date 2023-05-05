import { DBOffice } from "#MODELS/DBOffice.js";
import { NotExisteError, ValidadarSeExiste } from "#VALIDADORES";
import { request, response } from "express";


async function query(req = request, res = response) {
    const offic = await DBOffice.findAll({
        where: {
            isinactive: false
        }
    });
    return res.status(200).send(offic);
}

async function register(req = request, res = response) {
    try {
        let { name, isinactive = false } = req.body;

        NotExisteError(name, "Nome não informado");

        try {
            const offic = await DBOffice.create({ name, isinactive });
            return res.status(201).send(offic);
        } catch (db) {
            console.error(db);
            throw "Erro ao salvar novo cargo!"
        }
    } catch (e) {
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

        if (ValidadarSeExiste(name)) {
            alter.name = name
        }

        if (isinactive != null) {
            alter.isinactive = isinactive
        }


        try {
            if (ValidadarSeExiste(alter)) {
                await DBOffice.update(alter, { where: { id } });
            }

            return res.send();
        } catch (db) {
            console.error(db);
            throw "Erro ao salvar novo cargo!"
        }
    } catch (e) {
        return res.status(400).send({ msg: e });
    }
}

export default { query, register, edit }