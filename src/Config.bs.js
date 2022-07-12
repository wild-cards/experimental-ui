// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Ethers from "./harberger-lib/eth/Ethers.bs.js";
import * as Js_dict from "rescript/lib/es6/js_dict.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";

var isTestnet = Belt_Option.mapWithDefault(process.env.REACT_APP_NETWORK, false, (function (network) {
        return network === "TEST";
      }));

var availableNetworkIds = isTestnet ? [
    4,
    5,
    80001
  ] : [
    1,
    137
  ];

var orgWtihdrawalsMapping = Js_dict.fromArray([
      [
        "careforwild",
        [{
            txHash: "0x556f75dc9129bbb8d2f9bda68ded0a521e69ad0f6c9589227cbc21bb64077cbc",
            amount: Ethers.Utils.parseEtherUnsafe("0.748345411"),
            amountInUsd: 2676.14,
            networkId: 1
          }]
      ],
      [
        "careforwild",
        [{
            txHash: "0xf6b02b69f8f5f734721ed6f38821bfedebcc2873549e5db2e9ec1b6a1a1011a2",
            amount: Ethers.Utils.parseEtherUnsafe("0.6317736644"),
            amountInUsd: 864.41,
            networkId: 1
          }]
      ],
      [
        "darwinanimaldoctors",
        [{
            txHash: "0x218b1469a0c5a19842a1d14778371032f8ef7195d349a3dfbe4d813dad5f3c9d",
            amount: Ethers.Utils.parseEtherUnsafe("0.7225148935"),
            amountInUsd: 988.56,
            networkId: 1
          }]
      ],
      [
        "darwinanimaldoctors",
        [{
            txHash: "0x3d96e4119e084de9a9ee770d3f21fb51c894a646a910b251ee5edd02a3a2a2c3",
            amount: Ethers.Utils.parseEtherUnsafe("0.748345411"),
            amountInUsd: 1202.47,
            networkId: 1
          }]
      ],
      [
        "bdi",
        [{
            txHash: "0x6582ea27593806e6822425574de60544499d3954bca5078629c9e096678c6ac8",
            amount: Ethers.Utils.parseEtherUnsafe("2.544068973"),
            amountInUsd: 3480.85,
            networkId: 1
          }]
      ],
      [
        "bdi",
        [{
            txHash: "0xc3a37a1a25337f631328a6833ac4ec922f7df7f075a7ccddb89e11857f0536e6",
            amount: Ethers.Utils.parseEtherUnsafe("2.81152196"),
            amountInUsd: 9627.33,
            networkId: 1
          }]
      ],
      [
        "pangolinafrica",
        [{
            txHash: "0xf5b33c84b77827b775d9dfa516113c596706ad5ad8d0cc6c9a456d43258caaf4",
            amount: Ethers.Utils.parseEtherUnsafe("0.2841441781"),
            amountInUsd: 388.77,
            networkId: 1
          }]
      ],
      [
        "sendaverde",
        [{
            txHash: "0x17343dfee8fb442535af99ab5c6bf655c8e8eb2a63f706062fa5921231b86cf3",
            amount: Ethers.Utils.parseEtherUnsafe("12.1511067"),
            amountInUsd: 16757.96,
            networkId: 1
          }]
      ],
      [
        "sendaverde",
        [{
            txHash: "0x5e749f311768f4f2237a3d47e73ce3626753739c057cf19e153db5bffcd55772",
            amount: Ethers.Utils.parseEtherUnsafe("3.634006486"),
            amountInUsd: 4972.12,
            networkId: 1
          }]
      ],
      [
        "wildtomorrow",
        [{
            txHash: "0xefa0c143731e2209a7d5d7ec2dbf0e8a3fef31c4da39c71e4badb4597b8e2bb6",
            amount: Ethers.Utils.parseEtherUnsafe("3.516220128"),
            amountInUsd: 4679.32,
            networkId: 1
          }]
      ],
      [
        "wildtomorrow",
        [{
            txHash: "0xc69f5e9dbe2d3db93955c9346d4a8fd39b72cc67f33bc3a5a7b99b9653573363",
            amount: Ethers.Utils.parseEtherUnsafe("10.31977989"),
            amountInUsd: 14119.73,
            networkId: 1
          }]
      ],
      [
        "wildtomorrow",
        [{
            txHash: "0xe4b790d893721e0ec2e6776514200081d658a6e9b09563a84fe0e91d0c447e37",
            amount: Ethers.Utils.parseEtherUnsafe("1.605126075"),
            amountInUsd: 3152.756533,
            networkId: 1
          }]
      ],
      [
        "greatwhaleconservancy",
        [{
            txHash: "0xf5b33c84b77827b775d9dfa516113c596706ad5ad8d0cc6c9a456d43258caaf4",
            amount: Ethers.Utils.parseEtherUnsafe("0.2841441781"),
            amountInUsd: 388.77,
            networkId: 1
          }]
      ]
    ]);

export {
  isTestnet ,
  availableNetworkIds ,
  orgWtihdrawalsMapping ,
  
}
/* isTestnet Not a pure module */
