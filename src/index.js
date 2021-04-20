const express = require("express");
const cors = require("cors");

const { Grid, Cell, Game } = require("./models");
const {
  createGame,
  cellClick,
  cellRightClick,
  loadGame,
} = require("./services/game.services");

const app = express();

app.use(cors());

// endpoint for new game
app.get("/api/game/new/:rows/:columns", createGame);

// endpoint for set mark when user use click
app.get("/api/game/:gameId/:row/:col", cellClick);

// endpoint for set mark when user use right click(rc)
app.get("/api/game/:gameId/rc/:row/:col", cellRightClick);

// endpoint for load game exist in storage(GAMES)
app.get("/api/game/:gameId", loadGame);

app.listen(3000);

console.log("Server on PORT 3000");

module.exports = app;
