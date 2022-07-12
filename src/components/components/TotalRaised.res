@react.component
let make = () => {
  let (totalRaisedEthPaidOut, totalRaisedUsdEquivalent) =
    Config.orgWtihdrawalsMapping
    ->Js.Dict.values
    ->Array.concatMany
    ->Array.reduce((Ethers.BigNumber.fromInt(0), 0.), (
      (totalRaisedEthPaidOut, totalRaisedUsdEquivalent),
      payout,
    ) => {
      if payout.networkId == 1 {
        (
          totalRaisedEthPaidOut->Ethers.BigNumber.add(payout.amount),
          totalRaisedUsdEquivalent +. payout.amountInUsd,
        )
      } else {
        (totalRaisedEthPaidOut, totalRaisedUsdEquivalent)
      }
    })

  let optTotalPatronageWei = QlHooks.useAmountRaised(~chain=Client.MainnetQuery)

  let optTotalPatronageDai = QlHooks.useAmountRaised(~chain=Client.MaticQuery)

  switch (optTotalPatronageWei, optTotalPatronageDai) {
  | (Some(mainnetEth), Some(maticDai)) =>
    <div
      className={
        open Css
        style(list{
          // These styles make the total raised counter always display in the centre.
          display(#flex),
          alignItems(#center),
          justifyContent(#center),
          flexDirection(#column),
        })
      }>
      <p
        className={
          open Css
          style(list{display(#table)})
        }>
        <span className={Styles.totalRaisedText(1.5)}>
          {React.string("Wildcards has currently raised ")}
        </span>
        <br />
        <Amounts.AmountRaised
          ethPaidOut={totalRaisedEthPaidOut->Ethers.BigNumber.toString->BN.new_}
          valueEthPaidOut=totalRaisedUsdEquivalent
          mainnetEth
          maticDai
          populateElement={(~bigTextComponent, ~smallTextComponent, ~optCommentTextComponent) => {
            <>
              <span className={Styles.totalRaisedText(4.)}>
                {bigTextComponent}
                <span className={Styles.totalRaisedText(0.5)}> {smallTextComponent} </span>
                <strong> {React.string(" USD")} </strong>
              </span>
              <br />
              {switch optCommentTextComponent {
              | Some(commentTextComponent) =>
                <React.Fragment>
                  <span className={Styles.totalRaisedText(2.)}> {commentTextComponent} </span>
                </React.Fragment>
              | None => React.null
              }}
              <br />
              <span className={Styles.totalRaisedText(1.5)}>
                {React.string(" for conservation.")}
              </span>
            </>
          }}
        />
      </p>
    </div>
  | _ => <Rimble.Loader />
  }
}
