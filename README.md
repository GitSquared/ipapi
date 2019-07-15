# IPapi

***Note:*** *due to Zeit's Now 2.0 new size limitation on lambdas (serverless instances), the API endpoint at `ipinfo.now.sh` is currently running from a temporary version of this API, which can be found on the `4.0.0-node` branch.*

*The `master` branch contains the Rust-written reproducible version of the endpoint that you can run on your own server/cloud deployment.*


---


[![Latest version](https://badgen.net/github/release/GitSquared/ipapi/stable)](https://github.com/GitSquared/ipapi/releases) [![License](https://badgen.net/github/license/GitSquared/ipapi)](https://github.com/GitSquared/ipapi/blob/master/LICENSE) [![Status](https://badgen.net/uptime-robot/status/m780808113-bb87869d57d6e78dcf1163a3)](https://stats.uptimerobot.com/l783guwKl) [![Uptime last month](https://badgen.net/uptime-robot/month/m780808113-bb87869d57d6e78dcf1163a3)](https://stats.uptimerobot.com/l783guwKl) [![Response time](https://badgen.net/uptime-robot/response/m780808113-bb87869d57d6e78dcf1163a3)](https://stats.uptimerobot.com/l783guwKl)

A simple API to get an IP address approximative lat/lon geographic coordinates programmatically. Written in Rust, deployed on Now.

*warning: this repository makes use of [Git LFS](https://git-lfs.github.com) to keep track of the geoip database file.*

## Example:

Request:
`curl https://ipinfo.now.sh/125.45.67.18`

Response:
```json
{
  "api_version": "3.0.0",
  "geo": {
    "latitude": 34.6836,
    "longitude": 113.5325,
    "time_zone": "Asia/Shanghai"
  },
  "ip": "125.45.67.18",
  "time": 1544969827
}
```
