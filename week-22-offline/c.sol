//calling using interfaces
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IImplementation {
    function setNum(uint _num) external;
    function num() external view returns (uint);
}

contract Storage {
    uint public num; 
    address public implementation;

    constructor(address _implementation) {
        num = 0;
        implementation = _implementation;
    }

    function setNum(uint _num) public {
        IImplementation(implementation).setNum(_num);
    }
}

contract Implementation {
    uint public num;

    /**
     * @dev Sets the `num` in the Implementation contract's own storage.
     */
    function setNum(uint _num) public {
        num = _num;
    }
}

