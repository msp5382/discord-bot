const {GuildMember} = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'ไม่อยากฟังเพลงต่อไป ข้ามแม่ง',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'ไม่ได้อยู่ในห้องเสียง!!!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'ไม่ได้อยู่ในห้องเสียง!!!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '❌ | ไม่ได้เล่นเพลง'});
    const currentTrack = queue.current;
    const success = queue.skip();
    return void interaction.followUp({
      content: success ? `✅ | ข้าม **${currentTrack}** ละ` : '❌ | บั๊คโว้ย!',
    });
  },
};
