const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// routes - imports
const items = require("./routes/api/items");

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to mongo-db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongo connect success"))
  .catch((err) => console.log("mongo connect fail: ", err));

// routes - use
app.use("/api/items", items);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  // any request that we get not /api/items it will hit this
  app.get("*", (req, res) => {
    res.sendFile(__dirname, "client", "build", "index.html");
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
