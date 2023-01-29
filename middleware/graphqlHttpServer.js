import graphqlHttp from 'express-graphql';
import graphiQLSchema from '../graphql/schema/index.js';
import graphiQLResolvers from '../graphql/resolvers/index.js';

const useHttpGraphQL = (app) => {
  return app.use(
    '/graphql',
    graphqlHttp.graphqlHTTP({
      schema: graphiQLSchema,
      rootValue: graphiQLResolvers,
      graphiql: true,
    })
  );
};
export default useHttpGraphQL;