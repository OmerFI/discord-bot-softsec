const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun pingini gösterir."),
  async execute(interaction) {
    // create the embed with the ping info
    const embed = {
      color: 0x0099ff,
      title: "Ping",
      description: `Botun pingi: **${interaction.client.ws.ping}** ms`,
      timestamp: new Date(),
    };

    await interaction.reply({ embeds: [embed] });
  },
};
