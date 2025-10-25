# 🤖 Bot Discord Auto-Ping

Un bot Discord qui se ping automatiquement et reste toujours connecté.

## ✨ Fonctionnalités

- 🔄 **Auto-ping** : Envoie des messages automatiquement toutes les 5 minutes
- 🛡️ **Connexion persistante** : Reconnexion automatique en cas de déconnexion
- 💓 **Keep-alive** : Serveur interne pour maintenir l'activité
- 📊 **Commandes utiles** : !ping, !status, !help
- 🔧 **Configuration flexible** : Via variables d'environnement

## 🚀 Installation

### 1. Créer un bot Discord

1. Allez sur https://discord.com/developers/applications
2. Cliquez sur "New Application"
3. Donnez un nom à votre application
4. Allez dans l'onglet "Bot"
5. Cliquez sur "Add Bot"
6. Copiez le token du bot

### 2. Inviter le bot sur votre serveur

1. Dans l'onglet "OAuth2" > "URL Generator"
2. Sélectionnez les scopes : `bot`
3. Sélectionnez les permissions : `Send Messages`, `Read Message History`, `View Channels`
4. Copiez l'URL générée et ouvrez-la dans votre navigateur
5. Sélectionnez votre serveur et autorisez le bot

### 3. Configuration

1. Copiez `.env.example` vers `.env`
2. Remplissez les valeurs :
   ```
   DISCORD_TOKEN=votre_token_bot_ici
   PING_CHANNEL_ID=id_du_canal_pour_ping
   PING_INTERVAL=300000
   ```

### 4. Démarrage

```bash
npm start
```

## ⚙️ Configuration

### Variables d'environnement

- `DISCORD_TOKEN` : Token de votre bot Discord (obligatoire)
- `PING_CHANNEL_ID` : ID du canal où envoyer les pings automatiques
- `PING_INTERVAL` : Intervalle en millisecondes entre les pings (défaut: 300000 = 5 min)

### Comment obtenir l'ID d'un canal

1. Activez le mode développeur dans Discord (Paramètres > Avancé > Mode développeur)
2. Clic droit sur le canal souhaité > Copier l'identifiant

## 🎯 Commandes

- `!ping` : Teste la latence du bot
- `!status` : Affiche le statut et l'uptime du bot
- `!help` : Liste des commandes disponibles

## 🔧 Fonctionnement

Le bot utilise plusieurs mécanismes pour rester toujours actif :

1. **Reconnexion automatique** : En cas de déconnexion, le bot tente de se reconnecter automatiquement
2. **Système de ping** : Envoie des messages périodiques dans un canal spécifié
3. **Keep-alive HTTP** : Serveur interne qui répond aux requêtes pour maintenir l'activité
4. **Gestion d'erreurs** : Capture et gère les erreurs pour éviter les crashes

## 📝 Logs

Le bot affiche des logs détaillés pour le monitoring :

- ✅ Événements de succès
- ⚠️ Avertissements
- ❌ Erreurs
- 🔄 Reconnexions

## 🛠️ Déploiement

Pour un déploiement en production, vous pouvez utiliser :

- Heroku
- Railway
- DigitalOcean
- VPS avec PM2

Assurez-vous de configurer les variables d'environnement sur votre plateforme de déploiement.
