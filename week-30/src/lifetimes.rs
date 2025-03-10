fn main() {
    let str1 = String::from("Nalin");
    //let str2 = String::from("Dalal");

    //let ans = longest_str(&str1, &str2);
    //println!("{}", ans);
    let s1 = String::from("Harkirat");
    let ans;

    {
        let str2: String = String::from("");
        let s2 = String::from("Dalal");
        ans = longest_str(&str1, &str2);

        println!("{}", ans);
    }
    //dangling pointer error if s2>s1
}

/*fn longest_str(s1: &String, s2: &String) -> &String {-> problem for lifetime; use annotation

    if s1.len() > s2.len() {
        return s1;
    } else {
        return s2;
    }
}
*/
//say if s2 is only in a scope of s1 and s2 is longer then it gives dangling pointer error
/*fn longest_str<'a, 'b>(str1: &'a String, str2: &'b String) -> &'a String {
    return str2;//lifetime may not live long enough
}*/
//valid but life time may expire;solution-> give both same lifetime
fn longest_str<'a>(s1: &'a String, s2: &'a String) -> &'a String {
    if s1.len() > s2.len() {
        return s1;
    }
    return s2;
}
