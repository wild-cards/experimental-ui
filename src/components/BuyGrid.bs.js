// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Css from "bs-css-emotion/src/Css.bs.js";
import * as Dapp from "./Dapp.bs.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as QlHooks from "../harberger-lib/QlHooks.bs.js";
import * as TokenId from "../harberger-lib/TokenId.bs.js";
import * as RimbleUi from "rimble-ui";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as ReactTabs from "react-tabs";
import * as RootProvider from "../harberger-lib/RootProvider.bs.js";

var backgroundStyle = Curry._1(Css.style, {
      hd: Css.paddingTop(Css.rem(1)),
      tl: {
        hd: Css.unsafe("backgroundImage", "linear-gradient(to top, #74C7D7 0%, white 100%)"),
        tl: /* [] */0
      }
    });

var headingStyle = Curry._1(Css.style, {
      hd: Css.paddingTop(Css.rem(5)),
      tl: {
        hd: Css.textAlign("center"),
        tl: /* [] */0
      }
    });

function BuyGrid$Grid(Props) {
  var chain = Props.chain;
  var allAnimals = QlHooks.useAnimalList(chain);
  var allAnimalsReversed = Belt_Array.reverse(allAnimals);
  return React.createElement(RimbleUi.Flex, {
              children: null,
              flexWrap: "wrap",
              alignItems: "stretch",
              justifyContent: "space-around",
              px: 50
            }, Belt_Array.map(allAnimalsReversed, (function (animal) {
                    return React.createElement(RimbleUi.Box, {
                                p: 3,
                                fontSize: 4,
                                children: React.createElement(RimbleUi.Card, {
                                      children: React.createElement(Dapp.CarouselAnimal.make, {
                                            animal: animal,
                                            scalar: 1,
                                            chain: chain
                                          })
                                    }),
                                width: [
                                  1,
                                  1,
                                  0.3
                                ],
                                key: TokenId.toString(animal)
                              });
                  })), React.createElement(RimbleUi.Box, {
                  p: 3,
                  fontSize: 4,
                  children: null,
                  width: [
                    1,
                    1,
                    0.3
                  ]
                }), React.createElement(RimbleUi.Box, {
                  p: 3,
                  fontSize: 4,
                  children: null,
                  width: [
                    1,
                    1,
                    0.3
                  ]
                }));
}

var Grid = {
  make: BuyGrid$Grid
};

function indexToType(tabIndex) {
  if (tabIndex !== 0) {
    if (tabIndex !== 1) {
      return "unknown";
    } else {
      return "2nd-edition";
    }
  } else {
    return "1st-edition";
  }
}

function BuyGrid(Props) {
  var wildcardsEdition = Props.wildcardsEdition;
  var clearAndPush = RootProvider.useClearNonUrlStateAndPushRoute(undefined);
  var index = wildcardsEdition ? 1 : 0;
  var selectLeaderBoard = function (newIndex, _oldIndex) {
    Curry._1(clearAndPush, "#explorer/" + indexToType(newIndex));
    return true;
  };
  return React.createElement("div", {
              className: backgroundStyle
            }, React.createElement("div", undefined, React.createElement("h1", {
                      className: headingStyle
                    }, "Wildcards Kingdom"), React.createElement(ReactTabs.Tabs, {
                      selectedIndex: index,
                      onSelect: selectLeaderBoard,
                      children: null
                    }, React.createElement(ReactTabs.TabList, {
                          children: null
                        }, React.createElement(ReactTabs.Tab, {
                              children: "First edition"
                            }), React.createElement(ReactTabs.Tab, {
                              children: "Second edition"
                            })), React.createElement(ReactTabs.TabPanel, {
                          children: React.createElement(BuyGrid$Grid, {
                                chain: /* MainnetQuery */2
                              })
                        }), React.createElement(ReactTabs.TabPanel, {
                          children: React.createElement(BuyGrid$Grid, {
                                chain: /* MaticQuery */1
                              })
                        }))));
}

var make = BuyGrid;

export {
  backgroundStyle ,
  headingStyle ,
  Grid ,
  indexToType ,
  make ,
  
}
/* backgroundStyle Not a pure module */
