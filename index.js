const express = require('express');
const mongoose = require('mongoose');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./graphql/Schema');
const resolvers = require('./graphql/Resolvers');
const userRoutes = require('./routes/users');
const invoiceRoutes = require('./routes/invoices');

mongoose.connect('mongodb://localhost:27017/kp-rest-app');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const server = express();

server.use('/users', express.urlencoded({ extended: true }), userRoutes);
server.use('/invoices', express.urlencoded({ extended: true }), invoiceRoutes);

server.all('/graphql', createHandler({ schema: schema, rootValue: resolvers }));

server.listen(4000, () => {
    console.log('Listening to port 4000');
});