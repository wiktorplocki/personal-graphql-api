const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const gqlSchema = require('./schemas');
const gqlResolver = require('./resolvers');
const isAuth = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(isAuth);
app.use(
  '/api',
  graphqlHTTP({
    schema: gqlSchema,
    rootValue: gqlResolver,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${
      process.env.MONGO_URL
    }`,
    { useNewUrlParser: true }
  )
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on port ${process.env.PORT}`)
    )
  )
  .catch(err => {
    throw new Error(err);
  });

module.exports = app;
