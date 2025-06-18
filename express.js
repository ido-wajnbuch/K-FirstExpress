//Import
import { create } from 'domain';
import { InMemoryStorage } from './mamas-storage/inMemoryStorage.js';
import express from 'express'

const app = express();
let o = new InMemoryStorage();
o.create("users", {
    firstName: "ido",
    lastName: "wajnbuch",
    email: "idoyosefw@gmail.com",
    password: "banban161",
    age: 18,
    createdAt: (new Date()).toLocaleString(),
    updatedAt: (new Date()).toLocaleString(),
    tests: o.create("tests", {
        date: (new Date()).toLocaleString(),
        name: "ido",
        grade: 100
    })
});


app.get('/api/users', (req, res) => {
    res.send(o.data['users']);
});

app.get('/api/users/:userId/tests', (req, res) => {
    const {userId} = req.params;
    res.send(o.find('users', obj => obj._id === userId)[0].tests);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});