// import { Low } from "lowdb";
// import { JSONFile } from 'lowdb/node'

// const dbPath = process.env.DB_PATH || "./db.json";

// export type Data = {
//     pools: object[]
//   }

// // Initialize db
// const adapter = new JSONFile<Data>(dbPath);
// const db = new Low<Data>(adapter,{pools:[]});

// export {db};

import jsoning from "jsoning";
let db = new jsoning("database.json");

export  { db }