import { Router } from "express";
import userController from "../controllers/userController.js";
import { checkrole } from "../middleware/checkrole.js";

const routes = new Router();

routes
  .get("/usuarios", checkrole(["adm"]), userController.show)
  .get("/getUserPorEmail/:email", checkrole(["comum", "adm"]), userController.buscarUserPorEmail)

  .delete("/deletarUser/:email", checkrole(["comum"]), userController.remove);

export default routes;
