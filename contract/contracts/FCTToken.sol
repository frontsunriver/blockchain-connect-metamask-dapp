pragma solidity >=0.4.22 <0.9.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract FCTToken is ERC20 {

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 10000 * (10 ** 18));
    }

    function faucet (address recipient , uint amount) external {
      _mint(recipient, amount);
    }
}