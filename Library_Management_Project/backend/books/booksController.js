const Books = require("./booksModel");

exports.addBook = async (req, res) => {
  const { bookId, isbn, bookName, author, count } = req.body;

  const book = new Books(bookId, isbn, bookName, author, count);

  try {
    const books = await book.saveBook();

    if (books.alreadyExisting) {
      res.status(400).send({ success: false, message: books.message });
    } else {
      res.status(200).send({ success: true, message: "Book saved" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
};

//Get all the books
exports.getBooks = async (req, res) => {
  try {
    const books = await Books.getAllBooks();

    if (books.length === 0) {
      res.status(404).send({ message: "No books found" });
    } else {
      res.status(200).send({ success: true, data: books });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
};

//Get Book by Id
exports.getBookById = async (req, res) => {
  let { bookId } = req.params;
  bookId = parseInt(bookId);

  try {
    const book = await Books.getBookById(bookId);
    res.status(200).send({ success: true, data: book });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
};

//Get Book by Name

exports.getBookByName = async (req, res) => {
  let { bookName } = req.params;

  try {
    const books = await Books.getBookByName(bookName);
    res.status(200).send({ success: true, data: books });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
};

//edit book name

exports.editBook = async (req, res) => {
  let { bookId, name } = req.body;
  try {
    const updated = await Books.editBookDetails(bookId, name);
    console.log("Edited");
    res.status(200).send({ success: true, data: updated });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
};
