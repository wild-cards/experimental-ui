// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as BnJs from "bn.js";
import * as Belt_Float from "bs-platform/lib/es6/belt_Float.js";
import * as Web3Utils from "web3-utils";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Js_mapperRt from "bs-platform/lib/es6/js_mapperRt.js";
import * as Helper$WildCards from "./Helper.bs.js";
import * as Globals$WildCards from "./Globals.bs.js";

var jsMapperConstantArray = [
  /* tuple */[
    -999317868,
    "gwei"
  ],
  /* tuple */[
    -954959600,
    "kwei"
  ],
  /* tuple */[
    -932780466,
    "mwei"
  ],
  /* tuple */[
    -707103534,
    "tether"
  ],
  /* tuple */[
    -572799422,
    "microether"
  ],
  /* tuple */[
    -193685050,
    "ether"
  ],
  /* tuple */[
    5940379,
    "wei"
  ],
  /* tuple */[
    16570009,
    "milliether"
  ],
  /* tuple */[
    156954169,
    "mether"
  ],
  /* tuple */[
    290951031,
    "geher"
  ],
  /* tuple */[
    1017394555,
    "kether"
  ]
];

function ethUnitToJs(param) {
  return Js_mapperRt.binarySearch(11, param, jsMapperConstantArray);
}

function ethUnitFromJs(param) {
  return Js_mapperRt.revSearch(11, jsMapperConstantArray, param);
}

function fromWeiEth(value) {
  return Web3Utils.fromWei(value, ethUnitToJs(/* ether */-193685050));
}

function get(value, unit) {
  if (unit.tag) {
    return Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(Number(Web3Utils.fromWei(value, ethUnitToJs(/* ether */-193685050))) * unit[0], unit[1]);
  } else {
    return Web3Utils.fromWei(value, ethUnitToJs(unit[0]));
  }
}

function make(wei) {
  if (Helper$WildCards.isPositiveStringInteger(wei)) {
    return Caml_option.some(new BnJs.default(wei));
  }
  
}

function makeWithDefault(tokenId, $$default) {
  var wei = make(tokenId);
  if (wei !== undefined) {
    return Caml_option.valFromOption(wei);
  } else {
    return new BnJs.default(String($$default));
  }
}

function makeFromInt(tokenId) {
  return new BnJs.default(String(tokenId));
}

function makeFromEthStr(eth) {
  return Belt_Option.flatMap(Belt_Float.fromString(eth), (function (ethFloat) {
                return Caml_option.some(new BnJs.default(Web3Utils.toWei(String(ethFloat), "ether")));
              }));
}

function toFixedWithPrecisionNoTrailingZeros(digitsOpt, eth) {
  var digits = digitsOpt !== undefined ? digitsOpt : 9;
  return Globals$WildCards.toFixedWithPrecisionNoTrailingZeros(Belt_Option.getWithDefault(Belt_Float.fromString(Web3Utils.fromWei(eth, ethUnitToJs(/* ether */-193685050))), 0), digits);
}

export {
  ethUnitToJs ,
  ethUnitFromJs ,
  fromWeiEth ,
  get ,
  make ,
  makeWithDefault ,
  makeFromInt ,
  makeFromEthStr ,
  toFixedWithPrecisionNoTrailingZeros ,
  
}
/* bn.js Not a pure module */
