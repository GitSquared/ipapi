const express = require("express");
const app = express();

app.get('/', (req, res) => {
    console.log("Served a request");
    res.send("Gotcha!");
});

app.listen(80, () => {
    console.log("IPapi running!");
});
