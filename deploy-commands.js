require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");

const { DISCORD_CLIENT_ID, DISCORD_TOKEN } = process.env;

console.log("Starting deploy-commands.js");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: commands })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
