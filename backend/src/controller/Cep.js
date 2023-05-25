import { Exist, NotExisteError } from '#VALIDADORES';
import { request, response } from 'express';
import axios from 'axios';
import { DBCep } from '#MODELS/DBCep.js';
import { LoggerError, LoggerInfo } from '#MIDDLEWARE/Logger.js';

export default async (req = request, res = response) => {
    try {
        const cep = parseInt(req.params.cep);

        NotExisteError(cep, 'CEP não informado');

        const cp = await DBCep.findOne({ where: { code: cep } });

        if (Exist(cp)) {
            LoggerInfo(req.logger_id, `CEP encontrado ${cep}`);
            return res.send(cp);
        } else {
            const ax = (await axios.get("https://viacep.com.br/ws/" + cep + "/json"));
            if (ax.data.erro == true) {
                throw `CEP não encontrado ${cep}`;
            }
            const c = await DBCep.create({
                code: cep,
                state: data.uf,
                city: data.localidade,
                district: data.bairro,
                address: data.logradouro
            })
            LoggerInfo(req.logger_id, "Buscado novo cep e gravado sucesso");
            return res.send(c);
        }
    } catch (error) {
        LoggerError(req.logger_id, error);
        return res.status(400).send({ msg: error });
    }
}