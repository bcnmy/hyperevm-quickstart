import {
    createMeeClient,
    toMultichainNexusAccount
} from "@biconomy/abstractjs";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hyperEvm } from "./hyperevm";

const MEE_API_KEY = process.env.MEE_API_KEY;
if (!MEE_API_KEY) {
    throw new Error("MEE_API_KEY is not set");
}

const EOA_PRIV_KEY = process.env.EOA_PRIV_KEY;
if (!EOA_PRIV_KEY) {
    throw new Error("EOA_PRIV_KEY is not set");
}

async function main() {
    /**
     * Creates an MEE client loaded with the EOA account
     */
    const eoa = privateKeyToAccount(EOA_PRIV_KEY as `0x${string}`);
    const signer = createWalletClient({
        chain: hyperEvm,
        transport: http(),
        account: eoa
    })
    const smartAccount = await toMultichainNexusAccount({
        signer: signer.account,
        chains: [hyperEvm],
        transports: [http()],
    });
    const meeClient = await createMeeClient({
        account: smartAccount,
        apiKey: MEE_API_KEY
    });

    console.log("Nexus Address:", smartAccount.addressOn(hyperEvm.id));
}

main().then(console.log).catch(console.log);
