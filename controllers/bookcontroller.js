const {db} = require('../firebase');

const addBook = async (req, res) => {
  const { title, author, publisher, isbn, year, copies, category, coverImage } = req.body;
  const newBook = { title, author, publisher, isbn, year, copies, category, coverImage };
  await db.collection('books').doc().set(newBook);
  res.status(201).send({ message: 'Book added successfully' });
};

module.exports = { addBook };
