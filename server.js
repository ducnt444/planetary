// const express = require("express");
// const serveStatic = require("serve-static");
// const path = require("path");

// const app = express();

// //here we are configuring dist to serve app files
// app.use("/", serveStatic(path.join(__dirname, "/dist")));

// // this * route is to serve project on different page routes except root `/`
// app.get(/.*/, function(req, res) {
//   res.sendFile(path.join(__dirname, "/dist/index.html"));
// });

// const port = process.env.PORT || 8080;
// app.listen(port);
// console.log(`app is listening on port: ${port}`);

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);
