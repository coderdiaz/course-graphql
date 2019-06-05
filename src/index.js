import 'dotenv/config';
import express from 'express';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import schema from './schema';
import resolvers from './resolvers';

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 8080;
const app = express();

// Added schema definitions and resolvers
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configured GraphQL route
app.use('/graphql', graphqlExpress((req) => {
  return {
    schema: executableSchema,
    context: {},
  };
}));

// Configured GraphiQL
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// App listening event
app.listen(GRAPHQL_PORT, () => {
  console.log(`GraphQL Server: Now running on https://localhost:${GRAPHQL_PORT}/graphql`);
});