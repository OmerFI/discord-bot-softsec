const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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

    const embed = new EmbedBuilder()
      .setAuthor({ name: "Yapımcı", iconURL: avatarURL })
      .setColor(0x0099ff)
      .setDescription(`Merhaba Ben Ömer 👋🏻 <@${OWNER_DISCORD_ID}>`)
      .setThumbnail(avatarURL)
      .addFields(
        {
          name: "Portfolyo",
          value: "https://omerfi.github.io",
        },
        {
          name: "GitHub",
          value: "https://github.com/OmerFI",
        }
      )
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
  },
};
