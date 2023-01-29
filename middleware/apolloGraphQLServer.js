import { ApolloServer } from 'apollo-server-express';
import { readFile } from 'fs/promises';
import resolvers from '../apollo/resolver/index.js';

const useApolloGraphQLServer = async (app) => {
  const typeDefs = await readFile('./apollo/schema.graphql', 'utf-8');
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => req,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
};

export default useApolloGraphQLServer;
