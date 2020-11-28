const express = require("express");
const RoomController = require("./controller");
const router = express.Router();

const controller = new RoomController();

router.post("/", async (req, res) => {
  await controller.createRoom();
  res.status('200')
});

router.put("/", (req, res) => {
  const data = controller.addCustomer(req.body.customerUsername);
  res.status(data.status).json(data.data);
});

router.get("/", (req, res) => {
  const data = controller.listInfo();
  res.status(data.status).json(data.data);
});

module.exports = router;
