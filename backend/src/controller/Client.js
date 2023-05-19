import { DBClient } from "#MODELS/DBClient.js";
import { NotExisteError, ValidarCPF } from "#VALIDADORES";
import { request, response } from "express";


async function query(req = request, res = response) {

    const client = await DBClient.findAll({
        where: { isinactive: false }
    });
    return res.status(200).json(client);
}

async function register(req = request, res = response) {
    try {
        let { name, document, phone, address, district, city, state, num_address, cep, isinactive = null } = req.body;

        NotExisteError(name, "Nome não informado");
        NotExisteError(document, "Documento não informado");
        ValidarCPF(document, "Documento invalido")

        try {
            const cli = await DBClient.create({ name, document, phone, address, district, city, state, num_address, cep, isinactive });
            return res.status(201).json(cli);
        } catch (db) {
            console.error(db);
            throw "Erro ao salvar novo cliente!"
        }
    } catch (e) {
        console.error(e);
        return res.status(400).send({ msg: e });
    }
}

async function edit(req = request, res = response) {
    try {
        let { name, description, barcode, medida, price, isinactive = null } = req.body;

        let { id } = req.params;

        NotExisteError(id, "Produto não informado");

        let prod;
        try {
            prod = await DBProduct.findByPk(id);
        } catch (dbe) {
            console.error(dbe);
            throw "Produto não encontrado!"
        }

        NotExisteError(prod, "Produto não encontrado");

        const alter = {};

        if (ValidadarSeExiste(name)) {
            alter.name = name
        }
        if (ValidadarSeExiste(description)) {
            alter.description = description
        }
        if (ValidadarSeExiste(barcode)) {
            alter.barcode = barcode
        }
        if (ValidadarSeExiste(medida)) {
            const option = (await DBOption.findOne({
                where: { id: medida },
                include: [{
                    model: DBOptionLocation,
                    as: 'location',
                    attributes: ['name'],
                }],
            })).toJSON();

            if (option.location.name != "produc") {
                throw "Medida invalida!"
            }

            alter.medida = medida
        }
        if (ValidadarSeExiste(price)) {
            alter.price = price
        }

        if (isinactive != null) {
            alter.isinactive = isinactive
        }

        try {
            if (ValidadarSeExiste(alter)) {
                await DBProduct.update(alter, { where: { id } });
            }

            return res.send();
        } catch (db) {
            console.error(db);
            throw "Erro ao salvar produto!"
        }
    } catch (e) {
        return res.status(400).send({ msg: e });
    }
}

export default { query, register, edit }