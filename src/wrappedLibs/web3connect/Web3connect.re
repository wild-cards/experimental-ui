module Core = {
  [@bs.deriving {abstract: light}]
  type web3connectCore = {
    setOnConnect: (Web3.provider => unit) => unit,
    setAfterConnectAction: (unit => unit) => unit,
    toggleModal: (. unit) => unit,
  };

  [@bs.module "./Web3connectCore"]
  external getCore: option(string) => web3connectCore = "default";
};

module CustomButton = {
  [@react.component]
  let make =
      (
        ~children: React.element,
        // ~onConnect: Web3.provider => unit,
        ~afterConnect: unit => unit=?,
      ) => {
    // ~onClose: 'close => unit=?,
    // ~onError: 'error => unit=?,
    // ~onDisconnect: 'disconnect => unit=?,
    // ~network: string=?,
    Core.(
      <Rimble.Button
        onClick={event => {
          ReactEvent.Form.preventDefault(event);
          let core = getCore(None);
          core->setAfterConnectAction(afterConnect);
          core->toggleModal(.);
        }}>
        children
      </Rimble.Button>
    );
  };
};
