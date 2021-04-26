const express = require("express");
const router = express.Router();

const {
  createGame,
  cellClick,
  cellRightClick,
  loadGame,
} = require("../services/game.services");

// endpoint for new game
router.get("/new/:rows/:columns", createGame);

// endpoint for set mark when user use click
router.get("/:gameId/:row/:col", cellClick);

// endpoint for set mark when user use right click(rc)
router.get("/:gameId/rc/:row/:col", cellRightClick);

// endpoint for load game exist in storage(GAMES)
router.get("/:gameId", loadGame);

module.exports = router;
