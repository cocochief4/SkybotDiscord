const minionData = require("./MinionData");
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = require("discord-prefix");
const defaultPrefix = "!";
const { getBazaar } = require("./fetch-bazaar");

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", message => {
  let args = message.content.slice(defaultPrefix.length).split(" ");

  if (!message.content.startsWith(defaultPrefix)) return;

  if (message.author.bot) return;

  if (args[0].toLowerCase() === "ping") {
    message.channel.send("pong");
  }
  if (
    message.member.roles.cache.some(role => role.name === "Developer") &&
    args[0].toLowerCase === "notes"
  ) {
    let embed = new Discord.MessageEmbed();
    embed.setTitle("Developer Notes");
    embed.addField(
      "Minion Data Issue",
      ".catch issued error because of :Null data in MinionData.json, tier 13 :Null tier upgrade",
      true
    );
    embed.addField(
      "Bazaar Data Issue",
      "Spooky Shard sellPrice is 35k, buyPrice is 1.9m, wrong data from api",
      true
    );
    embed.setFooter("Sub to Cocochief on YT");
    embed.setColor("RANDOM");
    message.channel.send(embed);
  }
  if (args[0] === "notes") {
    message.channel.send("You are not a Developer.");
  }

  if (args[0].toLowerCase() === "embed") {
    let embed = new Discord.MessageEmbed()
      .setTitle("This is the Embed Title")
      .setDescription("This is the description of the Embed")
      .setColor("PURPLE")
      .setFooter("This is the Embed Footer");
    message.channel.send(embed);
  }
});
client.on("message", async message => {
  let args = message.content.slice(defaultPrefix.length).split(" ");
  if (!message.content.startsWith(defaultPrefix)) return;
  if (message.author.bot) return;
  if (args[0].toLowerCase() === "bazaar" || args[0].toLowerCase() === "bz") {
    let searchProduct = args[1].toUpperCase();
    let bazaarData = await getBazaar();
    let { products } = bazaarData;
    let embed = new Discord.MessageEmbed();
    try {
      for (var attributeName in bazaarData.products[searchProduct]
        .quick_status) {
        embed.addField(
          attributeName,
          bazaarData.products[searchProduct].quick_status[attributeName],
          true
        );
        embed.setTitle("test, it works!");
        embed.setColor("BLUE");
        embed.setFooter("sub to cocochief on yt");
      }
    } catch (error) {
      message.channel.send(
        "The product you put in is not listed in the bazaar... maybe try something else?"
      );
    }
    message.channel.send(embed);
  }
  if (args[0].toLowerCase() === "minion") {
    let minion = args[1].charAt(0).toUpperCase() + args[1].slice(1);
    let embed = new Discord.MessageEmbed();
    let bazaarData = getBazaar();
    try {
      for (var attributeName in minionData[minion]) {
        embed.addField(attributeName, minionData[minion][attributeName], true);
      }
      embed.addField(
        "Items per Hour",
        (3600 / minionData[minion].delay_second) * 2
      );
      embed.setTitle(minion);
      embed.setColor("GREEN");
      embed.setFooter("Sub to Cocochief on YT");
      message.channel.send(embed);
    } catch (error) {
      message.channel.send(
        "There is no such minion, maybe try something else?"
      );
    }
  }
});

client.login("ODQyNTU0MjA3NjUxMTAyNzIy.YJ2_wQ.umwv0ErDDnZFxib3uFxqK9_y1JM");
