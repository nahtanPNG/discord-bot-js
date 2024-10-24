const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Creating a new slash command
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Checks if the bot is online, returns 'Pong!'"),

  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
