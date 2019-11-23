[@bs.deriving {abstract: light}]
type drizzle = {web3: Web3.t};

[@bs.deriving {abstract: light}]
type drizzleContext = {
  drizzle,
  [@bs.as "useCacheCall"]
  useCacheCallStr: (. string, string, TokenId.t) => Js.Nullable.t(string),
  [@bs.as "useCacheCall"]
  useCacheCallVitalikStr: (. string, string) => Js.Nullable.t(string),
};

[@bs.deriving {abstract: light}]
type drizzleState = {accounts: array(string)};

[@bs.module "@drizzle/react-plugin"] [@bs.scope "drizzleReactHooks"]
external useDrizzleState: ([@bs.uncurry] (drizzleState => 'a)) => 'a =
  "useDrizzleState";

[@bs.module "@drizzle/react-plugin"] [@bs.scope "drizzleReactHooks"]
external useDrizzle: unit => drizzleContext = "useDrizzle";

let useCurrentUser: unit => option(string) =
  () => {
    let state = useDrizzleState(state => state->accounts);
    state->Belt.Array.get(0);
  };

let useWeb3: unit => Web3.t =
  () => {
    useDrizzle()->drizzle->web3;
  };
let useCacheCallStr = (method, id) =>
  useDrizzle()->useCacheCallStr(. "WildcardSteward_v0", method, id);

let useCacheCallVitalikStr = method =>
  useDrizzle()->useCacheCallVitalikStr(. "VitalikSteward", method);

let useTotalPatronageWei = id => {
  let totalCollectedOpt =
    "totalCollected"->useCacheCallStr(id)->Js.Nullable.toOption;
  let patronageOwedOpt =
    "patronageOwed"->useCacheCallStr(id)->Js.Nullable.toOption;

  switch (totalCollectedOpt, patronageOwedOpt) {
  | (Some(totalCollected), Some(patronageOwed)) =>
    let totalCollectedBN: BN.bn = BN.new_(totalCollected);
    let patronageOwedBN: BN.bn = BN.new_(patronageOwed);
    Some(totalCollectedBN->BN.addGet(. patronageOwedBN)->BN.toStringGet(.));
  | _ => None
  };
};

let useTimeAcquired = id => {
  let timeAquiredRaw =
    "timeAcquired"->useCacheCallStr(id)->Js.Nullable.toOption;

  timeAquiredRaw->Belt.Option.flatMap(timeStamp =>
    Some(MomentRe.momentWithUnix(int_of_string(timeStamp)))
  );
};
let useTimeAcquiredVitalik = () => {
  let timeAcquiredRaw =
    "timeAcquired"->useCacheCallVitalikStr->Js.Nullable.toOption;

  timeAcquiredRaw->Belt.Option.flatMap(timeStamp =>
    Some(MomentRe.momentWithUnix(int_of_string(timeStamp)))
  );
};

let useTimeAcquiredGorilla: Gorilla.gorilla => option(MomentRe.Moment.t) =
  gorilla => {
    switch (Gorilla.getTokenId(gorilla)) {
    | Some(gorillaId) => gorillaId->useTimeAcquired
    | None => useTimeAcquiredVitalik()
    };
  };
