import { Router } from "express";
import { addProduct, getDashboardData } from "../controller/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(verifyJWT,addProduct);
router.route("/dashboard").get(verifyJWT,getDashboardData);

export default router;
