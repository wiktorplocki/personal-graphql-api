const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const gqlSchema = require('./schemas');
const gqlResolver = require('./resolvers');
const isAuth = require('./middleware/auth');
const cors = require('./middleware/cors');

const app = express();

app.use(express.json());
app.use(cors);
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
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${
      process.env.MONGO_URL
    }`,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to DB'))
  .catch(err => {
    throw new Error(err);
  });

app.listen(process.env.PORT, () =>
  console.log(`Server running at port ${process.env.PORT}`)
);

module.exports = app;
