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
        chain: hyperEvm, // loads hyperEvm chain config from hyperevm.ts
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

    /**
     * Builds a dummy instruction that does nothing
     */
    const instruction = await smartAccount.build({
        type: "default",
        data: {
            calls: [{
                to: "0x000000000000000000000000000000000000dead",
                value: BigInt(0),
                data: "0x",
            }],
            chainId: 999,
        }, 
    });

    /**
     * Executes the dummy instruction with MEE client.
     * Result will contain the MEE hash which can be used to get the receipt on MEE scan:
     * https://meescan.biconomy.io/
     */
    const result = await meeClient.execute({
        instructions: [ instruction ],
        sponsorship: true
    });
    console.log(result);
}

main().then(console.log).catch(console.log);
