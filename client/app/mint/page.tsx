"use client";

import {
  BASE_FEE,
  Contract,
  Keypair,
  Networks,
  TransactionBuilder,
  nativeToScVal,
  Address,
  SorobanRpc,
} from "@stellar/stellar-sdk";

async function getSourceAccount() {
  const account = await server.getAccount(sourceKeypair.publicKey());
  return account;
}

const sourceKeypair = Keypair.fromSecret(
  "SDWR5W7HT55IJ5W7GUIU6XDT5H4DUNBJTIQIG7Y2JNZWI7ETK3YHJUDP"
);

const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org:443");

const contract = new Contract(
  "CB7DLRA6OIDK2LNXDTKFWDU5IQPKLMARMHK2CJIZ3CXAX2A4YTHPSQE6"
);

const page = () => {
  const mint = async () => {
    try {
      const metadata = nativeToScVal("This is a NFT", { type: "string" });

      const sourceAccount = await getSourceAccount();

      let builtTransaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          contract.call(
            "mint",
            nativeToScVal(Address.fromString(sourceKeypair.publicKey())),
            metadata
          )
        )
        .setTimeout(30)
        .build();

      let preparedTransaction = await server.prepareTransaction(
        builtTransaction
      );

      preparedTransaction.sign(sourceKeypair);

      try {
        let sendResponse = await server.sendTransaction(preparedTransaction);
        console.log(`Sent transaction: ${JSON.stringify(sendResponse)}`);

        if (sendResponse.status === "PENDING") {
          let getResponse = await server.getTransaction(sendResponse.hash);
          while (getResponse.status === "NOT_FOUND") {
            console.log("Waiting for transaction confirmation...");
            getResponse = await server.getTransaction(sendResponse.hash);
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          console.log(
            `getTransaction response: ${JSON.stringify(getResponse)}`
          );

          if (getResponse.status === "SUCCESS") {
            if (!getResponse.resultMetaXdr) {
              throw "Empty resultMetaXDR in getTransaction response";
            }
            // Find the return value from the contract and return it
            let transactionMeta = getResponse.resultMetaXdr
              .v3()
              .sorobanMeta()
              ?.returnValue();
            console.log(`Transaction result: ${transactionMeta?.value()}`);
          } else {
            throw `Transaction failed: ${getResponse.resultXdr}`;
          }
        } else {
          throw new Error("");
        }
      } catch (err) {
        console.log("Sending transaction failed");
        console.log(JSON.stringify(err));
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <button onClick={() => mint()}>Mint</button>
    </div>
  );
};

export default page;
