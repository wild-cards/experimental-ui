type t = BN.bn;

[@bs.deriving jsConverter]
type ethUnit = [
  | `wei
  | `kwei
  | `mwei
  | `gwei
  | `microether
  | `milliether
  | `ether
  | `kether
  | `mether
  | `geher
  | `tether
];

[@bs.module "web3-utils"] external fromWei: (t, string) => string = "fromWei";
[@bs.module "web3-utils"] external toWei: (string, string) => string = "toWei";

let fromWeiEth: t => string = value => fromWei(value, ethUnitToJs(`ether));

type getUnit =
  | Eth(ethUnit)
  | Usd(float);

let get = (value, unit, ~digits: option(int)) => {
  switch (unit) {
  | Eth(unit) => fromWei(value, unit->ethUnitToJs)
  | Usd(conversion) =>
    (fromWei(value, `ether->ethUnitToJs)->Js.Float.fromString *. conversion)
    ->Js.Float.toPrecisionWithPrecision(~digits=2)
  };
};

let make: string => option(t) =
  wei => {
    let result = Helper.isStringInteger(wei) ? Some(BN.new_(wei)) : None;
    result;
  };
let makeWithDefault: (string, int) => t =
  (tokenId, default) =>
    switch (make(tokenId)) {
    | Some(wei) => wei
    | None => default->Belt.Int.toString->BN.new_
    };
let makeFromInt: int => t = tokenId => tokenId->Belt.Int.toString->BN.new_;

let makeFromEthStr: string => option(t) =
  eth =>
    Belt.Float.fromString(eth)
    ->Belt.Option.flatMap(ethFloat =>
        Some(BN.new_(toWei(Belt.Float.toString(ethFloat), "ether")))
      );
