import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

const test = new GraphQLObjectType({
  name: "helloType",
  description: "first",
  fields: {
    name: {
      type: GraphQLString,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return "hello" + args.name;
      },
    },
  },
});

export var schema = new GraphQLSchema({
  query: test,
});
