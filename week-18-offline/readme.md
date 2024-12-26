# Local Development in ETH

Well we can do online Development on Remix
but local is local for like ci/cd etc
While this works, as your project grows and you work in a team, the contract needs to be

1. Maintained by various users
2. Tested and built
3. Deployed periodically

For this, you can use local development tools that let you start the blockchain locally and deploy contracts on it

Tools: Ganache, Trufle
Ganache: Ganache is used for starting/creating ethereum blockchain locally for testing.
It is similar to `solana-test-validator` that lets you start solana locally.
![Ganache](https://archive.trufflesuite.com/ganache/)

Truffle: Local Development, Testing Framework, CI/CD etc
Depreciated

# ![HardHat](https://hardhat.org/)

HardHat is new Standard

# ![Foundry](https://github.com/foundry-rs/foundry)

It has 4 parts

- [**Forge**](https://github.com/foundry-rs/foundry/blob/master/crates/forge): Ethereum testing framework (like Truffle, Hardhat).
- [**Cast**](https://github.com/foundry-rs/foundry/blob/master/crates/cast): Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- [**Anvil**](https://github.com/foundry-rs/foundry/blob/master/crates/anvil): Local Ethereum node, akin to Ganache, Hardhat Network.
- [**Chisel**](https://github.com/foundry-rs/foundry/blob/master/crates/chisel): Fast, utilitarian, and verbose solidity REPL.

## Installing Foundry

```term
curl -L https://foundry.paradigm.xyz | bash
source /Users/nalindalal/.zshenv
foundryup
```

Initialise Forge Project

```bash
forge init --template https://github.com/foundry-rs/forge-template hello_template
```

their is a contract and test contract, to test run -> `forge test`

# Installing external packages

### Approach #1

Using `forge install`

### Openzepplin

Ref https://docs.openzeppelin.com/contracts/5.x/

```jsx
forge install OpenZeppelin/openzeppelin-contracts
```

### Update/add `remappings.txt`

```jsx
@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/
```

### Approach #2

Using npm

```jsx
npm install @openzeppelin/contracts
```

Update/add `remappings.txt`

```jsx
@openzeppelin/contracts/=node_modules/@openzeppelin/contracts
```

<aside>
💡

You can also run `forge remappings` to confirm things are working as expected

</aside>

# Std libraries

### Console Logging

Ref - https://book.getfoundry.sh/reference/forge-std/console-log?highlight=console#console-logging

To log statements, you can use Console from the forge std library

```jsx
import {console} from "forge-std/Test.sol";

function _spendAllowance(address owner, address spender, uint256 value) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        console.log(currentAllowance);
        console.log(owner);
        console.log(spender);

        if (currentAllowance != type(uint256).max) {
            if (currentAllowance < value) {
                revert ERC20InsufficientAllowance(spender, currentAllowance, value);
            }
            unchecked {
                _approve(owner, spender, currentAllowance - value, false);
            }
        }
    }
```

It has functions like

```jsx
console.logInt(int i)
console.logUint(uint i)
console.logString(string memory s)
console.logBool(bool b)
console.logAddress(address a)
```

## hoax

`hoax` is a combination of pranking followd by deal

```jsx
vm.hoax(address, value);
```

- `address`: The address from which the transaction will be sent (it overrides the default sender for the transaction).
- `value`: The amount of ETH to set on that address

<aside>
💡

The effect of `vm.hoax` **only applies to the current (upcoming) transaction** and **does not carry over to subsequent transactions**. After the transaction completes, the context reverts to the original `msg.sender`.

</aside>

### deal

`deal` is used to set a specific **balance** for an address in your test environment. It is useful for testing scenarios where you need to ensure that a particular address has a certain amount of ETH or tokens, or when simulating an account having specific balances before interacting with contracts.

```jsx
function test_DealExample() public {
    address account = address(0x123);
    uint256 balance = 10 ether;

    // Set the balance of `account` to `10 ether`
    vm.deal(account, balance);

    // Assert that the balance is set correctly
    assertEq(address(account).balance, balance);
}
```

### `prank` vs `startPrank` vs `stopPrank`

`vm.prank(address)` is a **shorthand** function that allows you to impersonate an address **for just one transaction**.

`vm.startPrank(address)` will start it for all upcoming txns

`vm.stopPrank()` will stop the prank for all following txns

# Assignments

- Assignment #1 (deal)
  ```jsx
  pragma solidity ^0.8.0;

  contract Deposit {
      uint256 public minimumDeposit = 1 ether;

      function deposit() external payable {
          require(msg.value >= minimumDeposit, "Deposit is below minimum");
      }
  }

  ```
  - **Use `deal`** to set the balance of an address to 2 ether.
  - **Test the `deposit` function** to ensure that the address with 2 ether can successfully deposit and pass the minimum deposit check.
  - **Test the `deposit` function** to ensure that an address with less than 1 ether (after using `deal`) cannot deposit.
- Assignment #2 (prank)
  ```jsx
  pragma solidity ^0.8.0;

  contract Admin {
      address public admin;

      constructor(address _admin) {
          admin = _admin;
      }

      function changeAdmin(address newAdmin) external {
          require(msg.sender == admin, "Only admin can change the admin");
          admin = newAdmin;
      }
  }
  ```
  1. **Use `prank`** to impersonate the `admin` address and call `changeAdmin` to change the admin to a new address. Ensure this succeeds.
  2. **Use `prank`** to impersonate a non-admin address and call `changeAdmin`. Ensure this fails with the correct error message (i.e., "Only admin can change the admin").
- Assignment #3
  ```jsx
  pragma solidity ^0.8.0;

  contract RestrictedTransfer {
      address public authorized;
      uint256 public transferFee = 1 ether;

      constructor(address _authorized) {
          authorized = _authorized;
      }

      function transfer(address to, uint256 amount) external payable {
          require(msg.sender == authorized, "Only authorized can transfer");
          require(msg.value >= transferFee, "Insufficient fee");

          payable(to).transfer(amount);
      }
  }
  ```
  - **Use `deal`** to set the balance of the authorized address to 10 ether.
  - **Use `prank`** to impersonate the authorized address, and send a transfer with the required fee to another address.
  - **Use `hoax`** to impersonate the authorized address, set the ETH value (1 ether), and call the `transfer` function to test a successful transfer.
  - **Test a failed transfer** by impersonating a non-authorized address using `prank`
- Extra - assume
  ## assume
  In Solidity testing, particularly when using the **Foundry** framework, `vm.assume` is used to set **assumptions** or **preconditions** for the values that are passed into a test function. (yes you can pass values to a test function that can be used by foundry to test multiple things)
  ```jsx

  contract TestCounter is Test {
      function testExample(uint256 x) public {
          vm.assume(x < 1000);  // Only test if x is less than 1000
          assertEq(x + x, x * 2);
      }

      function testStringLength(uint256 len) public {
          vm.assume(len >= 1 && len <= 20);

          string memory testString = generateString(len);

          assertEq(bytes(testString).length, len);
      }

       function generateString(uint256 len) internal pure returns (string memory) {
          bytes memory strBytes = new bytes(len);
          for (uint256 i = 0; i < len; i++) {
              strBytes[i] = bytes1(uint8(97 + (i % 26)));
          }
          return string(strBytes);
      }
  }

  ```

# Deploying contracts

Ref - https://book.getfoundry.sh/forge/deploying

To deploy a contract, use the `forge create` command.

You will need some ETH to be able to deploy it.

![Screenshot 2024-12-10 at 10.12.14 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/085e8ad8-528e-47d7-8922-a23dc4016453/98a65ec2-18cf-4fd4-8e8f-5b52972fd4b2/Screenshot_2024-12-10_at_10.12.14_PM.png)

```jsx
forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/MyContract.sol:MyContract
```

1. RPC URL - You can get one from Alchemy
2. Private key - Export from Metamask
3. Balance ETH - https://cloud.google.com/application/web3/faucet/ethereum/sepolia

## Deploying ERC-20 contract on ETH Sepolia

```bash
forge create --rpc-url https://eth-sepolia.g.alchemy.com/v2/nnY0qPUQLYsUvb5BKJM5bh81sI6O0PQG   --private-key fba7342ef6879df2c735644c734ea69c140f423d84eb2d53fbdfd53fd5d7c586  src/Token.sol:MyToken --legacy
```

![Screenshot 2024-12-10 at 10.28.11 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/085e8ad8-528e-47d7-8922-a23dc4016453/966ec146-68cf-41a6-be18-e8b6df56a32a/Screenshot_2024-12-10_at_10.28.11_PM.png)

https://sepolia.etherscan.io/tx/0xdd82ea46c582aa492b05e2c3340308aad06d5778e4b32950d8ea28c2dd457c03

Contract - https://sepolia.etherscan.io/address/0x1974d184240f5ff9cfb37f32da22d82fc6b66aa8

![Screenshot 2024-12-10 at 10.29.52 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/085e8ad8-528e-47d7-8922-a23dc4016453/baf490c1-38f1-4785-88b0-fc56917b8a90/Screenshot_2024-12-10_at_10.29.52_PM.png)

You can also go to etherscan and verify the contract.
