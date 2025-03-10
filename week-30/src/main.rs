use serde::{Deserialise, Serialise};
mod borsh;
mod lifetimes;
mod serde;
#[derive(Serialize, Deserialize, Debug, Clone)]
struct User {
    username: String,
    password: String,
}

struct Person {
    name: String,
    age: u32,
}
fn main() {}
