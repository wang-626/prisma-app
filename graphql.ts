import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { findUser, findAllUser, createUser } from "./prisma";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "return user email name",
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "Root query",
  fields: {
    user: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log(args);
        return findUser(args.email, args.password);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return findAllUser();
      },
    },
  },
});

const RootMutationType = new GraphQLObjectType({
  name: "mutation",
  description: "root mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        age: { type: GraphQLString },
      },
      resolve(parent, args) {
        return createUser(args.name, args.email, args.password, args.age);
      },
    },
  },
});

export var schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
