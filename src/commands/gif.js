const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Creating a new slash command
  data: new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Sends a random gif!")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The gif category")
        .setRequired(true)
        .addChoices(
          { name: "almaescura", value: "gif_funny" },
          { name: "welsmit", value: "gif_meme" },
          { name: "tobimaguire", value: "gif_movie" }
        )
    ),

  async execute(interaction) {
    // Getting the value from the option
    if (interaction.options.getString("category") === "gif_funny") {
      await interaction.reply(
        "https://tenor.com/view/skeleton-banging-fist-on-ground-agony-anguish-pain-suffering-gif-10047053495593873096"
      );
    } else if (interaction.options.getString("category") === "gif_meme") {
      await interaction.reply(
        "https://tenor.com/view/%D0%B9%D0%BE%D0%BA%D0%B5%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D0%B5-men-in-black-light-sunglasses-gif-15516530"
      );
    } else if (interaction.options.getString("category") === "gif_movie") {
      await interaction.reply(
        "https://tenor.com/view/toby-cry-phone-spider-man-cry-phone-spider-man-phone-toby-phone-gif-12875606672124040541"
      );
    }
  },
};
