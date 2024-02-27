import { expect, test } from "vitest";
import { launchNodeAndGetWallets } from "@fuel-ts/account/test-utils";
import path from "path";
import fs from "fs";
import { JsonAbi, Script, hexlify } from "fuels";

test('witness script', async () => {
    const outputDirectory = path.join(__dirname, "../witness_script/out/debug");
    const scriptBytecode =  hexlify(fs.readFileSync(`${outputDirectory}/witness_script.bin`));
    const scriptAbi = fs.readFileSync(`${outputDirectory}/witness_script-abi.json`, 'utf-8');

    const { stop, wallets, provider } = await launchNodeAndGetWallets();

    const user = wallets[0];

    const script = new Script(scriptBytecode, scriptAbi as unknown as JsonAbi, user);
    const tx = script.functions.main(1);
    tx.txParams({ gasLimit: 100_000, gasPrice: 1});
    let txRequest = await tx.getTransactionRequest();
    txRequest.witnesses.push("69");

    const dr = await tx.dryRun();
    console.log(`dr`, dr);

    expect(false);
    stop();
})

