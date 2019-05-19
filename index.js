const IPv4 = require('ip-address').Address4;
const IPv6 = require('ip-address').Address6;
const MongoClient = require('mongodb').MongoClient;

const dbUrl = process.env.DATABASE_URL;
const dbName = 'GeoIP';
const collName = 'City-Blocks-IPv4';
global.client = null;
global.data = null;

module.exports = async (req, res) => {
	if (global.client === null && !global.connecting) {
		global.connecting = true;
		global.client = await new MongoClient(dbUrl).connect().catch(err => { throw err });
		global.data = client.db(dbName).collection(collName);
		global.connecting = false;
	}

	let ip;
	if (req.url !== '/') {
		ip = req.url.substr(1);
	} else {
		req.headers['x-forwarded-for'] ? ip = req.headers['x-forwarded-for'] : ip = req.connection.remoteAddress;
	}

	let v6 = new IPv6(ip);
	let v4;
	if (v6.isValid()) {
		v4 = v6.to4();
	} else {
		v4 = new IPv4(ip);
	}

	if (!v4.isValid()) {
		res.writeHead(400);
		res.end('Bad IP');
		return;
	}

	function error(e) {
		res.writeHead(500);
		res.end(e || 'Internal error');
		return true;
	}

	let bits = v4.toArray();
	let rangeString = `${bits[0]}.${bits[1]}.0.0/24`;

	let failed = false;
	let doc = await global.data.findOne({'network': rangeString}).catch(err => { return error(err.message); });
	if (failed) return;

	if (doc === null) {
		res.writeHead(404);
		res.end('IP range not found');
		return true;
	}

	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	res.setHeader('Cache-Control', 's-maxage=172800, maxage=0');
	res.writeHead(200);
	res.end(JSON.stringify({
		api_version: '4.0.0',
		ip: v4.address,
		time: Date.now(),
		geo: {
			latitude: doc.latitude || null,
			longitude: doc.longitude || null,
			metro_code: null,
			time_zone: null
		}
	}));
};
