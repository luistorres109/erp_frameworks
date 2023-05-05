import { DBPermission } from "#MODELS/DBPermission.js";
import { ExisteError, NotExisteError } from "#VALIDADORES";
import { request, response } from "express";


async function register(req = request, res = response) {
    let { name, path } = req.body;

    try {

        NotExisteError(name, "Nome da permissão não informada!");

        NotExisteError(path, "Path da permissão não informada!");

        let perm = await DBPermission.findOne({ where: { path } });

        ExisteError(perm, "Permissão ja cadastrada!");

        await DBPermission.create({ name, path });

        return res.sendStatus(201);
    } catch (e) {
        return res.status(400).send({ error: e });
    }
}

async function query(req = request, res = response) {

    try {
        let perm = await DBPermission.findAll();

        return res.status(200).send(perm);
    } catch (e) {
        return res.status(400).send({ error: e });
    }
}


export default { register, query }