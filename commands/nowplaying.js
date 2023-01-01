const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

const { LOCALE } = require("../util/EvobotUtil");
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
  name: "np",
  aliases: ["np"],
  description: i18n.__("nowplaying.description"),
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(i18n.__("nowplaying.errorNotQueue")).catch(console.error);

    const song = queue.songs[0];
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = song.duration - seek;

    let nowPlaying = new MessageEmbed()
      .setTitle(i18n.__("nowplaying.embedTitle"))
      .setDescription(`${song.title}\n${song.url}`)
      .setColor("#F8AA2A")

    return message.channel.send(nowPlaying);
  }
};