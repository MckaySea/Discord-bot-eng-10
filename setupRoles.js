const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = async (message) => {
  if (message.content === "!setupRoles") {
    if (message.channel.id !== process.env.WELCOME_CHANNEL_ID) {
      console.log("Message is not in the correct channel.");
      return;
    }

    // Create the select menu
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("role_select")
      .setPlaceholder("Select a role")
      .addOptions([
        new StringSelectMenuOptionBuilder()
          .setLabel("Engineering-10-intro 🔧")
          .setValue("role_1")
          .setDescription("This will allow you to view Eng-10 class material!"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Engineering-2-Graphics 💹")
          .setValue("role_2")
          .setDescription("This will allow you to view Eng-2 class material!"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Engineering-4-Materials 🔨")
          .setValue("role_3")
          .setDescription("This will allow you to view Eng-4 class material!"),
      ]);

    // Create the action row and add the select menu to it
    const actionRow = new ActionRowBuilder().addComponents(selectMenu);

    try {
      // Send the dropdown menu message
      await message.channel.send({
        content: `
**This is the message users would see upon joining the server!**

Please select your class you're currently taking from the dropdown menu!
        `,
        components: [actionRow],
      });
      console.log("Dropdown menu sent successfully.");
    } catch (error) {
      console.error("Error sending dropdown menu:", error);
    }
  }
};
