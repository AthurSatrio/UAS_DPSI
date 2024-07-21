const {db} = require('../firebase');

const addBook = async (req, res) => {
  const { title, author, publisher, isbn, year, copies, category, coverImage } = req.body;
  const newBook = { title, author, publisher, isbn, year, copies, category, coverImage };
  await db.collection('books').doc().set(newBook);
  res.status(201).send({ message: 'Book added successfully' });
};
const getBooks = async (req, res) => {
  try {
    const booksSnapshot = await db.collection('books').get();
    const books = [];
    booksSnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: 'Error getting books', error });
  }
};

module.exports = { addBook, getBooks };
