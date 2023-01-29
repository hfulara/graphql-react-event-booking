import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import isAuth from './middleware/isAuth.js';
import cors from 'cors';
import useHttpGraphQL from './middleware/graphqlHttpServer.js';
import useApolloGraphQLServer from './middleware/apolloGraphQLServer.js';

const app = express();
//const events = [];
app.use(bodyParser.json());

app.use(cors());

app.use(isAuth);

//useHttpGraphQL(app);
useApolloGraphQLServer(app);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster.wsevp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000);
    console.log('Server started');
  })
  .catch((err) => console.log(err));
