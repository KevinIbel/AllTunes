const express = require("express");
const RoomController = require("./controller");
const router = express.Router();

const controller = new RoomController();

router.post("/", async (req, res) => {
  const host = req.body;
  const data = await controller.createRoom(host);
  res.status(data.status).send(data.data);
});

router.get("/", (req, res) => {
  const data = controller.getAllRooms();
  res.status(data.status).send(data.data);
});

router.get("/:roomKey", (req, res) => {
  const { roomKey } = req.params;
  const data = controller.getRoom(roomKey);
  res.status(data.status).send(data.data);
});

router.delete("/:roomKey", async (req, res) => {
  const { roomKey } = req.params;
  const data = await controller.deleteRoom(roomKey);
  res.status(data.status).send(data.data);
});

module.exports = router;
