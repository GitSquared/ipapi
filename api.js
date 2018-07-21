const express = require("express");
const app = express();

const geolite2 = require("geolite2");
const maxmind = require("maxmind");

const geolookup = maxmind.openSync(geolite2.paths.city);

app.get('/', (req, res) => {
    if (req.ip) {
        console.log("Served a request");
        let city = geolookup.get(req.ip);

        res.status(200).json({
            ip: req.ip,
            city
        });
    } else {
        res.status(400).json({error: "Could'nt retrieve IP address. Are you using a proxy?"});
    }
});

app.listen(80, () => {
    console.log("IPapi running!");
});
