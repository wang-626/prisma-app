import express, { Request, Response } from "express";
var cors = require("cors");
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql";
import { findAllUser } from "./prisma";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var whitelist = ["http://127.0.0.1:3000"];
var corsOptionsDelegate = function (req: any, callback: any) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.get("/", async function (req, res) {
  try {
    const users = await findAllUser();
    res.send(users);
  } catch {
    res.send("err");
  }
});

app.use(cors(corsOptionsDelegate));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port: Number = 8080;
app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});
