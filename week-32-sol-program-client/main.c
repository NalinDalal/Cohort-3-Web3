// main.c
#include "mylib.h" // Include the Rust header file
#include <stdio.h>

int main() {
  int input = 5;
  int result = double_value(input); // Call the Rust function
  printf("The result is: %d\n", result);
  return 0;
}
