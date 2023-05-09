const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer(function (req, res){
   res.write('Hello, this is initial server');
   res.end();
});

server.listen(PORT);
console.log(`server is listening on port ${PORT}`);

