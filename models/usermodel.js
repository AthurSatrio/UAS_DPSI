const { db } = require('../firebase');

// Create a new user
const createUser = async ({ name, email, password, role }) => {
  const userRef = db.collection('users').doc();
  await userRef.set({ name, email, password, role });
  return userRef.id;
};

// Get user by email
const getUserByEmail = async (email) => {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '==', email).get();
  
  if (snapshot.empty) {
    return null;
  }
  
  const userDoc = snapshot.docs[0];
  return { userId: userDoc.id, ...userDoc.data() };
};

module.exports = { createUser, getUserByEmail };
