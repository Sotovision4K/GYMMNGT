import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createFreeTrialGym } from "../controller/gym/manage.controller";
import { verifyCommerceID } from "../middlewares/gym.middleware";

export const gymRoutes = Router();




gymRoutes.get("/api/v1/add-gym", authMiddleware, createFreeTrialGym);

gymRoutes.get("/api/test/nit", verifyCommerceID)