// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.22;

import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract StorageProxy is TransparentUpgradeableProxy {
    constructor(
        address _logic,
        address initialOwner,
        bytes memory _data
    )
        payable
        TransparentUpgradeableProxy(_logic, initialOwner, _data)
    {
        // You can put custom constructor logic here if needed.
    }

    // If you MUST add new functionality, do so with caution, 
    // and ideally only internal or private functions to avoid 
    // creating new externally-callable selectors.
    function _myInternalLogic() internal {
        // Example internal logic
    }

    // If you need to intercept calls before they're forwarded, override `_fallback()`.
    // But be aware that in the transparent pattern, the admin calls are routed here
    // to do the upgrade. 
    function _fallback() internal virtual override {
        // Custom pre-forwarding logic

        // Then call the original fallback from TransparentUpgradeableProxy
        super._fallback();
    }
}

contract ImplementationV1 {
    uint256 public num;
    address public implementation;

    function setNum(uint256 _num) public {
        num = _num;
    }
}
