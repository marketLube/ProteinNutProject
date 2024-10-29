import express from "express";
import orderController from "../Controllers/orderController.js";

const router = express();

router.get("/order-stats", orderController.orderStats);

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default router;
