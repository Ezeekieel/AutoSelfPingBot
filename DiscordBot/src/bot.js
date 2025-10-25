const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { keepAlive } = require('./utils/keepAlive');
const { setupEventHandlers } = require('./events/eventHandlers');
const { startPingSystem } = require('./services/pingService');
const { deployCommands } = require('./commands/slashCommands');

class DiscordBot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
      ]
    });

    this.isReady = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
  }

  async initialize() {
    try {
      // Configuration des gestionnaires d'événements
      setupEventHandlers(this.client, this);

      // Connexion du bot
      await this.client.login(process.env.DISCORD_TOKEN);
      
      console.log('🤖 Bot Discord en cours d\'initialisation...');
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation:', error);
      await this.handleReconnection();
    }
  }

  async onReady() {
    this.isReady = true;
    this.reconnectAttempts = 0;
    
    console.log(`✅ Bot connecté en tant que ${this.client.user.tag}`);
    console.log(`📊 Connecté à ${this.client.guilds.cache.size} serveur(s)`);
    
    // Configuration du statut
    this.client.user.setPresence({
      activities: [{ 
        name: '🔄 Auto-Ping Actif', 
        type: ActivityType.Watching 
      }],
      status: 'online',
    });

    // Démarrage du système de ping automatique
    startPingSystem(this.client);
    
    // Démarrage du keep-alive
    keepAlive();
    
    // Déploiement des commandes slash
    await deployCommands(this.client);
    
    console.log('🚀 Tous les systèmes sont opérationnels !');
  }

  async handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('💀 Nombre maximum de tentatives de reconnexion atteint');
      process.exit(1);
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    
    console.log(`🔄 Tentative de reconnexion ${this.reconnectAttempts}/${this.maxReconnectAttempts} dans ${delay/1000}s...`);
    
    setTimeout(async () => {
      try {
        await this.initialize();
      } catch (error) {
        console.error('❌ Échec de la reconnexion:', error);
        await this.handleReconnection();
      }
    }, delay);
  }
}

module.exports = { DiscordBot };