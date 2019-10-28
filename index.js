// import express from 'express'; // ES Modules
const express = require('express'); // CommonJS modules, and it is equivalent to the line above

const db = require('./data/db.js');

const server = express(); // creates a server

// middleware
server.use(express.json()); // teaches express how to read JSON
// needed for the POST and PUT to work

// request/route handlers

// handles GET requests to / on localhost:8000
server.get('/', (req, res) => {
  res.send('Hello Node 23!');
});

// GET to /hubs that returns a list of hubs
server.get('/hubs', (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({ error: 'failed to get hubs from db' });
    });
});

// POST to /hubs
server.post('/hubs', (req, res) => {
  const hubInformation = req.body;

  console.log('hub information', hubInformation);

  db.add(hubInformation)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({ error: 'failed to add the hub to the db' });
    });
});

server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(count => {
      res.status(200).json({ message: `hubs with id ${id} deleted` });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json({ error: 'failed to delete the hub from the db' });
    });
});

// listen for requests in a particular port on localhost
const port = 8000; // localhost:8000
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));



