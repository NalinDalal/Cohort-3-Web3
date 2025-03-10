use serde::{Deserialize, Serialize};
use serde_json::{self, Value};
#[derive(Serialize, Deserialize, Debug, Clone)]
struct User {
    username: String,
    password: String,
}

struct Person {
    name: String,
    age: u32,
}

fn main() {
    let s = String::from("{\"username\": \"harkirat\", \"password\": \"123123\"}");

    //let u: Result<User, serde_json::Error> = serde_json::from_str(&s).unwrap();

    match u {
        Ok(user) => println!("{:?}", u),
        Err(e) => print!("there was an error"),
    }
    //println!("{:?}", u.unwrap());
    let person = Person {
        name: String::from("John Doe"),
        age: 30,
    };

    //Serialise to JSON
    let json_str = serde_json::to_string(&person).unwrap();
    println!("Serialised JSON: {}", json_str);

    //Deserialise from JSON
    let deserialized_person: Person = serde_json::from_str(&json_str).unwrap();
    println!("Deserialized Person: {:?}", deserialized_person)
}
