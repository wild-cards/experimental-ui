// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as RimbleUi from "rimble-ui";
import * as Belt_Float from "bs-platform/lib/es6/belt_Float.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Eth$WildCards from "../Eth.bs.js";
import * as Globals$WildCards from "../Globals.bs.js";
import * as QlHooks$WildCards from "../QlHooks.bs.js";
import * as CountDown$WildCards from "../CountDown.bs.js";
import * as Accounting$WildCards from "../Accounting.bs.js";
import * as PriceDisplay$WildCards from "../PriceDisplay.bs.js";
import * as RootProvider$WildCards from "../RootProvider.bs.js";
import * as UserProvider$WildCards from "../js/user-provider/UserProvider.bs.js";
import * as UsdPriceProvider$WildCards from "./UsdPriceProvider.bs.js";

function Info(Props) {
  var chain = Props.chain;
  var tokenId = Props.tokenId;
  var daysHeld = QlHooks$WildCards.useDaysHeld(chain, tokenId);
  var currentPatron = Globals$WildCards.$pipe$pipe$pipe$pipe(QlHooks$WildCards.usePatron(chain, tokenId), "Loading");
  var userId = UserProvider$WildCards.useDisplayName(currentPatron);
  var displayName = UserProvider$WildCards.useDisplayName(currentPatron);
  var displayNameStr = UserProvider$WildCards.displayNameToString(displayName);
  var tokenName = Globals$WildCards.$pipe$pipe$pipe$pipe(QlHooks$WildCards.useWildcardName(tokenId), "loading name");
  var userIdType;
  switch (userId.tag | 0) {
    case /* TwitterHandle */0 :
        userIdType = "verified twitter account";
        break;
    case /* ThreeBoxName */1 :
        userIdType = "3box name";
        break;
    case /* EthAddress */2 :
        userIdType = "public address";
        break;
    
  }
  var clearAndPush = RootProvider$WildCards.useClearNonUrlStateAndPushRoute(undefined);
  var currentUsdEthPrice = UsdPriceProvider$WildCards.useUsdPrice(undefined);
  var match = Globals$WildCards.mapd(QlHooks$WildCards.useRemainingDepositEth(chain, currentPatron), /* tuple */[
        "Loading",
        "Loading"
      ], (function (a) {
          return /* tuple */[
                  Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(Globals$WildCards.$pipe$pipe$pipe$pipe(Belt_Float.fromString(Eth$WildCards.get(a, /* Eth */Block.__(0, [/* ether */-193685050]))), 0.0), 9),
                  Globals$WildCards.mapd(currentUsdEthPrice, "Loading", (function (usdEthRate) {
                          return Eth$WildCards.get(a, /* Usd */Block.__(1, [
                                        usdEthRate,
                                        2
                                      ]));
                        }))
                ];
        }));
  var match$1 = Globals$WildCards.mapd(QlHooks$WildCards.useAmountRaisedToken(chain, tokenId), /* tuple */[
        "Loading",
        "Loading"
      ], (function (a) {
          return /* tuple */[
                  Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(Globals$WildCards.$pipe$pipe$pipe$pipe(Belt_Float.fromString(Eth$WildCards.get(a, /* Eth */Block.__(0, [/* ether */-193685050]))), 0.0), 9),
                  Globals$WildCards.mapd(currentUsdEthPrice, "Loading", (function (usdEthRate) {
                          return Eth$WildCards.get(a, /* Usd */Block.__(1, [
                                        usdEthRate,
                                        2
                                      ]));
                        }))
                ];
        }));
  var foreclosureTime = QlHooks$WildCards.useForeclosureTime(chain, currentPatron);
  var definiteTime = Globals$WildCards.mapd(foreclosureTime, undefined, (function (a) {
          return Caml_option.some(a);
        }));
  var ratio = QlHooks$WildCards.usePledgeRate(chain, tokenId);
  var optCurrentPrice = PriceDisplay$WildCards.usePrice(chain, tokenId);
  var match$2 = optCurrentPrice !== undefined ? /* tuple */[
      Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(Accounting$WildCards.defaultZeroF(Belt_Float.fromString(optCurrentPrice[0])) * ratio, 4),
      undefined
    ] : /* tuple */[
      undefined,
      undefined
    ];
  var optMonthlyPledgeUsd = match$2[1];
  var optMonthlyPledgeEth = match$2[0];
  var monthlyRate = (ratio * 100).toString();
  var tmp;
  if (definiteTime !== undefined) {
    var date = Caml_option.valFromOption(definiteTime);
    tmp = React.createElement("p", undefined, React.createElement("small", undefined, React.createElement("strong", undefined, Globals$WildCards.restr("Foreclosure date: "), React.createElement(RimbleUi.Tooltip, {
                      message: "This is the date the deposit will run out and the current owner will lose guardianship of " + tokenName,
                      placement: "top",
                      children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                    }))), React.createElement("br", undefined), Globals$WildCards.restr(date.format("LLLL")), React.createElement("br", undefined), React.createElement("small", undefined, Globals$WildCards.restr("( "), React.createElement(CountDown$WildCards.make, {
                  endDateMoment: date
                }), Globals$WildCards.restr(")")));
  } else {
    tmp = null;
  }
  var tmp$1;
  if (daysHeld !== undefined) {
    var timeAcquiredString = daysHeld[1].toISOString(undefined);
    tmp$1 = React.createElement("p", undefined, React.createElement("small", undefined, React.createElement("strong", undefined, Globals$WildCards.restr("Days Held: "), React.createElement(RimbleUi.Tooltip, {
                      message: "This is the amount of time " + (tokenName + (" has been held. It was acquired on the " + (timeAcquiredString + "."))),
                      placement: "top",
                      children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                    }))), React.createElement("br", undefined), Globals$WildCards.restr(daysHeld[0].toFixed()), React.createElement("br", undefined));
  } else {
    tmp$1 = null;
  }
  return React.createElement(React.Fragment, {
              children: null
            }, React.createElement("div", undefined, React.createElement("small", undefined, React.createElement("strong", undefined, Globals$WildCards.restr("Monthly Pledge (at " + (monthlyRate + "%): ")), React.createElement(RimbleUi.Tooltip, {
                              message: "This is the monthly percentage contribution of " + (tokenName + "'s sale price that will go towards conservation of at risk animals. This is deducted continuously from the deposit and paid by the owner of the animal"),
                              placement: "top",
                              children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                            }))), React.createElement("br", undefined), optMonthlyPledgeEth !== undefined ? Globals$WildCards.restr(optMonthlyPledgeEth + " ETH") : React.createElement(RimbleUi.Loader, { }), React.createElement("br", undefined), React.createElement("small", undefined, optMonthlyPledgeUsd !== undefined ? Globals$WildCards.restr("(" + (Caml_option.valFromOption(optMonthlyPledgeUsd) + " USD)")) : null)), React.createElement("p", undefined, React.createElement("small", undefined, React.createElement("strong", undefined, Globals$WildCards.restr("Current Patron: "), React.createElement(RimbleUi.Tooltip, {
                              message: "This is the " + (String(userIdType) + " of the current owner"),
                              placement: "top",
                              children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                            }))), React.createElement("br", undefined), React.createElement("a", {
                      onClick: (function (e) {
                          e.preventDefault();
                          return Curry._1(clearAndPush, "/#user/" + (String(currentPatron) + ""));
                        })
                    }, Globals$WildCards.restr(displayNameStr))), React.createElement("p", undefined, React.createElement("small", undefined, React.createElement("strong", undefined, Globals$WildCards.restr("Available Deposit: "), React.createElement(RimbleUi.Tooltip, {
                              message: "This is the amount the owner has deposited to pay their monthly contribution",
                              placement: "top",
                              children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                            }))), React.createElement("br", undefined), Globals$WildCards.restr(match[0] + " ETH"), React.createElement("br", undefined), React.createElement("small", undefined, Globals$WildCards.restr("(" + (match[1] + " USD)")))), React.createElement("p", undefined, React.createElement("small", undefined, React.createElement("strong", undefined, Globals$WildCards.restr(tokenName + "'s Patronage: "), React.createElement(RimbleUi.Tooltip, {
                              message: "This is the total contribution that has been raised thanks to the wildcard, " + tokenName,
                              placement: "top",
                              children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                            }))), React.createElement("br", undefined), Globals$WildCards.restr(match$1[0] + " ETH"), React.createElement("br", undefined), React.createElement("small", undefined, Globals$WildCards.restr("(" + (match$1[1] + " USD)")))), tmp, tmp$1);
}

function Info$Auction(Props) {
  var chain = Props.chain;
  var tokenId = Props.tokenId;
  var abandoned = Props.abandoned;
  var auctionStartTime = Props.auctionStartTime;
  var currentPatron = Globals$WildCards.$pipe$pipe$pipe$pipe(QlHooks$WildCards.usePatron(chain, tokenId), "Loading");
  var displayName = UserProvider$WildCards.useDisplayName(currentPatron);
  var displayNameStr = UserProvider$WildCards.displayNameToString(displayName);
  var tokenName = Globals$WildCards.$pipe$pipe$pipe$pipe(QlHooks$WildCards.useWildcardName(tokenId), "loading name");
  var clearAndPush = RootProvider$WildCards.useClearNonUrlStateAndPushRoute(undefined);
  var currentUsdEthPrice = UsdPriceProvider$WildCards.useUsdPrice(undefined);
  var match = Globals$WildCards.mapd(QlHooks$WildCards.useAmountRaisedToken(chain, tokenId), /* tuple */[
        "Loading",
        "Loading"
      ], (function (a) {
          return /* tuple */[
                  Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(Globals$WildCards.$pipe$pipe$pipe$pipe(Belt_Float.fromString(Eth$WildCards.get(a, /* Eth */Block.__(0, [/* ether */-193685050]))), 0.0), 9),
                  Globals$WildCards.mapd(currentUsdEthPrice, "Loading", (function (usdEthRate) {
                          return Eth$WildCards.get(a, /* Usd */Block.__(1, [
                                        usdEthRate,
                                        2
                                      ]));
                        }))
                ];
        }));
  var ratio = QlHooks$WildCards.usePledgeRate(chain, tokenId);
  var monthlyRate = (ratio * 100).toString();
  return React.createElement(React.Fragment, {
              children: null
            }, React.createElement("div", undefined, ratio === 0 ? React.createElement("p", undefined, Globals$WildCards.restr("The monthly pledge rate will be revealed at launch.")) : React.createElement(React.Fragment, undefined, React.createElement("small", undefined, React.createElement("strong", undefined, Globals$WildCards.restr("Monthly Pledge Rate:"), React.createElement(RimbleUi.Tooltip, {
                                    message: "This is the monthly percentage contribution of " + (tokenName + "'s sale price that will go towards conservation of at risk animals. This is deducted continuously from the deposit and paid by the guardian of the animal"),
                                    placement: "top",
                                    children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                                  }))), React.createElement("br", undefined), Globals$WildCards.restr(monthlyRate + " %"))), abandoned ? React.createElement("p", undefined, React.createElement("strong", undefined, Globals$WildCards.restr("The previous guardian was "), React.createElement("a", {
                            onClick: (function (e) {
                                e.preventDefault();
                                return Curry._1(clearAndPush, "/#user/" + (String(currentPatron) + ""));
                              })
                          }, Globals$WildCards.restr(displayNameStr)), React.createElement(RimbleUi.Tooltip, {
                            message: "This happens when the user\'s deposit runs out for the wildcard.",
                            placement: "top",
                            children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                          })), React.createElement("br", undefined)) : React.createElement("p", undefined, tokenName + " has never had a guardian - you can be the first."), React.createElement("p", undefined, React.createElement("small", undefined, React.createElement("strong", undefined, Globals$WildCards.restr(tokenName + "'s Patronage: "), React.createElement(RimbleUi.Tooltip, {
                              message: "This is the total contribution that has been raised thanks to " + tokenName,
                              placement: "top",
                              children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                            }))), React.createElement("br", undefined), Globals$WildCards.restr(match[0] + " ETH"), React.createElement("br", undefined), React.createElement("small", undefined, Globals$WildCards.restr("(" + (match[1] + " USD)")))), abandoned ? React.createElement(React.Fragment, undefined, React.createElement("p", undefined, React.createElement("small", undefined, React.createElement("strong", undefined, Globals$WildCards.restr("Abandoned since: "), React.createElement(RimbleUi.Tooltip, {
                                    message: "This is the date the deposit ran out and the current guardian will lose guardianship of " + tokenName,
                                    placement: "top",
                                    children: React.createElement("span", undefined, Globals$WildCards.restr("ⓘ"))
                                  }))), React.createElement("br", undefined), Globals$WildCards.restr(auctionStartTime.format("LLLL")), React.createElement("br", undefined))) : null);
}

var Auction = {
  make: Info$Auction
};

var make = Info;

export {
  make ,
  Auction ,
  
}
/* react Not a pure module */
