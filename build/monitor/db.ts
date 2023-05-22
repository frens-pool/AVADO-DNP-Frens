import { server_config } from "./server_config";
import express, { Express } from 'express';

const Gun = require('gun');

const dbFile = `${server_config.dbLocation}/database.json`;
console.log(`Opening database at ${dbFile}`)

const gun = Gun({ file: `${server_config.dbLocation}/testdb-${Date.now()}` });

// const copy = gun.get('a');
// copy.put("QUAAK");
// copy.once((data:any) => { console.log("D",data) });

// const setup = (server: Express) => {
//     // server.use(Gun.serve).use(express.static(__dirname));
//     gun = Gun({ file: `${server_config.dbLocation}/testdb`, web: server });
//     server.use(gun.server);
//     console.log("GUNtype", typeof gun);
//     console.log(gun);
// };

export { gun }
