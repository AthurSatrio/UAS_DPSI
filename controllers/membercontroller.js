const {db} = require('../firebase');

const addMember = async (req, res) => {
  const { name, nim, programStudi, alamat } = req.body;
  const newMember = { name, nim, programStudi, alamat };
  await db.collection('members').doc().set(newMember);
  res.status(201).send({ message: 'Member added successfully' });
};

module.exports = { addMember };
