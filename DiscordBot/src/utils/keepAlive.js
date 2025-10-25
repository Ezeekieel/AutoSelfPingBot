const http = require('http');

function keepAlive() {
  // Créer un serveur HTTP simple pour maintenir le processus actif
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'alive',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }));
  });

  const port = process.env.PORT || 3000;
  
  server.listen(port, () => {
    console.log(`🌐 Serveur keep-alive démarré sur le port ${port}`);
  });

  // Ping interne toutes les 25 minutes pour maintenir l'activité
  setInterval(() => {
    http.get(`http://localhost:${port}`, (res) => {
      console.log('💓 Keep-alive ping réussi');
    }).on('error', (err) => {
      console.error('❌ Erreur keep-alive ping:', err.message);
    });
  }, 25 * 60 * 1000);

  return server;
}

module.exports = { keepAlive };