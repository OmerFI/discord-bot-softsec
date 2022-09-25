const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Sunucu hakkında bilgi verir."),
  async execute(interaction) {
    // create the embed with the server's info
    const embed = {
      color: 0x0099ff,
      title: interaction.guild.name,
      thumbnail: {
        url: interaction.guild.iconURL(),
      },
      fields: [
        {
          name: "ID",
          value: interaction.guild.id,
          inline: true,
        },
        {
          name: "Sunucu Oluşturulma Tarihi",
          value: new Date(
            interaction.guild.createdTimestamp
          ).toLocaleDateString(),
          inline: true,
        },
        {
          name: "Üye Sayısı",
          value: interaction.guild.memberCount,
          inline: true,
        },
        {
          name: "Kanal Sayısı",
          value: interaction.guild.channels.cache.size,
          inline: true,
        },
        {
          name: "Roller",
          value: interaction.guild.roles.cache.size,
          inline: true,
        },
        {
          name: "Sahibi",
          value: `<@${interaction.guild.ownerId}>`,
          inline: true,
        },
      ],
      timestamp: new Date(),
    };

    await interaction.reply({ embeds: [embed] });
  },
};
