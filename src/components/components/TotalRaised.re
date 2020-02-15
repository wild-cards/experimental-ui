open UsdPriceProvider;
open Belt.Option;

module TotalRaisedEtherCountup = {
  [@bs.module "./TotalRaisedEtherCountup.js"] [@react.component]
  external make: (~totalRaised: string) => React.element = "default";
};

type patronageRaised =
  | Loaded(string, option(string))
  | Loading;

let uesTotalPatronage = () => {
  let optTotalPatronageWei = QlHooks.useAmountRaised(); //->Web3Utils.fromWeiBNToEth;
  let optCurrentUsdEthPrice = useUsdPrice(); //->mapWithDefault(0., a => a);
  // let optCurrentUsdEthPrice = Some(0.5); //->mapWithDefault(0., a => a);

  switch (optTotalPatronageWei) {
  | Some(totalPatronageWei) =>
    let totalPatronageEth =
      totalPatronageWei->BN.toStringGet(.)->Web3Utils.fromWeiToEth;

    let optTotaPatronageUsd =
      optCurrentUsdEthPrice->Belt.Option.flatMap(currentUsdEthPrice =>
        Some(
          Js.Float.toFixedWithPrecision(
            Belt.Float.fromString(totalPatronageEth)
            ->mapWithDefault(0., a => a)
            *. currentUsdEthPrice,
            ~digits=2,
          ),
        )
      );

    Loaded(totalPatronageEth, optTotaPatronageUsd);
  | _ => Loading
  };
};

[@react.component]
let make = () => {
  let totalPatronageRaised = uesTotalPatronage();

  switch (totalPatronageRaised) {
  | Loaded(totalRaised, optTotaPatronageUsd) =>
    <p>
      <small>
        <span className={Styles.totalRaisedText(1.5)}>
          {React.string("Wildcards has currently raised ")}
        </span>
        <br />
        <span className={Styles.totalRaisedText(4.)}>
          <TotalRaisedEtherCountup totalRaised />
          <strong> {React.string(" ETH ")} </strong>
        </span>
        <br />
        {switch (optTotaPatronageUsd) {
         | Some(totalPatronageUsd) =>
           <React.Fragment>
             <span className={Styles.totalRaisedText(2.5)}>
               {React.string("(")}
               {React.string(totalPatronageUsd)}
               <strong> {React.string(" USD")} </strong>
               {React.string(")")}
             </span>
             <br />
             <span className={Styles.totalRaisedText(1.5)}>
               {React.string(" for conservation.")}
             </span>
           </React.Fragment>
         | None => React.null
         }}
      </small>
    </p>
  | Loading => <Rimble.Loader />
  };
};
