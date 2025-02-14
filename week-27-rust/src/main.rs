fn main() {
    let str: String = String::from("Harkirat");
    let len: usize = get_length(str);
    println!("{}", len);
    get_length(str);
}

fn get_length(str: String) -> usize {
    return str.len();
}
