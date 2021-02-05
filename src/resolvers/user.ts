import { Resolver, Ctx, Arg, Mutation,  Int, InputType, Field } from 'type-graphql';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field() 
  username: string
  @Field() 
  password: string
}

@Resolver()
export class UserResolver {
  @Mutation(() => String)
 register(@Arg('options') options: UsernamePasswordInput, @Ctx() { em }: MyContext) {
    const hashedPassword
  }
}