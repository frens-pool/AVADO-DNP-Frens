import jsoning from "jsoning";
import { server_config } from "./server_config";

const dbFile = `${server_config.dbLocation}/database.json`;
console.log(`Opening database at ${dbFile}`)

let db = new jsoning(dbFile);
export  { db }
