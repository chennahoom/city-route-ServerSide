const { Router } = require("express");
const { stopController } = require("../Controllers/stop.ctrl");

const stopRouter = new Router();
module.exports = { stopRouter };

stopRouter.get("/", stopController.getStops);
stopRouter.get("/:id", stopController.getStop);
stopRouter.post("/", stopController.addStop);
stopRouter.put("/:id", stopController.updateStop);
stopRouter.delete("/:id", stopController.deleteStop);

