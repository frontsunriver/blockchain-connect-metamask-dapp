// const Migrations = artifacts.require("Migrations");
const FCTTokens = artifacts.require("FCTToken");
module.exports = function (deployer) {
  deployer.deploy(FCTTokens);
};
