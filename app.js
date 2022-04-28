const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const graphiQLSchema = require("./graphql/schema/index");
const graphiQLResolvers = require("./graphql/resolvers/index");
const mongoose = require("mongoose");
const isAuth = require("./middleware/isAuth");
const cors = require("cors");
const app = express();
//const events = [];
app.use(bodyParser.json());

app.use(cors());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp.graphqlHTTP({
    schema: graphiQLSchema,
    rootValue: graphiQLResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster.wsevp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000);
    console.log("Server started");
  })
  .catch((err) => console.log(err));
