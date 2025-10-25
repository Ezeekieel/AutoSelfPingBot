const { setupMessageHandlers } = require('./messageHandlers');
const { handleSlashCommand } = require('../commands/slashCommands');

function setupEventHandlers(client, botInstance) {
  // Événement de connexion réussie
  client.once('ready', () => {
    botInstance.onReady();
  });

  // Gestion des erreurs
  client.on('error', (error) => {
    console.error('❌ Erreur du client Discord:', error);
  });

  // Gestion des déconnexions
  client.on('disconnect', () => {
    console.warn('⚠️ Bot déconnecté, tentative de reconnexion...');
    botInstance.isReady = false;
  });

  // Gestion des reconnexions
  client.on('reconnecting', () => {
    console.log('🔄 Reconnexion en cours...');
  });

  // Gestion des messages
  setupMessageHandlers(client);

  // Gestion des commandes slash
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    await handleSlashCommand(interaction);
  });

  // Gestion des erreurs non capturées
  process.on('unhandledRejection', (error) => {
    console.error('❌ Promesse rejetée non gérée:', error);
  });

  process.on('uncaughtException', (error) => {
    console.error('❌ Exception non capturée:', error);
    process.exit(1);
  });
}

module.exports = { setupEventHandlers };