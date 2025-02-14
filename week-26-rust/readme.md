# 31.01
it was hkirat's birthday

# 07.02
let's start with rust- fast and safe
already have installed rust locally, to check if exist->`cargo`
`cargo` is a package manager for rust

to run rust file: `rustc main.rs
./main  # Runs the compiled binary
`

to run via cargo, need to have a cargo.toml file; if cargo present-> `cargo main.rs`

function to check if number is even-> `iseven.rs`

program for string-> `string.rs`
for vector->`vector.rs`

conditionals->`bool.rs`

mutability: by default, all variables in rust are imutable. 
for mutable-> `mutable.rs`
ex:
```rs
fn main() {
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x isa {x}");
}
```

functions-> func.rs

## Ownership Rules
rules:
- Each value in Rust has an owner.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

wrong code:
```rs
fn main() {
    let str = String::from("Harkirat");
    let len = get_length(str);
    println!("{}", len);

    print!("{}", str);
}

fn get_length(str: String) -> usize {
    return str.len()
}
```
fails because the ownership of str is moved to the get_length function. Once the function’s scope ends, the str variable is no longer valid.


## Fix 1:Transfer back ownership
```rs
fn main() {
    let str = String::from("Harkirat");
    let (str, len) = get_length(str);
    println!("{} {}", str, len);
}

fn get_length(str: String) -> (String, usize) {
    let len = str.len();
    return (str, len);
}
```

## Fix 2: References/Borrowing
rather than transferring ownership, just borrow the variable
```rs
fn main() {
    let str = String::from("Harkirat");
    let len = get_length(&str);
    println!("{} {}", str, len);
}

fn get_length(str: &String) -> usize {
    let len = str.len();
    return len
}
```

pass a variable by reference, the variable is still owned by the first function

### Rules of borrowing -

1. You can only have one immutable reference. If there is an immutable reference, there cant be other immutable or mutable references
2. You can have multiple immutable references


