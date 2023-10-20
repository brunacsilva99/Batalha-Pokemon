const express = require("express")
const userController = require("../controllers/userController")
const pokemonController = require("../controllers/pokemonController")
const battleController = require("../controllers/battleController")

const routes = express.Router()

routes.post("/api/Battle/new", battleController.newBattle)
routes.put("/api/Battle/edit/:id", battleController.editBattle)
routes.delete("/api/Battle/delete/:id", battleController.deleteBattle)

routes.post("/api/Pokemon/new", pokemonController.newPokemon)
routes.put("/api/Pokemon/edit/:id", pokemonController.editPokemon)
routes.delete("/api/Pokemon/delete/:id", pokemonController.deletePokemon)

routes.post("/api/User/new", userController.newUser)
routes.put("/api/User/edit/:id", userController.editUser)
routes.delete("/api/User/delete/:id", userController.deleteUser)

module.exports = routes