const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: "mayanoteef"
});

bot.on("start", () => {
  // const params = {
  //   icon_emoji: ":dog-face:"
  // };

  bot.postMessageToUser(
    "martin",
    "I am testing a game-changing new slackbot - ignore this"
    // params
  );
});

bot.on("error", error => {
  console.error(error);
});

bot.on("message", async data => {
  if (data.type !== "message") {
    return;
  }

  console.log(data);
  handleMessage(data.text, data.channel);
});

async function handleMessage(message, channel) {
  if (message.includes("fact")) {
    bot.postMessage(channel, await fetchDogFact());
  }

  if (message.includes("inspire me")) {
    bot.postMessage(channel, await inspireMe());
  }
}

async function fetchDogFact() {
  try {
    const response = await axios.get("https://dog-api.kinduff.com/api/facts");

    return response.data.facts[0];
  } catch (err) {
    console.error(err);
  }
}

async function inspireMe() {
  try {
    return "If I can figure my shit out with no front teef, you are going to be a-ok.";
  } catch (err) {
    console.error(err);
  }
}
