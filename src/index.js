const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();

app.use(cors());

app.use("/api/game", router);

app.listen(3000);

console.log("Server on PORT 3000");

module.exports = app;
