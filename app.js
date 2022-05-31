const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
