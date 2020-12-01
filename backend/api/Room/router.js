const express = require("express");
const RoomController = require("./controller");
const router = express.Router();

const controller = new RoomController();

router.post("/", async (req, res) => {
  try {
    const key = await controller.createRoom("jamesangel140");
    res.status("200").send({success: "success", TheKey: key });
  } catch (error) {
    res.status("400").send({ message: error.message, stack: error.stack });
  }
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
