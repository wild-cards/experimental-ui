// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Styles from "../Styles.bs.js";
import * as QlHooks from "../harberger-lib/QlHooks.bs.js";
import * as TokenId from "../harberger-lib/TokenId.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Accounting from "../harberger-lib/Accounting.bs.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Float from "rescript/lib/es6/belt_Float.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as FormatMoney from "../components/components/FormatMoney.bs.js";
import * as PriceDisplay from "../harberger-lib/PriceDisplay.bs.js";

var dragonImg = "/img/animals/Glen.svg";

var refreshImg = "/img/icons/refresh.svg";

var wildTomorrowFundImg = "/img/conservation-partners/wild-tomorrow-fund.png";

var laSendaVerdeImg = "/img/conservation-partners/senda-verde.png";

var greatWhaleConservancyImg = "/img/conservation-partners/great-whale-conservancy-small.png";

var darwinAnimalDoctorsImg = "/img/conservation-partners/darwin-animal-doctors.svg";

var conservationPartners = [
  {
    name: "Wild Tomorrow Fund",
    image: wildTomorrowFundImg,
    link: "https://www.wildtomorrowfund.org/",
    index: 1
  },
  {
    name: "La Senda Verde",
    image: laSendaVerdeImg,
    link: "http://www.sendaverde.org/",
    index: 2
  },
  {
    name: "The Great Whale Conservancy",
    image: greatWhaleConservancyImg,
    link: "http://greatwhaleconservancy.org/",
    index: 3
  },
  {
    name: "Darwin Animal Doctors",
    image: darwinAnimalDoctorsImg,
    link: "http://darwinanimaldoctors.org/",
    index: 4
  }
];

function VotePage$HackyComponentThatCallsAFunctionOnce(Props) {
  var reloadFunction = Props.reloadFunction;
  var match = React.useState(function () {
        return false;
      });
  if (!match[0]) {
    Curry._1(reloadFunction, undefined);
    Curry._1(match[1], (function (param) {
            return true;
          }));
  }
  return null;
}

var HackyComponentThatCallsAFunctionOnce = {
  make: VotePage$HackyComponentThatCallsAFunctionOnce
};

function VotePage$HackyComponentThatReloadsOnTimeout(Props) {
  var reloadFunction = Props.reloadFunction;
  var timeoutTime = Props.timeoutTime;
  var match = React.useState(function () {
        return false;
      });
  var setHasCalledFunction = match[1];
  var hasCalledFunction = match[0];
  React.useEffect((function () {
          var timeout = setTimeout((function (param) {
                  if (!hasCalledFunction) {
                    Curry._1(reloadFunction, undefined);
                    return Curry._1(setHasCalledFunction, (function (param) {
                                  return true;
                                }));
                  }
                  
                }), timeoutTime);
          return (function (param) {
                    clearTimeout(timeout);
                    
                  });
        }), [
        reloadFunction,
        hasCalledFunction,
        setHasCalledFunction,
        timeoutTime
      ]);
  return null;
}

var HackyComponentThatReloadsOnTimeout = {
  make: VotePage$HackyComponentThatReloadsOnTimeout
};

function VotePage$OrganisationVote(Props) {
  var conservationPartner = Props.conservationPartner;
  var selectConservation = Props.selectConservation;
  var index = Props.index;
  return React.createElement(RimbleUi.Box, {
              children: null,
              width: [
                1,
                0.25
              ]
            }, React.createElement("a", {
                  href: conservationPartner.link,
                  target: "_blank"
                }, React.createElement("img", {
                      className: Curry._1(Css.style, {
                            hd: Css.display("block"),
                            tl: {
                              hd: Css.width({
                                    NAME: "percent",
                                    VAL: 70
                                  }),
                              tl: {
                                hd: Css.maxWidth({
                                      NAME: "px",
                                      VAL: 800
                                    }),
                                tl: {
                                  hd: Css.margin(Css.auto),
                                  tl: /* [] */0
                                }
                              }
                            }
                          }),
                      src: conservationPartner.image
                    })), React.createElement(RimbleUi.Button, {
                  className: Curry._1(Css.style, {
                        hd: Css.display("block"),
                        tl: {
                          hd: Css.margin(Css.auto),
                          tl: {
                            hd: Css.width({
                                  NAME: "percent",
                                  VAL: 90
                                }),
                            tl: /* [] */0
                          }
                        }
                      }),
                  disabled: true,
                  children: "Voting Disabled",
                  onClick: (function (param) {
                      return Curry._1(selectConservation, index);
                    })
                }));
}

var OrganisationVote = {
  make: VotePage$OrganisationVote
};

function VotePage(Props) {
  var chain = Props.chain;
  var match = React.useState(function () {
        return /* DefaultView */0;
      });
  var setVoteStep = match[1];
  var selectConservation = function (conservationArrayIndex) {
    var submitVoteFunction = function (param) {
      return Curry._1(setVoteStep, (function (param) {
                    return /* ProcessTransaction */1;
                  }));
    };
    return Curry._1(setVoteStep, (function (param) {
                  return /* SelectedOrganisationToVote */{
                          _0: conservationArrayIndex,
                          _1: submitVoteFunction
                        };
                }));
  };
  var glen = TokenId.makeFromInt(13);
  var optCurrentPrice = PriceDisplay.usePrice(chain, glen);
  var match$1 = QlHooks.usePledgeRateDetailed(chain, glen);
  var match$2 = optCurrentPrice !== undefined ? [
      FormatMoney.toFixedWithPrecisionNoTrailingZeros(Accounting.defaultZeroF(Belt_Float.fromString(optCurrentPrice[0])) * match$1[2], 5),
      undefined
    ] : [
      undefined,
      undefined
    ];
  var optMonthlyPledgeUsd = match$2[1];
  var optMonthlyPledgeEth = match$2[0];
  return React.createElement(RimbleUi.Box, {
              children: React.createElement(RimbleUi.Box, {
                    children: React.createElement(RimbleUi.Flex, {
                          children: null,
                          flexWrap: "wrap"
                        }, React.createElement(RimbleUi.Box, {
                              children: null,
                              width: [
                                1,
                                1,
                                0.3
                              ]
                            }, React.createElement("img", {
                                  className: Curry._1(Css.style, {
                                        hd: Css.maxWidth({
                                              NAME: "px",
                                              VAL: 800
                                            }),
                                        tl: {
                                          hd: Css.margin(Css.auto),
                                          tl: /* [] */0
                                        }
                                      }),
                                  src: dragonImg
                                }), React.createElement("a", {
                                  href: "/#details/13"
                                }, React.createElement("h3", {
                                      className: Curry._1(Css.style, {
                                            hd: Css.textAlign("center"),
                                            tl: /* [] */0
                                          })
                                    }, "Glen the Dragon from Turin")), React.createElement("p", {
                                  className: Curry._1(Css.style, {
                                        hd: Css.textAlign("center"),
                                        tl: /* [] */0
                                      })
                                }, "Monthly contribution: ", optMonthlyPledgeEth !== undefined ? optMonthlyPledgeEth + " ETH" : React.createElement(RimbleUi.Loader, {
                                        className: Curry._1(Css.style, {
                                              hd: Css.margin(Css.auto),
                                              tl: /* [] */0
                                            })
                                      }), React.createElement("br", undefined), React.createElement("small", undefined, optMonthlyPledgeUsd !== undefined ? "(" + (Caml_option.valFromOption(optMonthlyPledgeUsd) + " USD)") : null)), React.createElement("br", undefined), React.createElement("br", undefined), React.createElement("br", undefined), React.createElement("h4", {
                                  className: Curry._1(Css.style, {
                                        hd: Css.width({
                                              NAME: "percent",
                                              VAL: 100
                                            }),
                                        tl: {
                                          hd: Css.textAlign(Css.center),
                                          tl: /* [] */0
                                        }
                                      })
                                }, "Voting coming again soon!")), React.createElement(RimbleUi.Box, {
                              children: null,
                              width: [
                                1,
                                1,
                                0.7
                              ]
                            }, React.createElement("h3", {
                                  className: Curry._1(Css.style, {
                                        hd: Css.textDecoration("underline"),
                                        tl: /* [] */0
                                      })
                                }, "How it works"), React.createElement("p", undefined, "Glen is a special Wildcard, this mystical creature is not tied to a specific conservation but rather each month the owners of Wildcards vote for a conservation they think should receive the funds raised by Glen."), React.createElement("p", undefined, "The voting mechanism uses quadratic voting. Wildcards owners vote using Wildcards Loyalty tokens which they earn from holding a Wildcard. Quadratic voting means that the number of loyalty tokens don't represent the exact number of votes but rather the number of loyalty tokens is square rooted to represent the number of votes."), React.createElement("h3", {
                                  className: Curry._1(Css.style, {
                                        hd: Css.textDecoration("underline"),
                                        tl: /* [] */0
                                      })
                                }, "Quadratic Voting    ", match[0] !== /* DefaultView */0 ? React.createElement("img", {
                                        className: Curry._1(Css.style, {
                                              hd: Css.maxHeight({
                                                    NAME: "px",
                                                    VAL: 16
                                                  }),
                                              tl: {
                                                hd: Css.paddingLeft({
                                                      NAME: "rem",
                                                      VAL: 1
                                                    }),
                                                tl: /* [] */0
                                              }
                                            }),
                                        src: refreshImg,
                                        onClick: (function (param) {
                                            return Curry._1(setVoteStep, (function (param) {
                                                          return /* DefaultView */0;
                                                        }));
                                          })
                                      }) : null), React.createElement("small", undefined, React.createElement("p", undefined, "Unfortunately we have decided to stop running our DAO on mainnet ethereum. We are moving all of this code to Matic where voting will be much cheaper and more frictionless")), React.createElement(RimbleUi.Flex, {
                                  children: Belt_Array.mapWithIndex(conservationPartners, (function (index, conservationPartner) {
                                          return React.createElement(VotePage$OrganisationVote, {
                                                      conservationPartner: conservationPartner,
                                                      selectConservation: selectConservation,
                                                      index: index,
                                                      key: conservationPartner.name
                                                    });
                                        })),
                                  flexWrap: "wrap",
                                  alignItems: "center"
                                })))
                  }),
              className: Styles.topBody
            });
}

var make = VotePage;

export {
  dragonImg ,
  refreshImg ,
  wildTomorrowFundImg ,
  laSendaVerdeImg ,
  greatWhaleConservancyImg ,
  darwinAnimalDoctorsImg ,
  conservationPartners ,
  HackyComponentThatCallsAFunctionOnce ,
  HackyComponentThatReloadsOnTimeout ,
  OrganisationVote ,
  make ,
  
}
/* Css Not a pure module */
