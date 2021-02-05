import { Resolver, Query, Ctx, Arg, Mutation,  Int } from 'type-graphql';
import { Post } from '../entities/Post';
import { MyContext } from '../types';
import { idText } from 'typescript';

@Resolver()
export class PostResolver {
  @Query(() => Post, { nullable: true })
  post(@Arg('id') id: number, @Ctx() { em }: MyContext): Promise<Post | null> {
    return em.findOne(Post, { id });
  }
  @Mutation(() => Post)
  async createPost(
    @Arg('title') title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null>  {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = em.findOne(Post, { id });
    if (!post) {
      return null;
    }

    if (typeof title !== 'undefined') {
      // post.title = title;
      await em.persistAndFlush(post);
    }
    return post;
  }
}
