like json in js we have serde in rust to work with json data
add serde,serde json->`cargo add serde serde_json`

to use a macro from serde, add the derieve feature
now serialisation and deserialisation will be handled by it

parse a string to a struct, use `serde`
convert rust data into differenct format


# BORSH
Borsh (short for Binary Object Representation Serializer for Hashing) is a deterministic, binary serialization format often used in Rust (and other languages) to encode and decode data in a consistent, unambiguous way

import borsh library->
week 30.1->48:55

# Lifetimes
we have something known as scope,
a data type is called inside it's own scope itself
A lifetime is a construct the compiler (or more specifically, its borrow checker) uses to ensure all borrows are valid. Specifically, a variable's lifetime begins when it is created and ends when it is destroyed. While lifetimes and scopes are often referred to together, they are not the same.
Let's write a longer_str function that takes two strings as input and returns the longer one.

