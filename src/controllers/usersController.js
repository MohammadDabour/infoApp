const { ObjectID } = require('mongodb');

const db = require('../db/mongo');


const saveUser = newUser => db.save(newUser);

const getUsers = () => db.get();

const getUserById = userID => new Promise(async (resolve, reject) => {
  const getID = { _id: ObjectID(userID) };
  try {
    const data = await db.get(getID);
    if (data.length !== 0) {
      resolve(data);
    } else {
 reject(new Error('user not found'));
}
  } catch (err) {
    reject(err);
  }
});

const deleteUser = (userID) => new Promise(async (resolve, reject) => {
  try {
    const deleteField = await db.remove(userID);
    if (deleteField) {
      resolve(deleteField);
    } else {
 reject(new Error('something wrong'));
}
  } catch (err) {
    reject(err);
  }
});

module.exports = {
  saveUser, getUsers, deleteUser, getUserById
};
