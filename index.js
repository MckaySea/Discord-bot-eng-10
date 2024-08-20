require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const setupRolesCommand = require("./setupRoles");
const roleSelectInteraction = require("./roleSelect");
const handleMessages = require("./messageHandler");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Command handler
client.on("messageCreate", setupRolesCommand);
client.on("messageCreate", handleMessages.checkForBadWords);
// Interaction handler
client.on("interactionCreate", roleSelectInteraction);

client.login(process.env.DISCORD_TOKEN);
