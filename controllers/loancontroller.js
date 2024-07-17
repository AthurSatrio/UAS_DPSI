const {db} = require('../firebase');

const borrowBook = async (req, res) => {
  const { bookId } = req.body;
  const bookRef = db.collection('books').doc(bookId);
  const bookDoc = await bookRef.get();
  if (!bookDoc.exists || bookDoc.data().status === 'borrowed') {
    return res.status(400).send({ message: 'Book is not available' });
  }
  await bookRef.update({ status: 'borrowed' });
  await db.collection('loans').doc().set({ userId: req.user.userId, bookId, borrowedAt: new Date() });
  res.status(200).send({ message: 'Book borrowed successfully', returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) });
};

module.exports = { borrowBook };
