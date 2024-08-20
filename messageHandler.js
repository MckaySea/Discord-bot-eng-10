const badWords = ["badword1", "badword2"]; // Add your list of bad words

module.exports = {
  checkForBadWords: async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    for (const word of badWords) {
      if (content.includes(word)) {
        try {
          await message.delete(); // Delete the offending message
          await message.channel.send(
            `${message.author}, please avoid using inappropriate language.`
          ); // Notify the user
        } catch (error) {
          console.error(`Failed to handle bad word message: ${error}`);
        }
        break;
      }
    }
  },
};
