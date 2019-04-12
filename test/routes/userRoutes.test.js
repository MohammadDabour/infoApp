jest.mock('../../src/controllers/usersController');
jest.mock('../../src/db/mongo.js');

const request = require('supertest');
const app = require('../../index');
const usersController = require('../../src/controllers/usersController');


describe('User Routes Test: Get', () => {
  beforeEach(() => {
    usersController.getUsers = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
  });


  test('Get all users', async () => {
    usersController.getUsers.mockImplementation(() => {
      return Promise.resolve({ username: 'Test.1' });
    });

    await request(app)
      .get('/users')
      .expect(200)
      .then(response => {
        expect(response.text).toMatch('{\"username\":\"Test.1\"}');
      });
  });

  test('Error: Get for all users', async () => {
    usersController.getUsers.mockImplementation(() => {
      return Promise.reject('Error');
    });

    await request(app)
      .get('/users')
      .expect(500)
      .then(response => {
        expect(response.text).toMatch('Error');
      });
  });
});

describe('User Routes Test: Get by ID', () => {
  beforeEach(() => {
    usersController.getUserById = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
  });


  test('Get user by ID', async () => {
    usersController.getUserById.mockImplementation(() => {
      return Promise.resolve({ _id: '5c94a1b4de5a24c34410d7c2' });
    });
    const parmas = { id: '5c94a1b4de5a24c34410d7c2' };

    await request(app)
      .get('/users/:id')
      .expect(200)
      .query(parmas)
      .then(response => {
        expect(usersController.getUserById).toBeCalledWith(':id');
        expect(response.text).toMatch('{\n  "_id": "5c94a1b4de5a24c34410d7c2"\n}');
      });
  });

  test('Error: Get user by ID', async () => {
    usersController.getUserById.mockImplementation(() => {
      return Promise.reject(new Error('user not found'));
    });
    const parmas = { _id: '5c94a1b4de5a24c34410d7c2' };

    await request(app)
      .get('/users/:id')
      .expect(500)
      .query(parmas)
      .then(response => {
        expect(response.text).toEqual('user not found');
      });
  });
});


describe('User Routes Test: Post', () => {
  beforeEach(() => {
    usersController.saveUser = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
  });


  test('Save user', async () => {
    usersController.saveUser.mockImplementation(() => {
      return Promise.resolve({
        username: 'Test.Post',
        firstName: 'Test',
        lastName: 'Post'
      });
    });
    const body = {
      'username': 'Test.Post',
      'firstName': 'Test',
      'lastName': 'Post'
    };

    await request(app)
      .post('/users')
      .expect(200)
      .send(body)
      .then(response => {
        expect(response.text).toEqual('{"username":"Test.Post","firstName":"Test","lastName":"Post"}');
      });
  });

  test('Error: Save user', async () => {
    usersController.saveUser.mockImplementation(() => {
      return Promise.reject(new Error('User already exists'));
    });
    const body = {
      'username': 'Test.Post',
      'firstName': 'Test',
      'lastName': 'Post'
    };

    await request(app)
      .post('/users')
      .expect(500)
      .send(body)
      .then(response => {
        expect(response.text).toEqual('User already exists');
      });
  });
});

describe('User Routes Test: Delete by ID', () => {
  beforeEach(() => {
    usersController.deleteUser = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
  });


  test('Delete user by ID', async () => {
    usersController.deleteUser.mockImplementation(() => {
      return Promise.resolve({ _id: '5c94a1b4de5a24c34410d7c2' });
    });
    const parmas = { id: '5c94a1b4de5a24c34410d7c2' };

    await request(app)
      .delete('/users/:id')
      .expect(200)
      .query(parmas)
      .then(response => {
        expect(usersController.deleteUser).toBeCalledWith(':id');
        expect(response.text).toMatch('User (ID ::id ) Deleted');
      });
  });

  test('Error: Delete user by ID', async () => {
    usersController.deleteUser.mockImplementation(() => {
      return Promise.reject(new Error('something wrong'));
    });
    const parmas = { _id: '5c94a1b4de5a24c34410d7c2' };

    await request(app)
      .delete('/users/:id')
      .expect(500)
      .query(parmas)
      .then(response => {
        expect(response.text).toEqual('something wrong');
      });
  });
});
