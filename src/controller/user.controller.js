const express = require('express');
const { getAllData, getUserById, createUsers, updateUsers, deleteUsers } = require('../service/user.service');
const { buildResponse } = require('../helper/buildResponse');
const { isValidById, isValidBody } = require('../helper/validation');

const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const data = await getAllData();
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/:id', isValidById, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post('/', isValidBody, async (req, res) => {
  try {
    const { birth, city, age, name, surname } = req.body;
    const data = await createUsers(birth, city, age, name, surname);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.put('/:id', isValidById, isValidBody, async (req, res) => {
  try {
    const { id } = req.params;
    const { birth, city, age, name, surname } = req.body;
    const data = await updateUsers(id, birth, city, age, name, surname);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.delete('/:id', isValidById, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUsers(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
