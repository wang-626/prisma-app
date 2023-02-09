import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { findUser, findAllUser } from "./prisma";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "return user email name",
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "Root query",
  fields: {
    user: {
      type: UserType,
      resolve() {
        return findUser();
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

export var schema = new GraphQLSchema({
  query: RootQueryType,
});
