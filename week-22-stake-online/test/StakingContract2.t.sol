// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/StakingContract.sol";

contract StakingTestContract is Test {
    StakingContract c;

    function setUp() public {
        c = new StakingContract();
    }

    function testStake() public {
        uint value = 10 ether;
        vm.deal(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f, value);
        vm.prank(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f);
        c.stake{value: value}(value);
        assert(c.totalStaked() == value);
    }

    function testUnStake() public {
        uint value = 11 ether;
        vm.deal(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f, value);
        vm.startPrank(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f);
        assert(address(0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f).balance == value);
        c.stake{value: value}(value);
        c.unstake(value);
        assert(c.totalStaked() == value / 2);
    }
}

