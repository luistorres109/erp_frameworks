import { Router } from "express";

import Auth from "#MIDDLEWARE/Auth.js";
import Login from "#CONTROLLER/Login.js";
import User from "#CONTROLLER/User.js";
import Office from "#CONTROLLER/Office.js";
import Permissions from "#CONTROLLER/Permissions.js";

const routes = Router();

routes.post("/api/login", Login);

routes.route("/api/user")
    .post(User.register)
    .all(Auth)
    .get(User.query);

routes.route("/api/office")
    .all(Auth)
    .post(Office.register)
    .get(Office.query);

routes.put("/api/office/:id", Auth, Office.edit);

routes.route("/api/permission").all(Auth).post(Permissions.register).get(Permissions.query);


export default routes;
