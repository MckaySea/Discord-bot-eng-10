module.exports = async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "role_select") {
    const selectedRoleValue = interaction.values[0]; // Get the selected role value

    // Define the mapping between values and role IDs
    const emojiToRole = {
      role_1: process.env.ROLE_ID_ROLE_1,
      role_2: process.env.ROLE_ID_ROLE_2,
      role_3: process.env.ROLE_ID_ROLE_3,
    };

    const roleId = emojiToRole[selectedRoleValue];
    const guild = interaction.guild;
    const member = guild.members.cache.get(interaction.user.id);

    if (!member) {
      console.error("Member not found in cache.");
      await interaction.reply({
        content: "There was an error processing your request.",
        ephemeral: true,
      });
      return;
    }

    // List of all possible role IDs
    const allRoleIds = Object.values(emojiToRole);

    // Remove all roles except the selected one
    for (const id of allRoleIds) {
      if (id !== roleId) {
        const role = guild.roles.cache.get(id);
        if (role) {
          try {
            await member.roles.remove(role);
            console.log(
              `Removed role ${role.name} from ${interaction.user.username}`
            );
          } catch (error) {
            console.error(
              `Failed to remove role ${role.name} from ${interaction.user.username}:`,
              error
            );
          }
        }
      }
    }

    // Add the selected role
    const selectedRole = guild.roles.cache.get(roleId);
    if (selectedRole) {
      try {
        await member.roles.add(selectedRole);
        console.log(
          `Added role ${selectedRole.name} to ${interaction.user.username}`
        );
        await interaction.reply({
          content: `Role ${selectedRole.name} has been added to you!`,
          ephemeral: true,
        });
      } catch (error) {
        console.error(
          `Failed to add role ${selectedRole.name} to ${interaction.user.username}:`,
          error
        );
        await interaction.reply({
          content: "There was an error adding the role.",
          ephemeral: true,
        });
      }
    } else {
      console.error(`Role with ID ${roleId} not found.`);
      await interaction.reply({
        content: "There was an error adding the role.",
        ephemeral: true,
      });
    }
  }
};
