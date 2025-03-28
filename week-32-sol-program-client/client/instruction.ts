import * as borsh from "borsh";

enum CounterInstructionType {
  Increment = 0,
  Decrement = 1,
}

class CounterInstruction {
  variant: CounterInstructionType;
  value: number;

  constructor(type: CounterInstructionType, value: number) {
    this.variant = type;
    this.value = value;
  }
}

const CounterInstructionSchema = new Map([
  [
    CounterInstructionType,
    {
      kind: 'enum',
      field: 'variant',
      values: [
        ['Increment', { kind: 'struct', fields: [['value', 'u32']] }],
        ['Decrement', { kind: 'struct', fields: [['value', 'u32']] }],
      ],
    },
  ],
]);

export function createIncrementInstructionData(value: number) {
  const instruction = new CounterInstruction(CounterInstructionType.Increment, value);
  return Buffer.from(borsh.serialize(CounterInstructionSchema as unknown as borsh.Schema, instruction));
}

export function createDecrementInstructionData(value: number) {
  const instruction = new CounterInstruction(CounterInstructionType.Decrement, value);
  return Buffer.from(borsh.serialize(CounterInstructionSchema as unknown as borsh.Schema, instruction));
}

export { CounterInstruction, CounterInstructionType, CounterInstructionSchema, createIncrementInstructionData, createDecrementInstructionData };
  