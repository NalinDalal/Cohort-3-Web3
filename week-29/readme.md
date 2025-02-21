# External packages (crates)

ref - https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html

```rust
cargo add module_name
```

### Cargo.toml

![Screenshot 2025-02-21 at 3.52.25 PM.png](attachment:75ccae9f-f316-483c-b97f-4bc4a52bfae3:Screenshot_2025-02-21_at_3.52.25_PM.png)

```yaml
[package]
name = "rust"
version = "0.1.0"
edition = "2021"

[dependencies]
reqwest = "0.12.12"

```

### Features in external crates

You can optionally get `some features` of an external crate if you dont need the full crate/need some extra features when installing the crate.

```yaml
[dependencies]
reqwest = { version = "0.12.12", features = ["json"], }
serde = { version = "0.12.12", features = ["derive"] }
```

# Try some packages locally

1. chrono
2. dotenv
3. uuid
4. tui
5. thiserror
6. sqlx

### chrono

Chrono lets you do data and time in rust

[https://docs.rs/chrono/latest/chrono](https://docs.rs/chrono/latest/chrono/#features)

![Screenshot 2025-02-21 at 4.19.20 PM.png](attachment:e87ea703-ab7d-45e2-a066-3504ea3a18fd:Screenshot_2025-02-21_at_4.19.20_PM.png)

```rust
use chrono::{Local, Utc};

fn main() {
    let utc_time = Utc::now();
    let local_time = Local::now();
    println!("local time is {}", utc_time);
    println!("native time is {}", local_time);
}

```

### dotenv

```rust
use dotenv::dotenv;
use std::env;

fn main() {
  dotenv().ok();
  let var = env::var("REDIS_ADDRESS").unwrap();
  println!("{}", var);
}
```

### uuid

```rust
use uuid::Uuid;

fn main() {
  let random_uuid = Uuid::new_v4();
  println!("{}", random_uuid);
}

```

Cargo.toml

```rust
uuid = {version = "1.14.0", features = ["v4", "fast-rng"]}
```

<aside>
💡

If you dont add the `v4` feature, notice you cant access the new_v4 function

![Screenshot 2025-02-21 at 4.37.19 PM.png](attachment:eb2af0ff-5ba3-4441-8fa1-fb351eb2af75:Screenshot_2025-02-21_at_4.37.19_PM.png)

</aside>
