const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");


router.post("/payments", paymentController.createPayment);
router.get("/payments/user/:userId", paymentController.getPaymentsByUser);

module.exports = router;