14.10.2024

Hashing is a process that transforms input data (of any size) into a fixed-size string of characters.

Hash functions have several important properties:
1. Deterministic: The same input will always produce the same output.
2. Fast computation: The hash value can be quickly computed for any given data.
3. Pre-image resistance: It should be computationally infeasible to reverse the hash function (i.e., find the original input given its hash output).
4. Small changes in input produce large changes in output: Even a tiny change in the input should drastically change the hash output.
5. Collision resistance: It should be computationally infeasible to find two different inputs that produce the same hash output.

# SHA-256
Lets try out a famous hash function, SHA-256 here - `https://emn178.github.io/online-tools/sha256.html`

sample hashing -> `1.js`

# Intro to Proof of work
- Assignment #1

What if I ask you the following question — 
Give me an input string that outputs a SHA-256 hash that starts with `00000` . How will you do it?
A: You will have to brute force until you find a value that starts with `00000`

`2.js`

- Assignment #2

What if I ask you that the `input string` should start with `100xdevs` ? How would the code change?
`3.js`
