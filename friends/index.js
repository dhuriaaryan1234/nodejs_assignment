import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();

import Friend from './models/Friend.js';

mongoose.connect('url')
    .then(() => console.log("Database connected."))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/friends', async (req, res) => {
    const data = await Friend.find().select('id name -_id');
    res.send(data);
});

app.get('/friends/:id', async (req, res) => {
    const friend = await Friend.find({ id: req.params.id }).select('id name -_id');
    res.send(friend[0] ?? {});
});

app.post('/friends', async (req, res) => {
    const { id, name } = req.body;
    try {
        const newFriend = await Friend.create({ id, name });
        res.send({ id: newFriend.id, name: newFriend.name });
    } catch (error) {
        res.sendStatus(400);
    }
});

app.listen(3000, () => console.log("Server started"));