const http = require("http");
const express = require("express");
const app = require("./app");
const { testdb } = require("./services/mongo");

const PORT = 5000;

testdb();

const server = http.createServer(app);

server.listen(PORT, function () {
  console.log(`SERVER STARTED AT ${PORT}`);
});
