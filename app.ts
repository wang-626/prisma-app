import express, { Request, Response } from "express";
var cors = require("cors");
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql";

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

app.use(cors(corsOptionsDelegate));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port: Number = 4000;
app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});
