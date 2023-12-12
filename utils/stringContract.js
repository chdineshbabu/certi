import { contractAddress,contractABI } from "./constants";

const createStringContract = web3 =>{
    return new web3.eth.Contract(contractABI,contractAddress)
}

export default createStringContract;