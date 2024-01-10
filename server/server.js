const { ApolloServer } = require('apollo-server-express'); // Make sure to import from apollo-server-express
const express = require('express');


const fs = require('fs');
const path = require('path');

// Read the schema file
const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

// Create the GraphQL type definitions
// const typeDefs = gql`${schema}`;


// mongoDb connection
const mongoose = require('mongoose');
const dbConfig = require('./database.js');

// schema db
const User = require('./models/User.js');
const Company = require('./models/Company.js');

// gql schema and resolvers
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  // Add the server.start() call
  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect('mongodb://localhost:27017/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

  app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();