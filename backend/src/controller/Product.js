import { LoggerError } from "#MIDDLEWARE/Logger.js";
import { DBOption } from "#MODELS/DBOption.js";
import { DBOptionLocation } from "#MODELS/DBOptionLocation.js";
import { DBProduct } from "#MODELS/DBProduct.js";
import { NotExisteError, Exist } from "#VALIDADORES";
import { request, response } from "express";


async function query(req = request, res = response) {

    const prod = await DBProduct.findAll({
        where: { isinactive: false },
        include: [
            {
                model: DBOption,
                as: "unmedida",
                attributes: ['id', 'value']
            }
        ]
    });
    return res.send(prod);
}

async function register(req = request, res = response) {
    try {
        let { name, description, barcode, medida, price = 0, isinactive = false } = req.body;

        NotExisteError(name, "Nome não informado");
        NotExisteError(description, "Descrição não informada");
        NotExisteError(barcode, "Código de barras não informada");
        NotExisteError(medida, "Medida não informada");

        const option = (await DBOption.findOne({
            where: { id: medida },
            include: [{
                model: DBOptionLocation,
                as: 'location',
                attributes: ['name'],
            }],
        })).toJSON();

        NotExisteError(option, "Medida não existe");

        if (option.location.name != 'product') {
            throw "Medida invalida para produtos";
        }

        try {
            let p = await DBProduct.create({ name, description, barcode, price, medida, isinactive });
            const prod = await DBProduct.findByPk(p.id, {
                attributes: { exclude: ['medida'] },
                include: [{
                    model: DBOption,
                    as: "unmedida",
                    attributes: ['id', 'value']
                }]
            });

            return res.status(201).send(prod);

        } catch (db) {
            LoggerError(req.logger_id, db)
            throw "Erro ao salvar novo produto!"
        }
    } catch (e) {
        LoggerError(req.logger_id, e)
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

        if (Exist(name)) {
            alter.name = name
        }
        if (Exist(description)) {
            alter.description = description
        }
        if (Exist(barcode)) {
            alter.barcode = barcode
        }
        if (Exist(medida)) {
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
        if (Exist(price)) {
            alter.price = price
        }

        if (isinactive != null) {
            alter.isinactive = isinactive
        }

        try {
            if (Exist(alter)) {
                await DBProduct.update(alter, { where: { id } });
            }

            return res.send();
        } catch (db) {
            LoggerError(req.logger_id, db);
            throw "Erro ao salvar produto!"
        }
    } catch (e) {
        LoggerError(req.logger_id, e);
        return res.status(400).send({ msg: e });
    }
}

export default { query, register, edit }