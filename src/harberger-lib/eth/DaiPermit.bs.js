// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Ethers from "ethers";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as DaiJson from "./abi/dai.json";
import * as BiconomyExec from "./biconomy-exec";
import * as Erc712$WildCards from "./Erc712.bs.js";
import * as ContractActions$WildCards from "./ContractActions.bs.js";

function getDaiContract(daiAddress, stewardAbi, library, account) {
  return new Ethers.Contract(daiAddress, stewardAbi, ContractActions$WildCards.getProviderOrSigner(library, account, false));
}

var daiAbi = DaiJson.dai;

function getNonce(daiContractAddress, library, account) {
  var daiContract = getDaiContract(daiContractAddress, daiAbi, library, account);
  var callDai = (async (daiContract) => {
      try {
        let result = await daiContract.getNonce("0xd3Cbce59318B2E570883719c8165F9390A12BdD6");
        console.log("the result", result)
      } catch (e) {
        console.log("the error:", e);
      }
    });
  callDai(daiContract);
  return daiContract.getNonce(Belt_Option.getWithDefault(account, "0x0"));
}

function getEthSig(sigString) {
  return {
          r: sigString.slice(0, 66),
          s: "0x" + sigString.slice(66, 130),
          v: parseInt(sigString.slice(130, 132), 16)
        };
}

function createPermitSig(provider, verifyingContract, nonce, chainId, holder, spender, from) {
  console.log("Chain Id being used:", chainId);
  console.log("Chain Id being used:", "0x" + chainId.toString(16).padStart(16, "0"));
  var domain_salt = "0x" + chainId.toString(16).padStart(64, "0");
  var domain = {
    name: "(PoS) Dai Stablecoin",
    version: "1",
    verifyingContract: verifyingContract,
    salt: domain_salt
  };
  var message = {
    holder: holder,
    spender: spender,
    nonce: nonce,
    expiry: 0,
    allowed: true
  };
  var data = {
    types: {
      EIP712Domain: Erc712$WildCards.eip712Domain,
      Permit: Erc712$WildCards.permit
    },
    domain: domain,
    primaryType: "Permit",
    message: message
  };
  var dataString = Belt_Option.getWithDefault(JSON.stringify(data), "");
  console.log("data1", dataString);
  var getData = (() =>({
    types: {
      EIP712Domain: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "version",
          type: "string",
        },
        {
          name: "verifyingContract",
          type: "address",
        },
        {
          name: "salt",
          type: "bytes32",
        },
      ],
      Permit: [
        {
          name: "holder",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "nonce",
          type: "uint256",
        },
        {
          name: "expiry",
          type: "uint256",
        },
        {
          name: "allowed",
          type: "bool",
        },
      ],
    },
    domain: {
      name: "(PoS) Dai Stablecoin",
      version: "1",
      verifyingContract: "0xea9d8a947dD7eBa9cF883c4aa71f18aD5A9c06bB",
      salt:
        "0x0000000000000000000000000000000000000000000000000000000000000005",
    },
    primaryType: "Permit",
    message: {
      holder: "0xd3Cbce59318B2E570883719c8165F9390A12BdD6",
      spender: "0xf02Bb5b595Af96597b82f39F5de265E77Dc75CbC",
      nonce: "0",
      expiry: "0",
      allowed: true,
    },
  }));
  var data$1 = Belt_Option.getWithDefault(JSON.stringify(Curry._1(getData, undefined)), "");
  console.log("data2", data$1);
  var exampleRpcDefinition_params = [
    from,
    dataString
  ];
  var exampleRpcDefinition = {
    method: "eth_signTypedData_v3",
    params: exampleRpcDefinition_params,
    from: from
  };
  console.log("The query", exampleRpcDefinition);
  return new Promise((function (resolve, reject) {
                provider.sendAsync(exampleRpcDefinition, (function (err, result) {
                        if (err == null) {
                          console.log(result);
                          var sigString = result.result;
                          console.log(getEthSig(sigString));
                          return resolve(getEthSig(sigString));
                        }
                        console.log("There was an error", err);
                        return reject(err);
                      }));
                
              }));
}

var execTestTx = BiconomyExec.execTestTx;

export {
  getDaiContract ,
  daiAbi ,
  getNonce ,
  getEthSig ,
  createPermitSig ,
  execTestTx ,
  
}
/* daiAbi Not a pure module */
