const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Belirtilen miktarda mesajı siler.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Silinecek mesaj miktarı.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    // check permissions
    if (!interaction.member.permissions.has("ManageMessages")) {
      return interaction.reply({
        content:
          "Bu komutu kullanmak için mesajları yönetme iznine sahip olmalısın.",
        ephemeral: true,
      });
    }

    if (amount <= 1 || amount > 100) {
      return interaction.reply({
        content: "Lütfen 1 ile 100 arasında bir sayı girin.",
        ephemeral: true,
      });
    }

    // create the embed with the clear info
    const embed = {
      color: 0x0099ff,
      title: "Mesajlar Silindi",
      description: `${amount} adet mesaj silindi.`,
      timestamp: new Date(),
    };

    try {
      await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const errorMessage = `Mesajları silerken bir hata oluştu: \`${error.rawError.message}\``;
      console.error(errorMessage);
      await interaction.reply({
        content: errorMessage,
        ephemeral: true,
      });
    }
  },
};
