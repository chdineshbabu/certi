const NewContract = artifacts.require("StringStorage");

module.exports = function(deployer) {
  deployer.deploy(NewContract);
};