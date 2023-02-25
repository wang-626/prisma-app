import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";
import {
  findUser,
  findAllUser,
  createUserByEmail,
  deleteUser,
  userLogin,
  verifyLoginToken,
} from "./prisma";

const LoginTokenType = new GraphQLObjectType({
  name: "LoginToken",
  description: "LoginToken",
  fields: () => ({
    id: { type: GraphQLString },
    device: { type: GraphQLString },
    userId: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "return user email name",
  fields: () => ({
    id: { type: GraphQLString },
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
    createUserByEmail: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLString },
      },
      resolve(parent, args) {
        let result = createUserByEmail({
          name: args.name,
          email: args.email,
          password: args.password,
          age: args.age,
        })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err;
          });

        return result;
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return deleteUser(args.email);
      },
    },
    userLogin: {
      type: LoginTokenType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return userLogin(args.email, args.password);
      },
    },
    verifyLoginToken: {
      type: GraphQLBoolean,
      args: {
        loginToken: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return verifyLoginToken(args.loginToken);
      },
    },
  },
});

export var schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
