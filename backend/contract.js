const { Web3 } = require('web3');
const fs = require('fs');
const web3 = new Web3('https://sepolia.infura.io/v3/ef32ca39802242d69b586f48e24ee92c');

const contractData = JSON.parse(fs.readFileSync('StringStorage.json'));
const contractAbi = contractData.abi;

const contractAddress = '0xFB8c038B2bE9475d20605ff7571BC5da0451Af17';

const stringStorageContract = new web3.eth.Contract(contractAbi, contractAddress);

const account = '0xC7229e45DDBb7a7f93765bC065582F1192cF4E50';
const privateKey = '5a9609868ba6713dfcfc5b72a552a1ee99edc134fb9deb02f480e8b08a8ac0ec';

async function storeString(value) {
    const encodedData = stringStorageContract.methods.storeString(value).encodeABI();
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000;
    const nonce = await web3.eth.getTransactionCount(account);
    const transactionParameters = {
        to: contractAddress,
        data: encodedData,
        gas: gasLimit,
        gasPrice: gasPrice,
        nonce: nonce,
    };

    try {
        const signedTx = await web3.eth.accounts.signTransaction(transactionParameters, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);


        // Return additional information
        return {
            transactionHash: receipt.transactionHash,
            blockHash: receipt.blockHash,
            blockNumber: receipt.blockNumber,
            from: receipt.from,
        };
    } catch (error) {
        console.error('Transaction Error:', error.message || error);
        return null;
    }
}

async function getStringCount() {
    const count = await stringStorageContract.methods.getStringCount().call();
    console.log('Number of Strings:', count);
}

async function getStringByIndex(index) {
    const value = await stringStorageContract.methods.getStringByIndex(index).call();
    console.log(`String at index ${index}:`, value);
}

// Export the storeString function
module.exports = { storeString, getStringCount, getStringByIndex };
