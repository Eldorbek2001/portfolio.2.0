const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');

const cron = require('node-cron');

let currentDay = 0;

const bot = new Telegraf(process.env.BOT_TOKEN);

cron.schedule('0 0 * * *', async function() {
  console.log('Leetcode');
  if (savedCtx) {
    if(currentDay < 150){
      currentDay += 1;
    }
    await sendDailyLeetcodeProblem(savedCtx);
  }
});

const LeetcodeProblemSchema = new mongoose.Schema({
  leetcodeID: {
    type: String,
  },
  name: {
    type: String,
  },
  video: {
    type: String,
  },
  solution: {
    type: String,
  },
  videoIndex: {
    type: Number,
  }
});

const LeetcodeProblem = mongoose.model('LeetcodeProblem', LeetcodeProblemSchema);
let savedCtx = null;


async function sendDailyLeetcodeProblem(ctx) {
  const problem = await LeetcodeProblem.findOne({videoIndex: currentDay});
  
  
  
  if (problem) {
    sendLeetcodeProblemMessage(ctx, problem);
  } else {
    ctx.reply("No problems found in the database.");
  }
}
async function sendSolution(ctx) {
  const problem = await LeetcodeProblem.findOne({videoIndex: currentDay});

  if (!problem) {
    ctx.reply('No Leetcode problem available!');
    return;
  }

  // Fetch the solution content from GitHub API
  const solutionContent = await getFileContent(githubAPI + problem.solution);

  if (solutionContent) {
    const escapedSolutionContent = solutionContent.replace(/[_*[\]~`()>#+\-=|{}.!]/g, '\\$&');
    const solutionMessage = `Solution:
\u{200B}\u{200B}\u{200B}||\u{200B}\u{200B}\u{200B} \n\n${escapedSolutionContent} \n\n||`;
    await ctx.reply(solutionMessage, { parse_mode: 'MarkdownV2' });
  } else {
    console.log('Solution content not found.');
  }
}

function sendLeetcodeProblemMessage(ctx, problem) {
  const message = `
  Leetcode ID: ${problem.leetcodeID}
Day: ${problem.videoIndex}
Name: ${problem.name}
Video: ${problem.video}
  `;
  ctx.reply(message);
}


bot.command('start', (ctx) => {

  if( ctx.chat.id == process.env.CHAT_ID || true){
    ctx.reply('Bot started');
    savedCtx = ctx;
    sendDailyLeetcodeProblem(ctx);

  } else{


    ctx.reply('Wrong!');
  }
  
});


bot.command('today', (ctx) => {

  if( ctx.chat.id == process.env.CHAT_ID || true){
    
    sendDailyLeetcodeProblem(ctx);
  }

});

bot.command('solution', (ctx) => {
  if( ctx.chat.id == process.env.CHAT_ID || true){
    sendSolution(ctx);
    

  }

});

bot.command('next', (ctx) => {
  if( ctx.chat.id == process.env.CHAT_ID || true){
    if(currentDay < 150){
      currentDay += 1;
    }
    
    sendDailyLeetcodeProblem(ctx);
  }

});

bot.command('previous', (ctx) => {
  if( ctx.chat.id == process.env.CHAT_ID || true){
    if(currentDay > 0){
      currentDay -= 1;
    }
    sendDailyLeetcodeProblem(ctx);

  }

});


function readTextFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return data.split('\n').map(line => line.trim()).filter(line => line !== '');
}

// Call the function to generate Leetcode problems and save them to the database
//const leetcodeProblems = generateLeetcodeProblems();
// LeetcodeProblem.insertMany(leetcodeProblems)
//   .then(() => {
//     console.log("Leetcode problems saved to the database");
//   })
//   .catch(error => {
//     console.error("Error saving Leetcode problems:", error);
//   });

// function generateGitHubString(title) {
//   // Extract problem number from title
//   let number = title.match(/\d+/)[0];
//   while(number.length < 4) {
//       number = '0' + number;
//   }

//   // Extract problem name from title
//   let name = title
//       .substring(0, title.indexOf('-'))
//       .trim()
//       .toLowerCase()
//       .split(' ')
//       .join('-');

//   // Return the final string
//   console.log(`${number}-${name}.py`)
//   return `${number}-${name}.py`;
// }







function generateLeetcodeProblems() {
  const problemNames = readTextFile(__dirname + '/public/ProblemNames.txt');
  const solutionLinks = readTextFile(__dirname + '/public/SolutionLinks.txt');
  const links = readTextFile(__dirname + '/public/Links.txt');

  const leetcodeProblems = [];

  for (let i = 0; i < problemNames.length; i++) {
    const leetcodeID = solutionLinks[i].slice(0, 4);
    const name = problemNames[i];
    const video = links[i];
    const solution = solutionLinks[i];

    const problem = new LeetcodeProblem({
      leetcodeID,
      name,
      video,
      solution
    });

    leetcodeProblems.push(problem);
  }

  return leetcodeProblems;
}


function modifyAndSaveFile(inputFilePath, outputFilePath) {
  fs.promises.readFile(inputFilePath, 'utf8')
    .then((data) => {
      const lines = data.split('\n');

      const modifiedLinesPromise = Promise.all(lines.map((line) => {
        return generateGitHubString(line);
      }));

      return modifiedLinesPromise.then((modifiedLines) => {
        const outputData = modifiedLines.join('\n');
        return fs.promises.writeFile(outputFilePath, outputData, 'utf8');
      });
    })
    .then(() => {
      console.log(`Modified file saved to: ${outputFilePath}`);
    })
    .catch((error) => {
      console.error('Error processing the file:', error);
    });
}


function generateGitHubString(title) {
  // Replace colon and parentheses with empty string
  title = title.replace(':', '').replace(/\(/g, '').replace(/\)/g, '');

  // Split the title by spaces
  var splitTitle = title.split(' - ');

  // Check if 'Leetcode' exists in the splitTitle
  var leetcodeElement = splitTitle.find(element => element.toLowerCase().includes('leetcode'));

  // If it does not exist, handle the case as needed (for example, by using a default value)
  if(!leetcodeElement) {
      // Extract the problem title
      var problemTitle = splitTitle[0].toLowerCase().split(' ').join('-');
      // Create the GitHub string with a default problem number
      var githubString = `0000-${problemTitle}.py`;
      return githubString;
  }

  // Extract the Leetcode number
  var leetcodeNum = leetcodeElement.split(' ')[1];

  // If Leetcode number is undefined, handle the case as needed (for example, by using a default value)
  if(!leetcodeNum) {
      leetcodeNum = '0000';
  }

  // Extract the problem title
  var problemTitle = splitTitle[0].toLowerCase().split(' ').join('-');

  // Add zero padding to the Leetcode number
  var paddedNum = leetcodeNum.padStart(4, '0');

  // Create the GitHub string
  var githubString = `${paddedNum}-${problemTitle}.py`;

  return githubString;
}






async function getVideoName(videoUrl) {
  try {
    const response = await axios.get(videoUrl);
    const html = response.data;

    const $ = cheerio.load(html);
    const videoTitle = $('meta[name="title"]').attr('content');
    //return (convertString(videoTitle));
    return (videoTitle);

  } catch (error) {
    return('Error retrieving video information:', error.message);
  }
}


async function getFileContent(filename) {
  try {
      const response = await axios.get(filename);
      const data = response.data;

      if (data.content) {
          const fileContent = Buffer.from(data.content, 'base64').toString('utf-8');
          return fileContent;

          // Share the file content through Telegram
          // You can use the Telegram Bot API or any other Telegram library to send the content
          // to your desired Telegram chat or channel
      } else {
          return 'File content not found.';
      }
  } catch (error) {
      return ('Error retrieving file content:', error);
  }
}

async function updateVideoIndex() {
  const fileStream = fs.createReadStream(__dirname + '/public/links.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNumber = 0;

  for await (const line of rl) {
    const problem = await LeetcodeProblem.findOne({ video: line });

    if (problem) {
      problem.videoIndex = lineNumber;
      await problem.save();
    }

    lineNumber++;
  }
}





module.exports = bot;
