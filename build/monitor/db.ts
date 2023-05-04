import { Low } from "lowdb";
import { JSONFile } from 'lowdb/node'

const dbPath = process.env.DB_PATH || "./db.json";

export type Data = {
    pools: object[]
  }

// Initialize db
const adapter = new JSONFile<Data>(dbPath);
export const db = new Low<Data>(adapter,{pools:[]});

