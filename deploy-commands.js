const { REST, Routes } = require("discord.js");

// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Commands
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "src", "commands");
// Get all the files in the commands directory
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const commands = [];

// Load commands
for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
}

// REST Instance
const rest = new REST({ version: "10" }).setToken(TOKEN);

// Commands Deployment
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      {
        body: commands,
      }
    );

    console.log("Commands have been reloaded.");
  } catch (error) {
    console.error(error);
  }
})();
