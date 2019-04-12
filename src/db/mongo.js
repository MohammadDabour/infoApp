const { ObjectID } = require('mongodb');
const MongoDb = require('mongodb');

const enviroment = require('../environment/environment');

const getClient = () => new MongoDb.MongoClient(enviroment.mongodb.Mongo_DB_URL, { useNewUrlParser: true });

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
            resolve('User data is Saved');
          }
        });
      } else {
        reject(new Error('User already exists'));
      }
    }
    client.close();
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
          resolve(result);
        } reject(error);
      });
      client.close();
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
      });
    }
    client.close();
  });
});

module.exports = {
  save, remove, get
};
