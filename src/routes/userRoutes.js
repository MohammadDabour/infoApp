const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', async (req, res) => {
  try {
    const users = await usersController.getUsers();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  const userID = req.params.id;
  try {
    if (userID) {
      const userId = await usersController.getUserById(userID);
      res.status(200).send(JSON.stringify(userId, null, 2));
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  const newUser = req.body;
  try {
    const result = await usersController.saveUser(newUser);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  const userID = req.params.id;
  try {
    if (userID) {
      await usersController.deleteUser(userID);
      res.status(200).send(`User (ID :${userID} ) Deleted`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;
