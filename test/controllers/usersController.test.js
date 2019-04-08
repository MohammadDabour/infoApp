jest.mock('../../source/db/mongo.js');

const { ObjectID } = require('mongodb');
const db = require('../../source/db/mongo');
const userController = require('../../source/controllers/usersController');

describe('User Controller Test: save user', () => {
  beforeEach(() => {
   db.save = jest.fn();
 });

  afterEach(() => {
     jest.restoreAllMocks();
     jest.resetAllMocks();
     jest.resetModules();
  });

  test('Save user', () => {
    const user = { test: 1 };
    userController.saveUser(user);
    expect(db.save).toHaveBeenCalledTimes(1);
    expect(db.save).toHaveBeenCalledWith(user);
  });
});

describe('User Controller Test: get users', () => {
  beforeEach(() => {
   db.get = jest.fn();
 });

  afterEach(() => {
     jest.restoreAllMocks();
     jest.resetAllMocks();
     jest.resetModules();
  });

  test('Get users', () => {
    userController.getUsers();
    expect(db.get).toHaveBeenCalledTimes(1);
    expect(db.get).toHaveBeenCalledWith();
  });
});

describe('User Controller Test: Get user by id', () => {
  beforeEach(() => {
   db.get = jest.fn(id => 'test result');
 });

  afterEach(() => {
     jest.restoreAllMocks();
     jest.resetAllMocks();
     jest.resetModules();
  });

  test('Get user by id',async () => {
    const user = '5c94a1b4de5a24c34410d7c2' ;
    const resutl = await userController.getUserById(user);
    expect(db.get).toHaveBeenCalledTimes(1);
    expect(db.get).toHaveBeenCalledWith({ _id: ObjectID(user) });
    expect(resutl).toBe('test result');
  });
});

describe('User Controller Test: Delete user by id', () => {
  beforeEach(() => {
   db.remove = jest.fn(id => 'test result');
 });

  afterEach(() => {
     jest.restoreAllMocks();
     jest.resetAllMocks();
     jest.resetModules();
  });

  test('Delete user by id',async () => {
    const user = '5c94a1b4de5a24c34410d7c2';
    const result = await userController.deleteUser(user);
    expect(db.remove).toHaveBeenCalledTimes(1);
    expect(db.remove).toHaveBeenCalledWith(user);
    expect(result).toBe('test result');
  });
});

