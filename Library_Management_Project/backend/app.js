const express = require("express");
const bookRouter = require("./books/booksRouter");
const cors = require("cors");
const { connectToDB } = require("./database");
const port = 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/books", bookRouter);

app.listen(port, () => {
  console.log("Listening on 8080");
});

connectToDB();
