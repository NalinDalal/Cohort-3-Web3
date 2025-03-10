use borsh::{BorshDeserialize, BorshSerialize};
//48:55
#[derive(BorshSerialize, BorshDeserialize, Debug, PartialEq)]
struct MyStruct {
    id: u64,
    data: String,
    v: Vec<u32>,
}

fn main() {
    let original = MyStruct {
        id: 42,
        data: "Hello, Borsh!".into(),
        v: vec![1, 2, 3],
    };

    let mut buffer: Vec<u8> = Vec::new();
    original.serialize(&mut buffer).unwrap();

    // Deserialize
    let deserialized = MyStruct::try_from_slice(&buffer).unwrap();
    assert_eq!(original, deserialized);

    println!(
        "Successfully serialized and deserialized: {:?}",
        deserialized
    );
}
