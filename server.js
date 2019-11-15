const express = require("express");
const app = express();
app.use(express.json());

const users = [
    {
        name: "user3",
        password: "pass",
        id: 3
    },
    {
        name: "user4",
        password: "pass",
        id: 4
    }
];

app.post("/api/users", (req, res) => {
    users.push(req.body);
    if(req.body.name && req.body.password)
        res.sendStatus(201);
    else
        res.sendStatus(400);
});

app.delete("/api/users/:id", (req, res) => {
    const idx = users.findIndex((obj) => req.params.id == obj.id);
    var user = {};
    
    if(idx >= 0) {
        user = {...users[idx]};
    }    

    res.status(200).json(user);
});

module.exports = app;