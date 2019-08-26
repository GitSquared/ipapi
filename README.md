# IPapi

***Note:*** *This API is no longer publicly hosted. You're welcome to run it yourself.*

---


[![Latest version](https://badgen.net/github/release/GitSquared/ipapi/stable)](https://github.com/GitSquared/ipapi/releases) [![License](https://badgen.net/github/license/GitSquared/ipapi)](https://github.com/GitSquared/ipapi/blob/master/LICENSE)

A simple API to get an IP address approximative lat/lon geographic coordinates programmatically. Written in Rust.

*warning: this repository makes use of [Git LFS](https://git-lfs.github.com) to keep track of the geoip database file.*

## Example:

Request:
`curl http://<endpoint>/125.45.67.18`

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
