const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Remplace par l'URL de ton frontend
    methods: ["GET", "POST"]
  }
});

// Écoute des connexions des utilisateurs
io.on('connection', (socket) => {
  console.log("Un utilisateur s'est connecté");

  socket.on('admin_connected', (adminUsername) => {
    console.log(`L'admin ${adminUsername} s'est connecté au panel`);
  });

  // Gérer la déconnexion
  socket.on('disconnect', () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Serveur Socket.IO lancé sur le port ${PORT}`);
});
