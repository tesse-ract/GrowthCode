import express from "express"
import { authorizedRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import { processPayment, sendStripeAPIKey } from "../controllers/paymentController.js";

const router=express.Router();

router.post("/payment/process",isAuthenticatedUser,processPayment);
router.get("/stripeApiKey",isAuthenticatedUser,sendStripeAPIKey);

export default router;