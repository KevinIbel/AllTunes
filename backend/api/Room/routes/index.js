/**
 * @swagger
 * /room:
 *  post:
 *   tags:
 *   - "Room"
 *   summary: "Create a new room"
 *   description: ""
 *   consumes:
 *    - "application/json"
 *   produces:
 *     - "application/json"
 *   requestBody:
 *     required: true
 *     content:
 *       description: "The name of the host of the room"
 *       schema:
 *         type: "object"
 *         properties:
 *           hostname:
 *             type: "string"
 *             example: "jamesangel140"
 *   responses:
 *     "200":
 *       description: "successful operation"
 *       schema:
 *         type: "object"
 *         properties:
 *           hostname:
 *             type: "string"
 *             example: "jamesangel140"
 *           key:
 *             type: "string"
 *             example: "5rgy76"
 *           url:
 *             type: "string"
 *             example: "www.alltunes/5rgy76"
 *  put:
 *   tags:
 *   - "Room"
 *   summary: "Add new customer to room"
 *   description: ""
 *   consumes:
 *    - "application/json"
 *   produces:
 *     - "application/json"
 *   parameters:
 *   - in: "body"
 *     name: "body"
 *     description: ""
 *     required: true
 *     schema:
 *       type: "object"
 *       properties:
 *         hostname:
 *           type: "string"
 *           example: "jamesangel140"
 *   responses:
 *     "200":
 *       description: "successful operation"
 *       schema:
 *         type: "object"
 *         properties:
 *           hostname:
 *             type: "string"
 *             example: "jamesangel140"
 *  delete:
 *   tags:
 *   - "Room"
 *   summary: "Delete / close room"
 *   description: ""
 *   consumes:
 *    - "application/json"
 *   produces:
 *     - "application/json"
 *   parameters:
 *   - in: "body"
 *     name: "body"
 *     description: ""
 *     required: true
 *     schema:
 *       type: "object"
 *       properties:
 *         hostname:
 *           type: "string"
 *           example: "jamesangel140"
 *   responses:
 *     "200":
 *       description: "successful operation"
 *  get:
 *   tags:
 *   - "Room"
 *   summary: "Get information about all room"
 *   description: ""
 *   consumes:
 *    - "application/json"
 *   produces:
 *     - "application/json"
 *   parameters:
 *   - in: "body"
 *     name: "body"
 *     description: ""
 *     required: true
 *     schema:
 *       type: "array"
 *       items:
 *         type: "object"
 *         properties:
 *           hostname:
 *             type: "string"
 *             example: "jamesangel140"
 *           key:
 *             type: "string"
 *             example: "5rgy76"
 *           customers:
 *             type: "array"
 *             items:
 *               type: "string"
 *               example: "jamesangel140"
 *   responses:
 *     "200":
 *       description: "successful operation"
 */

const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();


const controller = new Controller();

router.post("/", (req, res) => {
  const data = controller.createRoom(req.body.hostname);
  res.status(data.status).json(data.data);
});
router.put("/", (req, res) => {
  const data = controller.addCustomer(req.body.customerUsername, req.body.roomKey);
  res.status(data.status).json(data.data);
});
router.delete("/", (req, res) => {
  const data = controller.deleteRoom(req.body.hostname, req.body.roomKey);
  res.status(data.status).json(data.data);
});

router.get("/", (req, res) => {
  const data = controller.listInfo();
  res.status(data.status).json(data.data);
});

module.exports = router;