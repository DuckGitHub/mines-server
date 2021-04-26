const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();

// manage cors
app.use(cors());

// set port
app.set("port", process.env.PORT || 3000);

// api routes
app.use("/api/game", router);

// port run app
app.listen(app.get("port"));

console.log(`Server on PORT ${app.get("port")}`);

module.exports = app;
