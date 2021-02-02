const express = require("express");
const Controller = require("./controller");
const router = express.Router();

const controller = new Controller();

router.post("/", (req, res) => {
  const data = controller.createRoom(req.body);
  res.status(data.status).json(data.data);
});

router.put("/", async (req, res) => {
  const data = await controller.addCustomer(req.body);
  res.status(data.status).json(data.data);
});

router.get("/", (req, res) => {
  const data = controller.listInfo();
  res.status(data.status).json(data.data);
});

function getRoom() {
  return controller.room;
}

module.exports = { router, getRoom };
