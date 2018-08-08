extern crate maxminddb;
#[macro_use] extern crate rouille;
#[macro_use] extern crate serde_json;

use rouille::Response;
use maxminddb::geoip2;
use std::str::FromStr;
use std::net::IpAddr;
use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
    println!("Loading GeoIP database");
    let reader = maxminddb::Reader::open("./GeoLite2-City/GeoLite2-City.mmdb").unwrap();

    println!("Starting HTTP web server");

    rouille::start_server("127.0.0.1:8000", move |request| {
        router!(request,
            (GET) (/) => {
                let ip = IpAddr::from_str(request.header("x-forwarded-for").unwrap_or("")).unwrap_or(request.remote_addr().ip());

                return ip_request_handler(ip, &reader);
            },

            (GET) (/{raw_ip: String}) => {
                let ip: IpAddr = match IpAddr::from_str(&raw_ip) {
                    Ok(ip) => ip,
                    Err(_) => {
                        return Response::json(&json!({"ip": "invalid"})).with_status_code(400);
                    }
                };

                return ip_request_handler(ip, &reader);
            },

            _ => Response::empty_404()
        )
    });
}

fn ip_request_handler(ip: IpAddr, reader: &maxminddb::Reader) -> Response {
    if ip.is_loopback() {
        return Response::json(&json!({"ip": "localhost"})).with_status_code(400);
    } else {
        let city: geoip2::City = match reader.lookup(ip) {
            Ok(city) => city,
            Err(_) => {
                return Response::json(&json!({
                    "ip": ip,
                    "geo": "unknown"
                })).with_status_code(400);
            }
        };

        let now = SystemTime::now();
        let timestamp = now.duration_since(UNIX_EPOCH)
                        .expect("Time went backwards");
        return Response::json(&json!({
            "ip": ip,
            "geo": city,
            "time": timestamp.as_secs(),
            "api_version": "2.0.0"
        }));
    }
}
