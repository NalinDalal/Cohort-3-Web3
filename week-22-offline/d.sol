// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract StorageProxy {
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

    function setImplementation(address _implementation) public {
        
        implementation = _implementation;
    }

}

contract Implementationv1 {
    uint public num;

    function setNum(uint _num) public {
        num = _num;
    }
}

contract Implementationv2 {
    uint public num;

    function setNum(uint _num) public {
        num = _num * 2;
    }
}

contract Implementationv3 {
    uint public num;

    function setNum(uint _num) public {
        num = _num * 3;
    }
}

