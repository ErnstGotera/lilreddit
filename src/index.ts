import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up;

};
