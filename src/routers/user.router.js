import { Router } from "express";
import userController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.post("/login/admin", validate, userController.LOGIN);

export default router;
