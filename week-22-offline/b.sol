// SPDX-License-Identifier: GPL-3.0
// delegateCall 
pragma solidity >=0.7.0 <0.9.0;


contract Storage {
    uint public num;
    address implementation;

    constructor(address _implementation) {
        num = 0;
        implementation = _implementation;
    }

    function setNum(uint _num) public {
        (bool success, ) = implementation.delegatecall(
            abi.encodeWithSignature("setNum(uint256)", _num)
        );
        require(success, "Error while delegating call");
    }

}

contract Implementation {
    uint public num;

    function setNum(uint _num) public {
        num = _num;
    }
}

