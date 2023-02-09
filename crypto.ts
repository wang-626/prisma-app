const { createHmac } = require("node:crypto");
require("dotenv").config();

function encryption(secret: string) {
  const hash = createHmac("sha256", secret)
    .update(process.env["salt"])
    .digest("hex");
  return hash;
}
