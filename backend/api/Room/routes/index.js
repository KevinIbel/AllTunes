/**
   * @swagger
   * /room/:
   *  post:
   *   tags:
   *   - "Room"
   *   summary: "Create a new room"
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
   *         hostName:
   *           type: "string"
   *           example: "jamesangel140"
   *   responses:
   *     "200": 
   *       description: "successful operation"
   *       schema:
   *         type: "object"
   *         properties: 
   *           hostName:
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
   *         hostName:
   *           type: "string"
   *           example: "jamesangel140"
   *   responses:
   *     "200": 
   *       description: "successful operation"
   *       schema:
   *         type: "object"
   *         properties: 
   *           hostName:
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
   *         hostName:
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
   *           hostName:
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

  
          
