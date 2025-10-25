require('dotenv').config();
const { DiscordBot } = require('./src/bot');

// Vérification des variables d'environnement requises
if (!process.env.DISCORD_TOKEN) {
  console.error('❌ DISCORD_TOKEN manquant dans le fichier .env');
  process.exit(1);
}

// Création et démarrage du bot
const bot = new DiscordBot();

async function main() {
  try {
    console.log('🚀 Démarrage du bot Discord Auto-Ping...');
    await bot.initialize();
  } catch (error) {
    console.error('💀 Erreur fatale:', error);
    process.exit(1);
  }
}

// Gestion de l'arrêt propre
process.on('SIGINT', () => {
  console.log('🛑 Arrêt du bot en cours...');
  bot.client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('🛑 Arrêt du bot en cours...');
  bot.client.destroy();
  process.exit(0);
});

main();