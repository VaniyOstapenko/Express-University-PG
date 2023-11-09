const express = require('express');
const { getAllData, getUserById, createUsers, updateUsers, deleteUsers } = require('../service/user.service')

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const data = await getAllData()
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getUserById(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

route.post('/', async (req, res) => {
    try {
        const { birth, city, age, name, surname } = req.body;
        const data = await createUsers(birth, city, age, name, surname);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { birth, city, age, name, surname } = req.body;
        const data = await updateUsers(id, birth, city, age, name, surname);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteUsers(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = route;