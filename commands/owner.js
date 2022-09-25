const { SlashCommandBuilder } = require("discord.js");

const OWNER_DISCORD_ID = "176255024152838144";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yapımcı")
    .setDescription("Botun yapımcısı hakkında bilgi verir."),
  async execute(interaction) {
    // get avatar url
    const avatarURL = interaction.client.users.cache
      .get(OWNER_DISCORD_ID)
      .avatarURL();

    // create the embed with the owner info
    const embed = {
      color: 0x0099ff,
      title: "Yapımcı",
      description: `<@${OWNER_DISCORD_ID}>`,
      fields: [
        {
          name: "Portfolyo",
          value: "https://omerfi.github.io",
          inline: true,
        },
        {
          name: "GitHub",
          value: "https://github.com/OmerFI",
          inline: true,
        },
      ],
      timestamp: new Date(),
      thumbnail: {
        url: avatarURL,
      },
    };

    await interaction.reply({ embeds: [embed] });
    // await interaction.reply(
    //   `<@${OWNER_DISCORD_ID}> tarafından geliştirilmiştir.`
    // );
  },
};
