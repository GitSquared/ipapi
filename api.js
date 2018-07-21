const geolite2 = require("geolite2");
const maxmind = require("maxmind");

const geolookup = maxmind.openSync(geolite2.paths.city);

var reqcounter = 0;

setInterval(() => {
    console.log(`Served ${reqcounter} requests in the last hour.`);
    reqcounter = 0;
}, 3600000);

module.exports = (req, res) => {
    if (req.url !== "/") {
        res.setHeader("content-type", "text/plain; charset=utf-8");
        res.writeHead(404);
        res.end("404 Not Found");
    } else {
        let ip;
        req.headers['x-forwarded-for'] ? ip = req.headers['x-forwarded-for'] : ip = req.connection.remoteAddress;

        ip = ip.split(",")[0];

        if (maxmind.validate(ip) && !ip.endsWith("127.0.0.1")) {
            reqcounter++;
            let geo = geolookup.get(ip);

            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.writeHead(200);
            res.end(JSON.stringify({
                ip,
                geo,
                time: Math.round(Date.now()/1000)
            }));
        } else {
            console.log("Error: Bad IP");
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.writeHead(400);
            res.end("Bad IP");
        }
    }
};
