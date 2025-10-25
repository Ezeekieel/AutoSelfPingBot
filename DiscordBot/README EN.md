# 🤖 Discord Auto-Ping Bot

A Discord bot that automatically pings itself and stays always connected.

## ✨ Features

- 🔄 **Auto-ping**: Sends messages automatically every 5 minutes  
- 🛡️ **Persistent connection**: Automatically reconnects if disconnected  
- 💓 **Keep-alive**: Internal server to maintain activity  
- 📊 **Useful commands**: !ping, !status, !help  
- 🔧 **Flexible configuration**: Via environment variables  

## 🚀 Installation

### 1. Create a Discord bot

1. Go to [https://discord.com/developers/applications](https://discord.com/developers/applications)  
2. Click **“New Application”**  
3. Give your application a name  
4. Go to the **“Bot”** tab  
5. Click **“Add Bot”**  
6. Copy the bot token  

### 2. Invite the bot to your server

1. In the **“OAuth2” > “URL Generator”** tab  
2. Select the scopes: `bot`  
3. Select the permissions: `Send Messages`, `Read Message History`, `View Channels`  
4. Copy the generated URL and open it in your browser  
5. Choose your server and authorize the bot  

### 3. Configuration

1. Copy `.env.example` to `.env`  
2. Fill in the values:  
   ```env
   DISCORD_TOKEN=your_bot_token_here
   PING_CHANNEL_ID=channel_id_for_pings
   PING_INTERVAL=300000
   ```

### 4. Start the bot

```bash
npm start
```

## ⚙️ Configuration

### Environment Variables

- `DISCORD_TOKEN`: Your Discord bot token (required)  
- `PING_CHANNEL_ID`: The ID of the channel where automatic pings will be sent  
- `PING_INTERVAL`: The interval in milliseconds between pings (default: 300000 = 5 min)  

### How to get a channel ID

1. Enable Developer Mode in Discord (Settings > Advanced > Developer Mode)  
2. Right-click the desired channel > **Copy ID**  

## 🎯 Commands

- `!ping`: Tests the bot’s latency  
- `!status`: Displays the bot’s status and uptime  
- `!help`: Lists available commands  

## 🔧 How It Works

The bot uses several mechanisms to stay always active:

1. **Auto-reconnect**: Attempts to reconnect automatically if disconnected  
2. **Ping system**: Sends periodic messages in a specified channel  
3. **HTTP keep-alive**: Internal server that responds to requests to maintain activity  
4. **Error handling**: Captures and manages errors to prevent crashes  

## 📝 Logs

The bot displays detailed logs for monitoring:

- ✅ Success events  
- ⚠️ Warnings  
- ❌ Errors  
- 🔄 Reconnections  

## 🛠️ Deployment

For production deployment, you can use:

- Heroku  
- Railway  
- DigitalOcean  
- VPS with PM2  

Make sure to configure your environment variables on your deployment platform.  
