'use strict';

require('dotenv').config();

const cluster = require('cluster');

const express = require('express');

const app = express();
const config = require('./config');
const db = require('./db');

const http = require('http');
const PORT = process.env.PORT || 3000;


// Scaling the application using node.js cluster module

if(cluster.isMaster) {
    const cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
      console.log('Worker %d died :(', worker.id);
      cluster.fork();
    });
} else {
    db
    .connect(config.database.mongoConfig.mongoUri)
    .then(() => require('./middlewares')(app))
    .then(() => require('./routers').attach(app))
    .then(() => {
        return Promise.resolve(app);
    })
    .then(() => {
        http.createServer(app).listen(PORT, () => {
            console.log(
              'Http Server is running On:',
              PORT
            );
    
        });
    })
}