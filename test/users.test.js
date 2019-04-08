const { MongoClient } = require('mongodb');

const mongo = require('../source/db/mongo');
let connection;
let db;
const _id = '5c9205837329f7a656ebd3ea';
const user = {
  username: 'Test.DB11',
  firstName: 'Test',
  lastName: 'DB11'
};

describe('App module tests', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017');
    db = await connection.db('infoAppDB');
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should save users', async (done) => {
    const users = db.collection('users');
    await users.insertOne(Object.assign(user));
    expect(user.username).toBe('Test.DB11');
    done();
  });

  it('should get all users', (done) => {
    mongo.get();
    expect(user.username).toBe('Test.DB11');
    done();
  });

  it('should get user by username', async (done) => {
    const users = db.collection('users');
    const find = await users.findOne({ username: 'Test.DB11' });
    const expected = 'Test.DB11';
    const received = find.username;
    expect(received).toEqual(expected);
    done();
  });

  it('should delete user', () => {
    mongo.remove(_id, user);
  });
});
