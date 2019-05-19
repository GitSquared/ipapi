# IPapi

### Important note: I had to quickly make a Now v2 compatible version and shutdown the Rust version running on Now v1. Hopefully API service won't be too much affected, and I'm working on a stable solution.

[![Latest version](https://badgen.net/github/release/GitSquared/ipapi/stable)](https://github.com/GitSquared/ipapi/releases) [![Build Status](https://travis-ci.org/GitSquared/ipapi.svg?branch=master)](https://travis-ci.org/GitSquared/ipapi) [![License](https://badgen.net/github/license/GitSquared/ipapi)](https://github.com/GitSquared/ipapi/blob/master/LICENSE) [![Deploy on Now](https://badgen.net/badge/%E2%96%B2/$%20now%20GitSquared%2Fipapi/222)](https://zeit.co/now)

[![Status](https://badgen.net/uptime-robot/status/m780808113-bb87869d57d6e78dcf1163a3)](https://stats.uptimerobot.com/l783guwKl) [![Uptime last month](https://badgen.net/uptime-robot/month/m780808113-bb87869d57d6e78dcf1163a3)](https://stats.uptimerobot.com/l783guwKl) [![Response time](https://badgen.net/uptime-robot/response/m780808113-bb87869d57d6e78dcf1163a3)](https://stats.uptimerobot.com/l783guwKl)

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
