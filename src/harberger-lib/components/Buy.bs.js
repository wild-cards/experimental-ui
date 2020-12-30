// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import BnJs from "bn.js";
import * as React from "react";
import * as Animal from "../Animal.bs.js";
import * as Config from "../Config.bs.js";
import * as Styles from "../../Styles.bs.js";
import * as Globals from "../Globals.bs.js";
import * as QlHooks from "../QlHooks.bs.js";
import * as TokenId from "../TokenId.bs.js";
import * as Belt_Int from "bs-platform/lib/es6/belt_Int.js";
import * as BuyInput from "./BuyInput.bs.js";
import * as CONSTANTS from "../../CONSTANTS.bs.js";
import * as InputHelp from "../InputHelp.bs.js";
import * as Web3Utils from "../Web3Utils.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Accounting from "../Accounting.bs.js";
import * as Belt_Float from "bs-platform/lib/es6/belt_Float.js";
import * as TxTemplate from "../../components/components/TxTemplate.bs.js";
import * as Web3Utils$1 from "web3-utils";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_format from "bs-platform/lib/es6/caml_format.js";
import * as RootProvider from "../RootProvider.bs.js";
import * as ContractActions from "../eth/ContractActions.bs.js";
import * as Core from "@web3-react/core";
import TransakSdk from "@transak/transak-sdk";

function calcPricePerSecond(price, numerator, denominator) {
  var priceBn = new BnJs(price);
  var numeratorBn = new BnJs(numerator);
  var denominatorBn = new BnJs(denominator);
  var fullYearSeconds = new BnJs("31536000");
  return priceBn.mul(numeratorBn).div(denominatorBn).div(fullYearSeconds);
}

function calculateDepositDuration(deposit, price, numerator, denominator) {
  var depositBn = new BnJs(deposit);
  var pricePerSecond = calcPricePerSecond(price, numerator, denominator);
  return Accounting.defaultZeroI(Belt_Int.fromString(depositBn.div(pricePerSecond.gt(new BnJs("0")) ? pricePerSecond : new BnJs("1")).toString()));
}

function calcRequiredDepositForTime(time, price, numerator, denominator) {
  var timeBn = new BnJs(String(time));
  var pricePerSecond = calcPricePerSecond(price, numerator, denominator);
  return Web3Utils.fromWeiToEth(timeBn.mul(pricePerSecond).toString());
}

function Buy$Buy(Props) {
  var chain = Props.chain;
  var tokenId = Props.tokenId;
  var availableBalance = Props.availableBalance;
  var web3Context = Core.useWeb3React();
  var match = ContractActions.useBuy(chain, tokenId, web3Context.library, web3Context.account, Belt_Option.getWithDefault(web3Context.chainId, 1));
  var buyFunc = match[0];
  var match$1 = ContractActions.useBuyAuction(chain, tokenId, web3Context.library, web3Context.account, Belt_Option.getWithDefault(web3Context.chainId, 1));
  var buyFuncAuction = match$1[0];
  var userBalance = Belt_Option.mapWithDefault(RootProvider.useEthBalance(undefined), new BnJs("0"), (function (a) {
          return a;
        }));
  var match$2 = QlHooks.usePledgeRateDetailed(chain, tokenId);
  var ratio = match$2[2];
  var denominator = match$2[1];
  var numerator = match$2[0];
  var priceStatus = QlHooks.usePrice(chain, tokenId);
  var isOnAuction = Animal.useIsOnAuction(chain, tokenId);
  var launchTimeOpt = QlHooks.useLaunchTimeBN(chain, tokenId);
  var currentPriceWei = Animal.useAuctionPriceWei(chain, tokenId, Belt_Option.getWithDefault(launchTimeOpt, new BnJs("5000")));
  var currentPriceWei$1 = isOnAuction ? Belt_Option.getWithDefault(currentPriceWei, new BnJs("0")) : (
      typeof priceStatus === "number" ? new BnJs("0") : (
          priceStatus.TAG === /* Foreclosed */0 ? new BnJs("0") : priceStatus._0
        )
    );
  var tokenIdName = "token#" + TokenId.toString(tokenId);
  var paymentTokenBalance = Web3Utils.fromWeiBNToEthPrecision(Belt_Option.getWithDefault(availableBalance, userBalance), 4);
  var maxAvailableDepositBN = Belt_Option.getWithDefault(availableBalance, userBalance.sub(new BnJs("3000000000000000")).sub(currentPriceWei$1));
  var maxAvailableDeposit = Web3Utils.fromWeiToEth(maxAvailableDepositBN.toString());
  var isAbleToBuy = maxAvailableDepositBN.gt(new BnJs("0"));
  var currentPriceEth = Web3Utils.fromWeiBNToEth(currentPriceWei$1);
  var currentPriceFloat = Accounting.defaultZeroF(Belt_Float.fromString(currentPriceEth));
  var currentPriceFloatWithMinimum = Math.max(currentPriceFloat, 0.005);
  var defaultPriceValue = Globals.toFixedWithPrecisionNoTrailingZeros(currentPriceFloatWithMinimum * 1.5, 2);
  var defaultMonthlyPatronage = Globals.toFixedWithPrecisionNoTrailingZeros(currentPriceFloatWithMinimum * 1.5 * ratio, 3);
  var defaultPriceWei = Web3Utils.toWeiFromEth(defaultPriceValue);
  var depositForAYear = calcRequiredDepositForTime(31536000, defaultPriceWei, numerator, denominator);
  var match$3 = Caml_format.caml_float_of_string(depositForAYear) < Caml_format.caml_float_of_string(maxAvailableDeposit) ? [
      31536000,
      depositForAYear
    ] : [
      calculateDepositDuration(Web3Utils.toWeiFromEth(maxAvailableDeposit), defaultPriceWei, numerator, denominator),
      Math.max(0, Caml_format.caml_float_of_string(maxAvailableDeposit)).toString()
    ];
  var defaultDeposit = match$3[1];
  var defaultDepositTime = match$3[0];
  var match$4 = React.useState(function () {
        return defaultPriceValue;
      });
  var setInitialPrice = match$4[1];
  var newPrice = match$4[0];
  var match$5 = React.useState(function () {
        return defaultMonthlyPatronage;
      });
  var setPatronage = match$5[1];
  var match$6 = React.useState(function () {
        return defaultDeposit;
      });
  var setInitialDeposit = match$6[1];
  var deposit = match$6[0];
  var match$7 = React.useState(function () {
        return defaultDepositTime;
      });
  var setDepositTimeInSeconds = match$7[1];
  var onSubmitBuy = function (param) {
    var amountToSend = currentPriceWei$1.add(new BnJs(Web3Utils$1.toWei(deposit, "ether")));
    if (typeof priceStatus !== "number" && priceStatus.TAG !== /* Foreclosed */0) {
      if (priceStatus._0.gt(new BnJs("0"))) {
        return Curry._4(buyFunc, newPrice, currentPriceWei$1.toString(), "150000", amountToSend.toString());
      } else {
        return Curry._3(buyFuncAuction, newPrice, "150000", amountToSend.add(new BnJs("1000000000000000")).toString());
      }
    }
    return Curry._3(buyFuncAuction, newPrice, "150000", amountToSend.add(new BnJs("1000000000000000")).toString());
  };
  var setNewPrice = function (value) {
    var match = InputHelp.onlyUpdateValueIfPositiveFloat(newPrice, setInitialPrice, value);
    if (!match[1]) {
      return ;
    }
    var value$1 = match[0];
    var patronage = (Accounting.defaultZeroF(Belt_Float.fromString(value$1)) * ratio).toString();
    Curry._1(setPatronage, (function (param) {
            return patronage;
          }));
    var timeInSeconds = calculateDepositDuration(Web3Utils.toWeiFromEth(deposit), Web3Utils.toWeiFromEth(value$1), numerator, denominator);
    return Curry._1(setDepositTimeInSeconds, (function (param) {
                  return timeInSeconds;
                }));
  };
  var setDeposit = function (value) {
    var match = InputHelp.onlyUpdateValueIfInRangeFloat(0, Caml_format.caml_float_of_string(maxAvailableDeposit), deposit, setInitialDeposit, value);
    if (!match[1]) {
      return ;
    }
    var timeInSeconds = calculateDepositDuration(Web3Utils.toWeiFromEth(match[0]), Web3Utils.toWeiFromEth(newPrice), numerator, denominator);
    return Curry._1(setDepositTimeInSeconds, (function (param) {
                  return timeInSeconds;
                }));
  };
  var currency = chain !== 1 ? "ether" : "DAI";
  var openTransak = function (param) {
    console.log(Config.Transak.getConfig(chain, web3Context));
    var transak = new TransakSdk(Config.Transak.getConfig(chain, web3Context));
    transak.init();
    
  };
  var match$8 = React.useState(function () {
        return false;
      });
  var setShowTransakWarning = match$8[1];
  var showTransakWarning = match$8[0];
  var transakSteps = function (defaultView) {
    if (showTransakWarning) {
      return React.createElement(React.Fragment, undefined, React.createElement("p", undefined, "This service currently only works for pure ethereum wallets."), React.createElement("p", undefined, "The following wallets are safe: Metamask, Portis, Torus, any wallet that uses words as a passphrase."), React.createElement("p", undefined, "The following wallets aren't safe: Argent, Authereum, gnosis safe."), React.createElement("p", undefined, "If you are unsure, please contact us."), React.createElement("button", {
                      onClick: openTransak
                    }, "Continue"), React.createElement("button", {
                      onClick: (function (param) {
                          return Curry._1(setShowTransakWarning, (function (param) {
                                        return false;
                                      }));
                        })
                    }, "Cancel"));
    } else {
      return defaultView;
    }
  };
  return React.createElement(TxTemplate.make, {
              children: React.createElement(TxTemplate.make, {
                    children: null,
                    txState: match[1],
                    closeButtonText: "Back to view Animal",
                    chain: chain
                  }, React.createElement("p", undefined, "This wildcard uses " + currency), isAbleToBuy ? React.createElement(React.Fragment, undefined, React.createElement("p", undefined, "Your available balance is: " + (paymentTokenBalance + (" " + currency))), transakSteps(React.createElement(RimbleUi.Button, {
                                  children: "Buy More " + currency,
                                  onClick: (function (param) {
                                      return Curry._1(setShowTransakWarning, (function (param) {
                                                    return true;
                                                  }));
                                    })
                                })), React.createElement(BuyInput.make, {
                              patronage: match$5[0],
                              onSubmitBuy: onSubmitBuy,
                              newPrice: newPrice,
                              deposit: deposit,
                              depositTimeInSeconds: match$7[0],
                              maxAvailableDeposit: maxAvailableDeposit,
                              setNewPrice: setNewPrice,
                              setDeposit: setDeposit,
                              tokenIdName: tokenIdName
                            })) : React.createElement(RimbleUi.Box, {
                          children: null
                        }, React.createElement("p", {
                              className: Styles.textOnlyModalText
                            }, "You do not have enough " + (currency + (" to buy " + (tokenIdName + ".")))), React.createElement("p", undefined, "Your current balance is: " + (paymentTokenBalance + (" " + currency))), transakSteps(React.createElement(RimbleUi.Button, {
                                  children: "Buy " + currency,
                                  onClick: (function (param) {
                                      return Curry._1(setShowTransakWarning, (function (param) {
                                                    return true;
                                                  }));
                                    })
                                })))),
              txState: match$1[1],
              closeButtonText: "Back to view Animal",
              chain: chain
            });
}

var Buy = {
  make: Buy$Buy
};

function Buy$1(Props) {
  var chain = Props.chain;
  var tokenId = Props.tokenId;
  var web3Context = Core.useWeb3React();
  var optMaticState = QlHooks.useMaticState(false, Belt_Option.getWithDefault(web3Context.account, CONSTANTS.nullEthAddress), ContractActions.getMaticNetworkName(ContractActions.getChildChainId(Belt_Option.getWithDefault(web3Context.chainId, 1))));
  if (chain !== 1) {
    return React.createElement(Buy$Buy, {
                chain: chain,
                tokenId: tokenId
              });
  }
  if (optMaticState === undefined) {
    return React.createElement("p", undefined, "Updating latest state.");
  }
  var error = optMaticState.error;
  if (error !== undefined) {
    console.log("matic state fetch error", error);
    return React.createElement("p", undefined, "Error: Unable to get matic state - please try again or contact the Wildcards Team.");
  } else {
    return React.createElement(Buy$Buy, {
                chain: chain,
                tokenId: tokenId,
                availableBalance: new BnJs(optMaticState.balance)
              });
  }
}

var make = Buy$1;

export {
  calcPricePerSecond ,
  calculateDepositDuration ,
  calcRequiredDepositForTime ,
  Buy ,
  make ,
  
}
/* bn.js Not a pure module */
