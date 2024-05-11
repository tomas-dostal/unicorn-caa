const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const boardController = require("./controller/board");
const userController = require("./controller/user");
const taskController = require("./controller/task");
const priorityController = require("./controller/priority");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/board", boardController);
app.use("/user", userController);
app.use("/priority", priorityController);
app.use("/task", taskController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
