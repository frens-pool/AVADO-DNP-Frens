import fs from "fs";
import path from "path";
import config from "../config.json";
import { KeyShares, SSVKeys } from "ssv-keys";

const operators = config.keysplit.operatorPublicKeys.map(
  (publicKey: string, index: number) => ({
    id: config.keysplit.operatorIds[index],
    publicKey,
  })
);

export { operators };

export default async function keysplitSSV() {
  const keystore = fs.readFileSync(
    path.join(__dirname, `${config.keyStore.path}`),
    "utf8"
  );

  const ssvKeys = new SSVKeys();

  const { publicKey, privateKey } = await ssvKeys.extractKeys(
    keystore,
    config.keyStore.password
  );

  const encryptedShares = await ssvKeys.buildShares(privateKey, operators);

  const keyShares = new KeyShares();
  const payload = await keyShares.buildPayload({
    publicKey,
    operators,
    encryptedShares,
  });

  return {
    publicKey,
    privateKey,
    encryptedShares,
    payload,
  };
}
