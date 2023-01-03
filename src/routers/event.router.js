import { Router } from "express";
import eventController from "../controllers/event.controller.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.post("/event", validate, eventController.eventPost);
router.get("/event", eventController.eventGet);
router.get("/event/admin", eventController.eventAdminGet);
router.get("/event/:id", eventController.eventByIdGet);

export default router;
