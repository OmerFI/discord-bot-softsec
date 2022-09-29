const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Kullanıcı hakkında bilgi verir.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription(
          "Kullanıcı hakkında bilgi almak için kullanıcıyı etiketleyin."
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    // create roles with the most important roles first
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1)
      .join(" ");

    // format the roles string if there are more than 10 roles
    const rolesString =
      roles.length > 1024
        ? roles.length > 2048
          ? "Çok fazla rol var."
          : roles.slice(0, 1021) + "..."
        : roles;

    // get role's color
    const color =
      member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor;

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setColor(color)
      .setDescription(`<@${user.id}>`)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "Kullanıcı Adı", value: user.username, inline: true },
        { name: "Discriminator", value: user.discriminator, inline: true },
        { name: "ID", value: user.id, inline: true },
        { name: "Bot mu?", value: user.bot ? "Evet" : "Hayır", inline: true },
        {
          name: "Oluşturulma Tarihi",
          value: new Date(user.createdTimestamp).toLocaleDateString(),
          inline: true,
        },
        {
          name: "Katılma Tarihi",
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      });

    // Add roles if there are any
    if (roles) {
      embed.addFields({
        name: `Roller [${member.roles.cache.size - 1}]`,
        value: rolesString,
        inline: true,
      });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
