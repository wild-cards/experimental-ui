// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Styles from "../../Styles.bs.js";
import * as QlHooks from "../../harberger-lib/QlHooks.bs.js";
import * as Web3Utils from "../../harberger-lib/Web3Utils.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Float from "bs-platform/lib/es6/belt_Float.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as UsdPriceProvider from "../../harberger-lib/components/UsdPriceProvider.bs.js";
import * as TotalRaisedEtherCountup from "./TotalRaisedEtherCountup.bs.js";

function uesTotalPatronage(param) {
  var optTotalPatronageWei = QlHooks.useAmountRaised(undefined);
  var optCurrentUsdEthPrice = UsdPriceProvider.useUsdPrice(undefined);
  if (optTotalPatronageWei === undefined) {
    return /* Loading */0;
  }
  var totalPatronageEth = Web3Utils.fromWeiToEth(Caml_option.valFromOption(optTotalPatronageWei).toString());
  var optTotaPatronageUsd = Belt_Option.flatMap(optCurrentUsdEthPrice, (function (currentUsdEthPrice) {
          return (Belt_Option.mapWithDefault(Belt_Float.fromString(totalPatronageEth), 0, (function (a) {
                            return a;
                          })) * currentUsdEthPrice).toFixed(2);
        }));
  return /* Loaded */{
          _0: totalPatronageEth,
          _1: optTotaPatronageUsd
        };
}

function TotalRaised(Props) {
  var totalPatronageRaised = uesTotalPatronage(undefined);
  if (!totalPatronageRaised) {
    return React.createElement(RimbleUi.Loader, {});
  }
  var optTotaPatronageUsd = totalPatronageRaised._1;
  return React.createElement("div", {
              className: Curry._1(Css.style, {
                    hd: Css.display("flex"),
                    tl: {
                      hd: Css.alignItems("center"),
                      tl: {
                        hd: Css.justifyContent("center"),
                        tl: {
                          hd: Css.flexDirection("column"),
                          tl: /* [] */0
                        }
                      }
                    }
                  })
            }, React.createElement("p", {
                  className: Curry._1(Css.style, {
                        hd: Css.display("table"),
                        tl: /* [] */0
                      })
                }, React.createElement("small", undefined, React.createElement("span", {
                          className: Styles.totalRaisedText(1.5)
                        }, "Wildcards has currently raised "), React.createElement("br", undefined), React.createElement("span", {
                          className: Styles.totalRaisedText(4)
                        }, React.createElement(TotalRaisedEtherCountup.make, {
                              totalRaised: totalPatronageRaised._0
                            }), React.createElement("strong", undefined, " ETH ")), React.createElement("br", undefined), optTotaPatronageUsd !== undefined ? React.createElement(React.Fragment, {
                            children: null
                          }, React.createElement("span", {
                                className: Styles.totalRaisedText(2.5)
                              }, "(", optTotaPatronageUsd, React.createElement("strong", undefined, " USD"), ")"), React.createElement("br", undefined), React.createElement("span", {
                                className: Styles.totalRaisedText(1.5)
                              }, " for conservation.")) : null)));
}

var make = TotalRaised;

export {
  uesTotalPatronage ,
  make ,
  
}
/* Css Not a pure module */
