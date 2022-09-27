const express = require("express");

const app = express();
const port = 3000;

app.all("/", (req, res) => {
  res.send("Bot is running!");
});

function keepAlive() {
  app.listen(port, () => {
    console.log("Server is ready.");
  });
}

module.exports = keepAlive;
