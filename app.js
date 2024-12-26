const express = require("express");
const cors = require("cors");
const mongooseDB = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongooseDB();

app.use("/api/v1", require("./routes/v1"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
