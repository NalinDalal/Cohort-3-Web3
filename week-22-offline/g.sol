// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract StorageProxy is ERC1967Proxy {
    constructor(
        address _logic,
        bytes memory _data
    )
        ERC1967Proxy(_logic, _data)
        payable
    {}
}

/**
 * @dev Example UUPS implementation (V1).
 *      - Holds state (num).
 *      - Provides UUPS upgrade logic (via _authorizeUpgrade).
 *      - Provides an initialize function (replaces constructor in upgradeable pattern).
 */
contract ImplementationV1 is Initializable, UUPSUpgradeable {
    uint256 public num;

    function initialize(uint256 _initialNum) public initializer {
        __UUPSUpgradeable_init();
        num = _initialNum;
    }

    function setNum(uint256 _num) public {
        num = _num;
    }
 
    // ideally should be gated by onlyOwner
    function _authorizeUpgrade(address newImplementation)
        internal
        override
    {}
}

contract ImplementationV2 is Initializable, UUPSUpgradeable {
    uint256 public num;

    function initialize(uint256 _initialNum) public initializer {
        __UUPSUpgradeable_init();
        num = _initialNum;
    }

    function setNum(uint256 _num) public {
        num = _num * 2;
    }
 
    // ideally should be gated by onlyOwner
    function _authorizeUpgrade(address newImplementation)
        internal
        override
    {}
}
