import Logger, { LoggerError, LoggerInfo } from "#MIDDLEWARE/Logger.js";
import { DBClient } from "#MODELS/DBClient.js";
import { Exist, ExisteError, NotExisteError, ValidarCPF } from "#VALIDADORES";
import { request, response } from "express";


async function query(req = request, res = response) {
    try {
        LoggerInfo(req.logger_id, "Buscando todos clientes");
        const client = await DBClient.findAll({
            where: { isinactive: false }
        });
        return res.send(client);
    } catch (er) {
        LoggerError(req.logger_id, er);
        return res.status(400).send({ msg: "Ocorreu um erro ao buscar clientes" });
    }
}

async function register(req = request, res = response) {
    try {
        let { name, document, phone, address, district, city, state, num_address, cep, isinactive = null } = req.body;

        NotExisteError(name, "Nome não informado");
        NotExisteError(document, "Documento não informado");
        ValidarCPF(document, "Documento invalido")

        ExisteError((await DBClient.findOne({ where: { document } })).toJSON(), "Cliente ja cadastrado para esse CPF");

        try {
            const cli = await DBClient.create({ name, document, phone, address, district, city, state, num_address, cep, isinactive });
            return res.status(201).json(cli);
        } catch (db) {
            LoggerError(req.logger_id, db);
            throw "Erro ao salvar novo cliente!"
        }
    } catch (e) {
        LoggerError(req.logger_id, e);
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
            LoggerError(req.logger_id, dbe);
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