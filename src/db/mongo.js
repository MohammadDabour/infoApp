const { ObjectID } = require('mongodb');
const MongoDb = require('mongodb');

const getClient = () => new MongoDb.MongoClient('mongodb://mongo:27017', { useNewUrlParser: true });

const save = obj => new Promise((resolve, reject) => {
  const client = getClient();
  client.connect(async (err) => {
    if (!err) {
      const db = client.db('infoAppDB');
      const users = db.collection('users');
      const check = await users.find({ username: obj.username }).toArray();
      if (check.length === 0) {
      users.insertOne(Object.assign(obj, { _id: new ObjectID() }), (error) => {
        if (!error) {
          return resolve('User data is Saved');
        }
          });
      } else {
        reject(new Error('User already exists'));
      }
    }
  });
});

const get = (obj = {}) => new Promise((resolve, reject) => {
  const client = getClient();
  client.connect((err) => {
    if (!err) {
      const db = client.db('infoAppDB');
      const users = db.collection('users');
      users.find(obj).toArray((error, result) => {
        if (result) {
          return resolve(result);
        } return reject(error);
      });
    }
  });
});

const remove = (objID) => new Promise((resolve, reject) => {
  const client = getClient();
  client.connect((err) => {
    if (!err) {
      const db = client.db('infoAppDB');
      const users = db.collection('users');
      const query = { _id: ObjectID(objID) };
      users.deleteOne(query, (error, result) => {
      if (error) {
            reject(new Error('Unable to delete User'));
          }
          resolve(result);
          client.close();
        });
      }
  });
});

module.exports = {
  save, remove, get
};
