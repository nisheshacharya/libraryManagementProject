// const { ObjectId } = require("mongodb");
const { getDb } = require("../database");

class Books {
  constructor(bookId, isbn, bookName, author, count) {
    this.bookId = bookId;
    this.bookName = bookName;
    this.isbn = isbn;
    this.author = author;
    this.count = count;
  }

  //Save book
  async saveBook() {
    const db = getDb();
    try {
      const existing = await db
        .collection("books")
        .findOne({ bookId: this.bookId });

      if (existing) {
        return { alreadyExisting: true, message: "Book already exists" };
      } else {
        return db.collection("books").insertOne(this);
      }
    } catch (error) {
      console.error("Error saving book");
    }
  }

  //Get all books
  static async getAllBooks() {
    const db = getDb();

    try {
      let books = await db.collection("books").find({}).toArray();
      return books;
    } catch (error) {
      console.error("Error getting books");
    }
  }

  //Get book by book Id
  static async getBookById(id) {
    const db = getDb();

    try {
      const bookById = await db.collection("books").findOne({ bookId: id });
      return bookById;
    } catch (error) {
      console.error("Error getting the book");
    }
  }

  // Get book by name

  static async getBookByName(bookName) {
    const db = getDb();
    console.log("book name: ", bookName);

    try {
      const books = await db
        .collection("books")
        .find({ bookName: bookName })
        .toArray();
      return books;
    } catch (error) {
      console.error("Error getting book by name");
    }
  }

  //Edit book

  static async editBookDetails(bookId, name) {
    const db = getDb();
    console.log(bookId, name);
    try {
      const edited = await db
        .collection("books")
        .findOneAndUpdate(
          { bookId: bookId },
          { $set: { bookName: name } }
          
        );
      console.log("---------------", edited);
      return edited.value;
    } catch (error) {
      console.log("Error occurred while editing.");
    }
  }
}

module.exports = Books;
