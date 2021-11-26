require("dotenv").config();

// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// All the room in the world for your code
app.message(async ({ message, say }) => {
  console.log("received message", message);

  if (message.channel_type === "channel") {
    return;
  }

  const reversedText = [...message.text].reverse().join("");
  await say(reversedText);
});

app.event("app_home_opened", async ({ event, client, context }) => {
  console.log("got app_home_opened", event, context);
  return;

  /* got app_home_opened {
  type: 'app_home_opened',
  user: 'U3NUYU4KU',
  channel: 'D02P1UCE51P',
  tab: 'messages',
  event_ts: '1637913541.054887'
} {
  isEnterpriseInstall: false,
  botToken: 'xxxx',
  botUserId: 'U02NGJNHQCW',
  botId: 'B02P1UBKM33',
  teamId: 'T04NUEFRH',
  retryNum: undefined,
  retryReason: undefined,
  updateConversation: [Function (anonymous)]
}
 */

  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({
      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: "home",
        callback_id: "home_view",

        /* body of the view */
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Welcome to your _App's Home_* :tada:",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app.",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Click me!",
                },
              },
            ],
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
