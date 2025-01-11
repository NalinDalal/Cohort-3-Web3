pragma solidity ^0.8.22;
contract Storage {
uint public num;
constructor(){}

function setNum(uint _num) public{
    num=_num;
}
}



contract Storage1 {
    uint multiplier;
    uint num;

    constructor() {
        num = 0;
        multiplier = 1;
    }

    function setNum(uint _num) public {
        num = _num * multiplier;
    }

    function getnum() public virtual returns (uint) {
        return num;
    }

    function setMultiplier(uint _multiplier) public {
        multiplier = _multiplier;
    }
}

