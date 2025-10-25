function setupMessageHandlers(client) {
  client.on('messageCreate', async (message) => {
    // Ignorer les messages du bot lui-même
    if (message.author.bot) return;

    // Commande de test
    if (message.content === '!ping') {
      try {
        const sent = await message.reply('🏓 Pong!');
        const timeTaken = sent.createdTimestamp - message.createdTimestamp;
        await sent.edit(`🏓 Pong! Latence: ${timeTaken}ms | API: ${Math.round(client.ws.ping)}ms`);
      } catch (error) {
        console.error('❌ Erreur lors de la commande ping:', error);
      }
    }

    // Commande de statut
    if (message.content === '!status') {
      try {
        const uptime = process.uptime();
        const uptimeString = formatUptime(uptime);
        
        await message.reply({
          embeds: [{
            title: '📊 Statut du Bot',
            color: 0x00ff00,
            fields: [
              { name: '⏰ Uptime', value: uptimeString, inline: true },
              { name: '📡 Latence', value: `${Math.round(client.ws.ping)}ms`, inline: true },
              { name: '🔄 Statut', value: 'Actif et fonctionnel', inline: true }
            ],
            timestamp: new Date()
          }]
        });
      } catch (error) {
        console.error('❌ Erreur lors de la commande status:', error);
      }
    }

    // Commande d'aide
    if (message.content === '!help') {
      try {
        await message.reply({
          embeds: [{
            title: '🤖 Commandes disponibles',
            color: 0x0099ff,
            fields: [
              { name: '!ping', value: 'Teste la latence du bot', inline: false },
              { name: '!status', value: 'Affiche le statut du bot', inline: false },
              { name: '!help', value: 'Affiche cette aide', inline: false }
            ],
            footer: { text: 'Bot Auto-Ping - Toujours actif!' }
          }]
        });
      } catch (error) {
        console.error('❌ Erreur lors de la commande help:', error);
      }
    }
  });
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days}j ${hours}h ${minutes}m ${secs}s`;
}

module.exports = { setupMessageHandlers };