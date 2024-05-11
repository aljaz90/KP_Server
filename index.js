const express = require('express');
const mongoose = require('mongoose');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./graphql/Schema');
const resolvers = require('./graphql/Resolvers');

mongoose.connect('mongodb://localhost:27017/kp-rest-app');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const server = express();
server.all('/graphql', createHandler({ schema: schema, rootValue: resolvers }));

server.listen(4000, () => {
    console.log('Listening to port 4000');
});