const booksController = require("./booksController");
const express = require("express");
const router = express.Router();

router.get("/", booksController.getBooks);
router.post("/", booksController.addBook);

router.get("/id/:bookId", booksController.getBookById);
router.get("/name/:bookName", booksController.getBookByName);
router.put("/", booksController.editBook);

module.exports = router;
