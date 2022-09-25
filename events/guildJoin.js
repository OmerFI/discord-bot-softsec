const OWNER_DISCORD_ID = "176255024152838144";

module.exports = {
  name: "guildCreate",
  async execute(guild) {
    console.log(`Joined a new guild: ${guild.name} (id: ${guild.id}).`);

    // get client mention
    const clientMention = `<@${guild.client.user.id}>`;

    guild.systemChannel.send(
      `👋🏻 Merhaba, ben ${clientMention}! \n\n` +
        `🚀 Aranıza katıldığım için çok mutluyum 😍 🥳\n\n` +
        `📚 Komutlarımı öğrenmek için \`/help\` yazabilirsiniz. \n\n` +
        `📌 Eğer bir sorun yaşıyorsanız, lütfen botun geliştiricisine ulaşın. \n\n` +
        `🔗 <@${OWNER_DISCORD_ID}>`
    );
  },
};
