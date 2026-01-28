const express = require("express");

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
    res.send("Welcome to Expressjs Backend!");
});

// app.get("/user", (req, res) => {
//     res.send("<h1>this is users page</h1>");
// });

app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`You are requesting for user: ${userId}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});