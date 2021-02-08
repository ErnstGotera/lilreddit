import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { __prod__ } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { Post } from 'entities/Post';
import { User } from 'entities/User'; 

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'lilreddit',
    logging: true,
    synchronize: true,
    entities: [Post, User]
  })

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ PostResolver, UserResolver],
      validate: false,
    }),
  });
  apolloServer.applyMiddleware({ app });

 app.listen(4000, () => {
    console.log('Server started');
  });
};

main().catch((err) => {
  console.error(err)
})