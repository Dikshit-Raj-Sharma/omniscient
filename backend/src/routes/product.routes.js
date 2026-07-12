import { Router } from "express";
import { addProduct } from "../controller/product.controller.js";

const router = Router();

router.route("/add").post(addProduct);

export default router;
