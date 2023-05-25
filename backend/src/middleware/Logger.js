import { DBLogger } from "#MODELS/DBLogger.js";
import { DBLoggerItem } from "#MODELS/DBLoggerItem.js";
import { DBUser } from "#MODELS/DBUser.js";
import { Exist } from "#VALIDADORES";
import { request, response } from "express";

export default async (req = request, res = response, next) => {
    const log = {
        "url": req.url,
        "path": req.path,
        "method": req.method,
        "body": req.body,
        "ip": req.ip,
        "headers": req.headers
    };

    const { authorization } = req.headers;
    if (Exist(authorization)) {
        if (authorization.split(" ")[0] == "Basic") {
            let data = authorization.split("Basic")[1];
            let buff = new Buffer(data, 'base64');
            let user = buff.toString('ascii').split(":")[0];

            const dbuse = await DBUser.findOne({ attributes: ['uuid', 'name'], where: { login: user } });

            log.user_login = user;

            if (Exist(dbuse)) {
                log.user_uuid = dbuse.uuid;
                log.user_name = dbuse.name;
            }

        }
        if (authorization.split(" ")[0] == "Bearer") {

            let data = authorization.split(".")[1];
            let buff = new Buffer(data, 'base64');
            let token = JSON.parse(buff.toString('ascii'));

            const dbuse = await DBUser.findByPk(token.userUUID, { attributes: ['login', 'name'] });
            if (Exist(dbuse)) {
                log.user_login = dbuse.login;
                log.user_name = dbuse.name;
                log.user_uuid = token.userUUID;
            }

        }

    }

    const logger = await DBLogger.create(log);
    req.logger_id = logger.id;
    next();
}


const LoggerInfo = async (logger_id, msg) => {
    if (process.env.NODE_ENV == 'development') {
        console.info(msg);
    }
    const loggerItem = { logger_id, type: "INFO" };
    if (typeof msg === 'string') {
        loggerItem.msg = msg;
    } else {
        loggerItem.msg = JSON.stringify(msg);
    }
    loggerItem.sequence = (await DBLoggerItem.count({ where: { logger_id } })) + 1;
    await DBLoggerItem.create(loggerItem);

}
const LoggerError = async (logger_id, msg) => {
    if (process.env.NODE_ENV == 'development') {
        console.error(msg);
    }
    const loggerItem = { logger_id, type: "ERROR" };
    if (typeof msg === 'string') {
        loggerItem.msg = msg;
    } else {
        loggerItem.msg = JSON.stringify(msg);
    }

    loggerItem.sequence = (await DBLoggerItem.count({ where: { logger_id } })) + 1;
    await DBLoggerItem.create(loggerItem);
}

export { LoggerInfo, LoggerError }