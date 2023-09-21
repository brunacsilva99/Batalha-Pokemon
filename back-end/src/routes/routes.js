const express = require("express")
const controller = require("../controllers/controller")

const routes = express.Router()

routes.post("/api/newBattle", controller.newBattle)

module.exports = routes