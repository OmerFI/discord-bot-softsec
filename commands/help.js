const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Botun komutlarını gösterir."),
  async execute(interaction) {
    const commands = interaction.client.commands;
    const commandList = commands
      .map((command) => `**/${command.data.name}** - ${command.data.description}`)
      .join("\n");

    // create the embed with the command list
    const embed = {
      color: 0x0099ff,
      title: "Komutlar",
      description: commandList,
      timestamp: new Date(),
    };

    await interaction.reply({ embeds: [embed] });
  },
};
