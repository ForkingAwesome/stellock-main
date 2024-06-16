import { Wallet } from "@stellar/typescript-wallet-sdk";

let wallet = Wallet.TestNet();
let account = wallet.stellar().account();

export const createNewWallet = () => {
  try {
    const accountKeyPair = account.createKeypair();
    const newAccount = {
      publicKey: accountKeyPair.keypair.publicKey(),
      privateKey: accountKeyPair.keypair.secret(),
    };
    console.log(newAccount);

    return newAccount;
  } catch {
    return null;
  }
};
