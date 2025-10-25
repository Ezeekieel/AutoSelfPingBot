let pingInterval;

function startPingSystem(client) {
  const pingChannelId = process.env.PING_CHANNEL_ID;
  const interval = parseInt(process.env.PING_INTERVAL) || 300000; // 5 minutes par défaut

  if (!pingChannelId) {
    console.log('⚠️ PING_CHANNEL_ID non défini, système de ping désactivé');
    return;
  }

  // Arrêter l'interval existant s'il y en a un
  if (pingInterval) {
    clearInterval(pingInterval);
  }

  console.log(`🔄 Démarrage du système de ping auto (interval: ${interval/1000}s)`);

  pingInterval = setInterval(async () => {
    try {
      const channel = client.channels.cache.get(pingChannelId);
      
      if (!channel) {
        console.error('❌ Canal de ping introuvable');
        return;
      }

      const messages = [
        '🤖 Bot toujours actif!',
        '⚡ Ping automatique - Tout fonctionne!',
        '🔥 Keep alive - Système opérationnel!',
        '✅ Auto-ping réussi!',
        '🚀 Bot en marche continue!'
      ];

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      await channel.send({
        embeds: [{
          description: randomMessage,
          color: 0x00ff00,
          timestamp: new Date(),
          footer: { text: 'Auto-Ping System' }
        }]
      });

      console.log('✅ Ping automatique envoyé');
      
    } catch (error) {
      console.error('❌ Erreur lors du ping automatique:', error);
    }
  }, interval);
}

function stopPingSystem() {
  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
    console.log('⏹️ Système de ping arrêté');
  }
}

module.exports = { startPingSystem, stopPingSystem };