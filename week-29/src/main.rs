struct Rect<T> {
    width: T,
    height: T,
}
/*impl<T> std::ops::Mul<Output = T> for Rect<T> {
    fn area(&self) -> T {
        return self.width * self.height;
    }
}*/

//correct:
impl<T> Rect<T>
where
    T: std::ops::Mul<Output = T> + Copy,
{
    fn area(&self) -> T {
        self.width * self.height
    }
}
fn main() {
    let r = Rect {
        width: 10,
        height: 10,
    };
    let r1 = Rect {
        width: 10.0,
        height: 10.0,
    };
    print!("{}", r.area());
    print!("{}", r1.area());
}
