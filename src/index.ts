import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { __prod__ } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Updoot } from "./entities/Updoot";
import path from "path";

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    database: 'lilreddit',
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Updoot]
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