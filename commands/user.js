const { SlashCommandBuilder } = require("discord.js");

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
    const roles = member.roles.cache
      .filter((role) => role.id !== interaction.guild.id)
      .map((role) => role.toString())
      .join(", ");

    // format the roles string if there are more than 10 roles
    const rolesString =
      roles.length > 1024
        ? roles.length > 2048
          ? "Çok fazla rol var."
          : roles.slice(0, 1021) + "..."
        : roles;

    // create the embed with the user's info
    const embed = {
      color: 0x0099ff,
      title: `${user.username}#${user.discriminator}`,
      thumbnail: {
        url: user.displayAvatarURL(),
      },
      fields: [
        {
          name: "ID",
          value: user.id,
          inline: true,
        },
        {
          name: "Sunucuya Katılma Tarihi",
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
          inline: true,
        },
        {
          name: "Hesap Oluşturulma Tarihi",
          value: new Date(user.createdTimestamp).toLocaleDateString(),
          inline: true,
        },
      ],
      timestamp: new Date(),
    };

    // Add roles if there are any
    if (roles) {
      embed.fields.push({
        name: `Roller [${member.roles.cache.size - 1}]`,
        value: rolesString,
      });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
