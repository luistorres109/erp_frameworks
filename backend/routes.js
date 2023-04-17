import { Router } from "express";

import Login from "#CONTROLLER/Login.js";

import User from "#CONTROLLER/User.js";

const routes = Router();

routes.route("/api/login").post(Login);

routes.route("/api/user")
   .get(User.query)
   .post(User.register);

export default routes;
