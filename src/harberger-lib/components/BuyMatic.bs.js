// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as BnJs from "bn.js";
import * as React from "react";
import * as Belt_Int from "bs-platform/lib/es6/belt_Int.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Float from "bs-platform/lib/es6/belt_Float.js";
import * as Web3Utils from "web3-utils";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_format from "bs-platform/lib/es6/caml_format.js";
import * as Animal$WildCards from "../Animal.bs.js";
import * as Styles$WildCards from "../../Styles.bs.js";
import * as Globals$WildCards from "../Globals.bs.js";
import * as QlHooks$WildCards from "../QlHooks.bs.js";
import * as TokenId$WildCards from "../TokenId.bs.js";
import * as BuyInput$WildCards from "./BuyInput.bs.js";
import * as InputHelp$WildCards from "../InputHelp.bs.js";
import * as Web3Utils$WildCards from "../Web3Utils.bs.js";
import * as Accounting$WildCards from "../Accounting.bs.js";
import * as GSNActions$WildCards from "../eth/GSNActions.bs.js";
import * as RootProvider$WildCards from "../RootProvider.bs.js";
import * as TxTemplateMatic$WildCards from "../../components/components/TxTemplateMatic.bs.js";

function calcPricePerSecond(price, numerator, denominator) {
  var priceBn = new BnJs.default(price);
  var numeratorBn = new BnJs.default(numerator);
  var denominatorBn = new BnJs.default(denominator);
  var fullYearSeconds = new BnJs.default("31536000");
  return priceBn.mul(numeratorBn).div(denominatorBn).div(fullYearSeconds);
}

function calculateDepositDuration(deposit, price, numerator, denominator) {
  var depositBn = new BnJs.default(deposit);
  var pricePerSecond = calcPricePerSecond(price, numerator, denominator);
  return Accounting$WildCards.defaultZeroI(Belt_Int.fromString(depositBn.div(pricePerSecond.gt(new BnJs.default("0")) ? pricePerSecond : new BnJs.default("1")).toString()));
}

function calcRequiredDepositForTime(time, price, numerator, denominator) {
  var timeBn = new BnJs.default(String(time));
  var pricePerSecond = calcPricePerSecond(price, numerator, denominator);
  return Web3Utils$WildCards.fromWeiToEth(timeBn.mul(pricePerSecond).toString());
}

function BuyMatic(Props) {
  var tokenId = Props.tokenId;
  var match = React.useState((function () {
          
        }));
  var match$1 = React.useState((function () {
          
        }));
  var userBalance = Belt_Option.mapWithDefault(RootProvider$WildCards.useEthBalance(undefined), new BnJs.default("0"), (function (a) {
          return a;
        }));
  var match$2 = QlHooks$WildCards.usePledgeRateDetailed(tokenId);
  var ratio = match$2[2];
  var denominator = match$2[1];
  var numerator = match$2[0];
  var priceStatus = QlHooks$WildCards.usePrice(tokenId);
  var isOnAuction = Animal$WildCards.useIsOnAuction(tokenId);
  var launchTimeOpt = QlHooks$WildCards.useLaunchTimeBN(tokenId);
  var currentPriceWei = Animal$WildCards.useAuctionPriceWei(tokenId, Belt_Option.getWithDefault(launchTimeOpt, new BnJs.default("5000")));
  var currentPriceWei$1 = isOnAuction ? currentPriceWei : (
      typeof priceStatus === "number" ? new BnJs.default("0") : (
          priceStatus.tag ? priceStatus[0] : new BnJs.default("0")
        )
    );
  var tokenIdName = "token#" + TokenId$WildCards.toString(tokenId);
  var maxAvailableDepositBN = userBalance.sub(new BnJs.default("3000000000000000")).sub(currentPriceWei$1);
  var maxAvailableDeposit = Web3Utils$WildCards.fromWeiToEth(maxAvailableDepositBN.toString());
  var isAbleToBuy = maxAvailableDepositBN.gt(new BnJs.default("0"));
  var currentPriceEth = Web3Utils$WildCards.fromWeiBNToEth(currentPriceWei$1);
  var currentPriceFloat = Accounting$WildCards.defaultZeroF(Belt_Float.fromString(currentPriceEth));
  var currentPriceFloatWithMinimum = Math.max(currentPriceFloat, 0.005);
  var defaultPriceValue = Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(currentPriceFloatWithMinimum * 1.5, 2);
  var defaultMonthlyPatronage = Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(currentPriceFloatWithMinimum * 1.5 * ratio, 3);
  var defaultPriceWei = Web3Utils$WildCards.toWeiFromEth(defaultPriceValue);
  var depositForAYear = calcRequiredDepositForTime(31536000, defaultPriceWei, numerator, denominator);
  var match$3 = Caml_format.caml_float_of_string(depositForAYear) < Caml_format.caml_float_of_string(maxAvailableDeposit) ? /* tuple */[
      31536000,
      depositForAYear
    ] : /* tuple */[
      calculateDepositDuration(Web3Utils$WildCards.toWeiFromEth(maxAvailableDeposit), defaultPriceWei, numerator, denominator),
      Math.max(0, Caml_format.caml_float_of_string(maxAvailableDeposit)).toString()
    ];
  var defaultDeposit = match$3[1];
  var defaultDepositTime = match$3[0];
  var match$4 = React.useState((function () {
          return defaultPriceValue;
        }));
  var setInitialPrice = match$4[1];
  var newPrice = match$4[0];
  var match$5 = React.useState((function () {
          return defaultMonthlyPatronage;
        }));
  var setPatronage = match$5[1];
  var match$6 = React.useState((function () {
          return defaultDeposit;
        }));
  var setInitialDeposit = match$6[1];
  var deposit = match$6[0];
  var match$7 = React.useState((function () {
          return defaultDepositTime;
        }));
  var setDepositTimeInSeconds = match$7[1];
  var onSubmitBuy = function (param) {
    var amountToSend = currentPriceWei$1.add(new BnJs.default(Web3Utils.toWei(deposit, "ether")));
    if (typeof priceStatus !== "number" && priceStatus.tag) {
      if (priceStatus[0].gt(new BnJs.default("0"))) {
        GSNActions$WildCards.buyFunction(newPrice, currentPriceWei$1.toString(), "150000", amountToSend.toString());
        return ;
      } else {
        GSNActions$WildCards.buyAuctionFunction(newPrice, "150000", amountToSend.add(new BnJs.default("1000000000000000")).toString());
        return ;
      }
    }
    GSNActions$WildCards.buyAuctionFunction(newPrice, "150000", amountToSend.add(new BnJs.default("1000000000000000")).toString());
    
  };
  var setNewPrice = function (value) {
    var match = InputHelp$WildCards.onlyUpdateValueIfPositiveFloat(newPrice, setInitialPrice, value);
    if (!match[1]) {
      return ;
    }
    var value$1 = match[0];
    var patronage = (Accounting$WildCards.defaultZeroF(Belt_Float.fromString(value$1)) * ratio).toString();
    Curry._1(setPatronage, (function (param) {
            return patronage;
          }));
    var timeInSeconds = calculateDepositDuration(Web3Utils$WildCards.toWeiFromEth(deposit), Web3Utils$WildCards.toWeiFromEth(value$1), numerator, denominator);
    return Curry._1(setDepositTimeInSeconds, (function (param) {
                  return timeInSeconds;
                }));
  };
  var setDeposit = function (value) {
    var match = InputHelp$WildCards.onlyUpdateValueIfInRangeFloat(0, Caml_format.caml_float_of_string(maxAvailableDeposit), deposit, setInitialDeposit, value);
    if (!match[1]) {
      return ;
    }
    var timeInSeconds = calculateDepositDuration(Web3Utils$WildCards.toWeiFromEth(match[0]), Web3Utils$WildCards.toWeiFromEth(newPrice), numerator, denominator);
    return Curry._1(setDepositTimeInSeconds, (function (param) {
                  return timeInSeconds;
                }));
  };
  return React.createElement(TxTemplateMatic$WildCards.make, {
              children: React.createElement(TxTemplateMatic$WildCards.make, {
                    children: isAbleToBuy ? React.createElement(BuyInput$WildCards.make, {
                            patronage: match$5[0],
                            onSubmitBuy: onSubmitBuy,
                            newPrice: newPrice,
                            deposit: deposit,
                            depositTimeInSeconds: match$7[0],
                            maxAvailableDeposit: maxAvailableDeposit,
                            setNewPrice: setNewPrice,
                            setDeposit: setDeposit,
                            tokenIdName: tokenIdName
                          }) : React.createElement(RimbleUi.Box, {
                            children: React.createElement("p", {
                                  className: Styles$WildCards.textOnlyModalText
                                }, "You do not have enough ether to buy " + (tokenIdName + "."))
                          }),
                    txHash: match[0],
                    closeButtonText: "Back to view Animal"
                  }),
              txHash: match$1[0],
              closeButtonText: "Back to view Animal"
            });
}

var make = BuyMatic;

export {
  calcPricePerSecond ,
  calculateDepositDuration ,
  calcRequiredDepositForTime ,
  make ,
  
}
/* bn.js Not a pure module */
