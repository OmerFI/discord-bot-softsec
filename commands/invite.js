const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("davet")
    .setDescription("Sunucumuzun davet linkini verir."),
  async execute(interaction) {
    await interaction.reply("Sunucu Davet Linki: https://discord.io/soft-sec");
  },
};
