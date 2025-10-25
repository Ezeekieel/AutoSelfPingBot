const { SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Teste la latence du bot'),
    
  new SlashCommandBuilder()
    .setName('status')
    .setDescription('Affiche le statut et l\'uptime du bot'),
    
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche la liste des commandes disponibles'),
    
  new SlashCommandBuilder()
    .setName('badge')
    .setDescription('Commande pour aider à obtenir le badge développeur Discord')
];

async function deployCommands(client) {
  try {
    console.log('🔄 Déploiement des commandes slash...');
    
    // Déployer les commandes globalement
    await client.application.commands.set(commands);
    
    console.log('✅ Commandes slash déployées avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors du déploiement des commandes:', error);
  }
}

async function handleSlashCommand(interaction) {
  try {
    switch (interaction.commandName) {
      case 'ping':
        await interaction.reply({
          embeds: [{
            description: `🏓 Pong! Latence: ${Math.round(interaction.client.ws.ping)}ms`,
            color: 0x00ff00,
            timestamp: new Date()
          }]
        });
        break;

      case 'status':
        const uptime = process.uptime();
        const uptimeString = formatUptime(uptime);
        
        await interaction.reply({
          embeds: [{
            title: '📊 Statut du Bot',
            color: 0x00ff00,
            fields: [
              { name: '⏰ Uptime', value: uptimeString, inline: true },
              { name: '📡 Latence', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true },
              { name: '🔄 Statut', value: 'Actif et fonctionnel', inline: true }
            ],
            timestamp: new Date()
          }]
        });
        break;

      case 'help':
        await interaction.reply({
          embeds: [{
            title: '🤖 Commandes disponibles',
            color: 0x0099ff,
            fields: [
              { name: '/ping', value: 'Teste la latence du bot', inline: false },
              { name: '/status', value: 'Affiche le statut du bot', inline: false },
              { name: '/help', value: 'Affiche cette aide', inline: false },
              { name: '/badge', value: 'Aide pour obtenir le badge développeur', inline: false }
            ],
            footer: { text: 'Bot Auto-Ping - Toujours actif!' }
          }]
        });
        break;

      case 'badge':
        await interaction.reply({
          embeds: [{
            title: '🏆 Badge Développeur Discord',
            description: 'Félicitations ! Vous utilisez une commande slash de votre bot.',
            color: 0xffd700,
            fields: [
              { 
                name: '📋 Étapes pour obtenir le badge:', 
                value: '1. Utilisez cette commande slash\n2. Attendez 24h\n3. Allez sur https://discord.com/developers/active-developer\n4. Réclamez votre badge !', 
                inline: false 
              },
              { 
                name: '⚠️ Important:', 
                value: 'Le badge peut prendre jusqu\'à 24h pour apparaître après utilisation de la commande.', 
                inline: false 
              }
            ],
            timestamp: new Date(),
            footer: { text: 'Active Developer Badge Helper' }
          }]
        });
        break;

      default:
        await interaction.reply({
          content: '❌ Commande non reconnue.',
          ephemeral: true
        });
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution de la commande slash:', error);
    
    if (!interaction.replied) {
      await interaction.reply({
        content: '❌ Une erreur est survenue lors de l\'exécution de la commande.',
        ephemeral: true
      });
    }
  }
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days}j ${hours}h ${minutes}m ${secs}s`;
}

module.exports = { deployCommands, handleSlashCommand };