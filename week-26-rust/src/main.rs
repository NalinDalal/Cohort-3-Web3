fn main() {
    //main is entry point of the program
    println!("Hello, world!"); //it prints to screen, note: println! is a macro{some diff library
                               //or function defined somewhere else, which gets cimpiled}
    println!("{}", sum(1, 2)); //like \n in cpp etc
    let ans: u32 = sum(1, 2); //u32 is data type
    println!("{}", ans);
}

fn sum(a: u32, b: u32) -> u32 {
    //function definition, says it returns a u32 type value
    return a + b;
}
