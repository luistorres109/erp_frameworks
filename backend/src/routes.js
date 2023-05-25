import { Router } from "express";

import Auth from "#MIDDLEWARE/Auth.js";
import Login from "#CONTROLLER/Login.js";
import User from "#CONTROLLER/User.js";
import Office from "#CONTROLLER/Office.js";
import Permissions from "#CONTROLLER/Permissions.js";
import Product from "#CONTROLLER/Product.js";
import Client from "#CONTROLLER/Client.js";
import Cep from "#CONTROLLER/Cep.js";

const routes = Router();

routes.post("/api/login", Login);

routes.get("/api/login/verify", Auth, (req, res) => res.send());


routes.route("/api/user")
    .post(User.register)
    .all(Auth)
    .get(User.query);
routes.put("/api/user/:uuid", Auth, User.edit);

routes.route("/api/office")
    .all(Auth)
    .post(Office.register)
    .get(Office.query);
routes.put("/api/office/:id", Auth, Office.edit);

routes.route("/api/permission")
    .all(Auth)
    .post(Permissions.register)
    .get(Permissions.query);

routes.route("/api/product")
    .all(Auth)
    .post(Product.register)
    .get(Product.query);
routes.put("/api/product/:id", Auth, Product.edit);

routes.route("/api/client")
    .all(Auth)
    .post(Client.register)
    .get(Client.query);
routes.put("/api/client/:id", Auth, Client.edit);

routes.get("/api/cep/:cep", Auth, Cep);

// routes.route("/api/order")
//     .all(Auth)
//     .post()
//     .get();
// routes.put("/api/order/:id", Auth, );

export default routes;