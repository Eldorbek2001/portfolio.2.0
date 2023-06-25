// JShint esversion: 6
const { Telegraf } = require('telegraf')

// Change this array to include the chat IDs where you want your new bot to operate
const authorizedChatIds = [-1001948673440, -1001966916584]; 




// Change BOT_TOKEN to the token of your new bot
const alumni_bot = new Telegraf(process.env.ALUMNI_BOT_TOKEN);

alumni_bot.command('help', (ctx) => {
  // Check if the chat ID is authorized
  if (isChatAuthorized(ctx.chat.id)) {
    // Change this line if you want to send a different image or another response
    const rulesFilePath = path.join('public/rules.png');
  
    // Send the 'rules.png' file as a reply
    ctx.replyWithPhoto({ source: rulesFilePath });
  } else {
    // Reply with an error message if the chat is not authorized
    ctx.reply('Unauthorized access.');
  }
});

// Authentication function
function isChatAuthorized(chatId) {
  return authorizedChatIds.includes(chatId);
}


module.exports = alumni_bot;
