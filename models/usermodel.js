const bcrypt = require('bcrypt');
const {db} = require('../firebase');

const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  const userRef = db.collection('users').doc();
  await userRef.set(user);
  return userRef.id;
};

const getUserByEmail = async (email) => {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '==', email).get();
  if (snapshot.empty) {
    return null;
  }
  return snapshot.docs[0].data();
};

module.exports = { createUser, getUserByEmail };
