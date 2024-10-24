const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();
const { TOKEN } = process.env;

// Create a new client instance with additional intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, // Necessário para detectar mensagens em servidores
    GatewayIntentBits.MessageContent, // Necessário para acessar o conteúdo das mensagens
  ],
});
client.commands = new Collection();

// Commands
const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "src", "commands");
// Get all the files in the commands directory
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((files) => files.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

// Events Listener for slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
    });
  }
});

// Event Listener for message content
client.on(Events.MessageCreate, async (message) => {
  if (message.content.startsWith("=/")) {
    await message.channel.send("Vc vacilou cara =/");
  } else if (message.content.endsWith("bora lol")) {
    await message.channel.send("Lol? Eu vou de yumi top ;)");
  }
});
