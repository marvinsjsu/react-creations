const fs = require('fs');
const ws = require('ws');
const http = require('http');
const express = require('express');

const PORT = 3000;

const server = http.createServer();
const app = express();

app.get('/', function(req, res) {
   res.sendFile('index.html', {root: __dirname});
})

server.on('request', app);
server.listen(PORT, function(){
   console.log(`server is listening on port ${PORT}`);
});

/** Begin WebSockets */
const WebSocketServer = ws.Server;

const wss = new WebSocketServer({ server });
wss.on('connection', function connection(ws) {
   const numClients = wss.clients.size;
   console.log('Clients connected: ', numClients);

   wss.broadcast(`Welcome, the current visitors ${numClients}`);

   if (ws.readyState === ws.OPEN) {
      ws.send('Welcome to my server');
   }

   ws.on('close', function close() {
      wss.broadcast(`Welcome, the current visitors ${numClients}`);
      console.log('A client has disconnected.');
   });
});

wss.broadcast = function broadcast(data) {
   wss.clients.forEach(function each(client) {
      client.send(data);
   });
};
