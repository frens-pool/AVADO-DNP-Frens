import { promisify } from "util";
import { exec } from "child_process";
import { glob } from "glob";
import fs from "fs";
import path from "path";

const execPromise = promisify(exec);

const cwd = "/tmp";


const readGlobFile = async (pattern: string, asJson: boolean) => {
    const files = await glob(pattern);
    if (files.length === 1) {
        const filePath = files[0]; // Assuming you want to read the first matching file
        const fileContents = fs.readFileSync(filePath, "utf8").replace(/\n/g, "");
        // fs.unlink(filePath, () => { });
        return asJson ? JSON.parse(fileContents) : fileContents;
    };
}

const pickupValidatorKeys = async () => {
    const validatorInfo = {
        mnemonic: await readGlobFile(path.join(cwd, "/validator_keys/mnemonic*"), false),
        password: await readGlobFile(path.join(cwd, "/validator_keys/password*"), false),
        depositdata: await readGlobFile(path.join(cwd, "/validator_keys/deposit_data*"), true),
        keystore: await readGlobFile(path.join(cwd, "/validator_keys/keystore*"), true)
    }
    console.log(validatorInfo);
}

const mkValidatorKeys = async (chain = "mainnet", withdrawalAddress: string) => {

    const file_prefix = "0";
    const password = "testtesttest";
    const amount = 1;

    const cmd = `/usr/src/app/scripts/mkkeys.sh "${file_prefix}" "${password}" ${amount} ${withdrawalAddress} ${chain}`;
    console.log(`Running ${cmd}`);
    try {
        const { stdout } = await execPromise(cmd, { cwd });
        console.log("Finished!");
        console.log("stdout", stdout.toString());
        return pickupValidatorKeys();
    } catch (error: any) {
        console.log("Error!");
        return { error: error.message };
    }

}

export { mkValidatorKeys, pickupValidatorKeys }