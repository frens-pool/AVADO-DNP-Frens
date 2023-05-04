// import * as restify from "restify";
// import corsMiddleware from "restify-cors-middleware2"
import { SupervisorCtl } from "./SupervisorCtl";
import { server_config } from "./server_config";
import { rest_url, validatorAPI, getAvadoPackageName, getTokenPathInContainer, getAvadoExecutionClientPackageName, client_url } from "./urls";
import { DappManagerHelper } from "./DappManagerHelper";
import { readFileSync } from "fs";
import AdmZip from 'adm-zip';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import express, {Request,Response,NextFunction} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = express();

const corsOptions: cors.CorsOptions = {
    origin: [
        /^http:\/\/localhost(:[\d]+)?$/,
        "http://*.my.ava.do"
    ]
};

server.use(cors(corsOptions));
server.use(bodyParser.json());

const path = require('path');

const main = async () => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Frens monitor API',
                version: '1.0.0',
            },
        },
        apis: ['./routes/*.ts'], // files containing annotations as above
    };

    const openapiSpecification = swaggerJsdoc(options);

    const autobahn = require('autobahn');
    const exec = require("child_process").exec;
    const fs = require('fs');
    const jsonfile = require('jsonfile')

    const supported_beacon_chain_clients = ["prysm", "teku"];
    const supported_execution_clients = ["geth", "nethermind"];

    console.log("Monitor starting...");

    // expose API docs
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


    server.get("/ping", (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send("pong");
        next()
    });

    require("./routes/pool")(server);
    require("./routes/member")(server);

    server.get("/network", (req: Request, res: Response, next: NextFunction) => {
        res.send(server_config.network);
        next()
    });

    // server.get("/name", (req: Request, res: Response, next: NextFunction) => {
    //     res.send(200, server_config.name);
    //     next()
    // });

    // const supervisorCtl = new SupervisorCtl(`localhost`, 5555, '/RPC2') || null;

    // const restart = async () => {
    //     await Promise.all([
    //         supervisorCtl.callMethod('supervisor.stopProcess', ["stader-node", true]),
    //     ])
    //     return Promise.all([
    //         supervisorCtl.callMethod('supervisor.startProcess', ["stader-node", true]),
    //     ])
    // }

    // server.post("/service/restart", (req: Request, res: Response, next: NextFunction) => {
    //     restart().then((result) => {
    //         res.send(200, "restarted");
    //         return next()
    //     }).catch((error) => {
    //         res.send(500, "failed")
    //         return next();
    //     })
    // });

    // server.post("/service/stop", (req: Request, res: Response, next: NextFunction) => {
    //     const method = 'supervisor.stopProcess'
    //     Promise.all([
    //         supervisorCtl.callMethod(method, ["stader-node"]),
    //     ]).then(result => {
    //         res.send(200, "stopped");
    //         next()
    //     }).catch(err => {
    //         res.send(200, "failed")
    //         next();
    //     })
    // });

    // server.post("/service/start", (req: Request, res: Response, next: NextFunction) => {
    //     const method = 'supervisor.startProcess'
    //     Promise.all([
    //         supervisorCtl.callMethod(method, ["stader-node"]),
    //     ]).then(result => {
    //         res.send(200, "started");
    //         next()
    //     }).catch(err => {
    //         res.send(200, "failed")
    //         next();
    //     })
    // });

    // server.get("/service/status", (req: Request, res: Response, next: NextFunction) => {
    //     const method = 'supervisor.getAllProcessInfo'
    //     supervisorCtl.callMethod(method, [])
    //         .then((value: any) => {
    //             res.send(200, value);
    //             next()
    //         }).catch((_error: any) => {
    //             res.send(500, "failed")
    //             next();
    //         });
    // });

    let wampSession: any = null;
    {
        const url = "ws://wamp.my.ava.do:8080/ws";
        const realm = "dappnode_admin";

        const connection = new autobahn.Connection({ url, realm });
        connection.onopen = (session: any) => {
            console.log("CONNECTED to \nurl: " + url + " \nrealm: " + realm);
            wampSession = session;
        };
        connection.open();
    }

    const getInstalledClients = async () => {
        const dappManagerHelper = new DappManagerHelper(server_config.packageName, wampSession);
        const packages = await dappManagerHelper.getPackages();

        const installed_clients = supported_beacon_chain_clients
            .filter(client => (packages.includes(getAvadoPackageName(client, "beaconchain"))
                && packages.includes(getAvadoPackageName(client, "validator")))
            )
            .map(client => ({
                name: client,
                url: `http://${client_url(client)}`,
                validatorAPI: `http://${client_url(client)}:9999/keymanager`
            }))
        return installed_clients;
    }

    server.get("/bc-clients", async (req: Request, res: Response, next: NextFunction) => {
        res.send(await getInstalledClients())
        next();
    })

    server.get("/ec-clients", async (req: Request, res: Response, next: NextFunction) => {
        const dappManagerHelper = new DappManagerHelper(server_config.packageName, wampSession);
        const packages = await dappManagerHelper.getPackages();

        const installed_clients = supported_execution_clients.filter(client => packages.includes(getAvadoExecutionClientPackageName(client)));

        res.send(installed_clients.map(client => ({
            name: client,
            api: rest_url(client),
            url: `http://${client_url(client)}`
        })))
        next();
    })

    // server.post("/stader-api", (req, res, next) => {
    //     if (!req.body) {
    //         res.send(400, "not enough parameters");
    //         return next();
    //     } else {
    //         staderApiCommand(req.body.command).then((stdout) => {
    //             res.send(200, stdout);
    //             return next();
    //         }).catch((e) => {
    //             res.send(500, e);
    //             return next();
    //         })
    //     }
    // });

    // const staderApiCommand = (command: string) => {
    //     const cmd = `/go/bin/stader api ${command}`;
    //     console.log(`Running ${cmd}`);

    //     const executionPromise = execute(cmd);

    //     executionPromise.then((result) => {
    //         const data = JSON.parse(result);
    //         if (command.includes("wallet init") && "mnemonic" in data) {
    //             // store mnemonic to file
    //             fs.writeFile("/.stader/data/mnemonic", data.mnemonic, (err: any) => console.log(err ? err : "Saved mnemoic"));
    //         }
    //         if ("txHash" in data) {
    //             if (data.txHash !== "0x0000000000000000000000000000000000000000000000000000000000000000")
    //                 storeTxHash(data.txHash);
    //         }
    //     }).catch(e => console.error)

    //     return executionPromise;
    // }

    // const execute = (cmd: string) => {
    //     return new Promise<string>((resolve, reject) => {
    //         const child = exec(cmd, (error: Error, stdout: string | Buffer, stderr: string | Buffer) => {
    //             if (error) {
    //                 console.log(`error: ${error.message}`);
    //                 return reject(error.message);
    //             }
    //             if (stderr) {
    //                 console.log(`error: ${stderr}`);
    //                 return reject(stderr);
    //             }
    //             return resolve(stdout.toString());

    //         });
    //         child.stdout.on('data', (data: any) => console.log(data.toString()));
    //     });
    // }

    // const storeTxHash = (txHash: string) => {
    //     const transactionsFile = "/.stader/data/transactions.json";
    //     console.log(`Store hash ${txHash} to ${transactionsFile}`);
    //     try {
    //         const data = (fs.existsSync(transactionsFile)) ? jsonfile.readFileSync(transactionsFile) : { transactions: [] };
    //         data.transactions.push(txHash);
    //         jsonfile.writeFileSync(transactionsFile, data);
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }


    //backup
    const backupFileName = "stader-backup.zip";
    server.get("/" + backupFileName, (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.setHeader("Content-Disposition", "attachment; " + backupFileName);
        res.setHeader("Content-Type", "application/zip");

        const zip = new AdmZip();
        zip.addLocalFolder("/.stader/", ".stader");
        zip.toBuffer(
            (buffer: Buffer) => {
                res.setHeader("Content-Length", buffer.length);
                res.end(buffer, "binary");
                next();
            }
        )

    });

    // //restore
    // server.post('/restore-backup', (req, res, next) => {
    //     console.log("upload backup zip file");
    //     if (req.files.file) {
    //         const file = req.files.file;
    //         req.info = file.name;
    //         const zipfilePath = "/tmp/" + file.name;
    //         fs.renameSync(file.path, zipfilePath, (err) => { if (err) console.log('ERROR: ' + err) });
    //         console.log("received backup file " + file.name);
    //         try {
    //             validateZipFile(zipfilePath);

    //             // delete existing data folder (if it exists)
    //             fs.rmSync("/.stader/data", { recursive: true, force: true /* ignore if not exists */ });

    //             // unzip
    //             const zip = new AdmZip(zipfilePath);
    //             zip.extractAllTo("/.stader/", /*overwrite*/ true);

    //             res.send({
    //                 code: 200,
    //                 message: "Successfully uploaded the Stader backup. Click restart to complete the restore.",
    //             });
    //             return next();
    //         } catch (e) {
    //             console.dir(e);
    //             console.log(e);
    //             res.send({
    //                 code: 400,
    //                 message: e.message,
    //             });
    //             return next();
    //         }
    //     }

    //     function validateZipFile(zipfilePath) {
    //         console.log("Validating " + zipfilePath);
    //         const zip = new AdmZip(zipfilePath);
    //         const zipEntries = zip.getEntries();

    //         checkFileExistsInZipFile(zipEntries, "data/password")
    //         checkFileExistsInZipFile(zipEntries, "data/mnemonic")
    //         checkFileExistsInZipFile(zipEntries, "data/wallet")
    //         checkFileExistsInZipFile(zipEntries, "data/validators/prysm-non-hd/direct/accounts/all-accounts.keystore.json")
    //         checkFileExistsInZipFile(zipEntries, "data/validators/prysm-non-hd/direct/accounts/secret")
    //         checkFileExistsInZipFile(zipEntries, "data/validators/prysm-non-hd/direct/keymanageropts.json")
    //     }

    //     function checkFileExistsInZipFile(zipEntries, expectedPath) {
    //         const containsFile = zipEntries.some((entry) => entry.entryName == expectedPath);
    //         if (!containsFile)
    //             throw {message:`Invalid backup file. The zip file must contain "${expectedPath}"`}
    //     }
    // });

    server.get("/runningValidatorInfos", async (req: Request, res: Response, next: NextFunction) => {
        const clients = (await getInstalledClients())
        if (clients.length == 0 || clients[0].name !== "teku") {
            res.status(500);
            res.send("Missing or unsupported Beacon chain client");
            return next()
        }

        const keymanagerUrl = `http://teku-prater.my.ava.do:9999/keymanager`
        const fetchFromKeyManager = async (path: string): Promise<any[]> => JSON.parse(await (await fetch(`${keymanagerUrl}${path}`)).text()).data
        const restApiUrl = `http://teku-prater.my.ava.do:9999/rest`
        const fetchFromRestAPi = async (path: string): Promise<any[]> => JSON.parse(await (await fetch(`${restApiUrl}${path}`)).text()).data

        const validators = (await fetchFromKeyManager("/eth/v1/keystores")).map((v: any) => v.validating_pubkey)
        const getValidatorData = async (pubKey: string) => await fetchFromRestAPi(`/eth/v1/beacon/states/head/validators/${pubKey}`)
        const getFeeRecipient = async (pubKey: string) => await fetchFromKeyManager(`/eth/v1/validator/${pubKey}/feerecipient`)

        const result = await Promise.all(validators.map(async (pubkey: string) => {
            const data = await getValidatorData(pubkey)
            const recipient = await getFeeRecipient(pubkey)
            return { pubkey: pubkey, data: data, recipient: recipient }
        }))

        res.status(200);
        res.send(result);
        next()
    });

    // // get keyStoreFile
    // const getValidatorKeystore = (pubkey: string) => {
    //     try {
    //         return fs.readFileSync(`/.stader/data/validators/teku/keys/${pubkey}.json`, 'utf8').trim();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // const getValidatorPassword = (pubkey: string) => {
    //     try {
    //         return fs.readFileSync(`/.stader/data/validators/teku/passwords/${pubkey}.txt`, 'utf8').trim();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // server.post("/importValidator", (req: Request, res: Response, next: NextFunction) => {
    //     if (!req.body) {
    //         res.send(400, "not enough parameters");
    //         return next();
    //     } else {
    //         const pubkey = req.body.pubkey

    //         console.log(`Importing validator ${pubkey}`)

    //         // create message
    //         const message = {
    //             keystores: [getValidatorKeystore(pubkey)],
    //             passwords: [getValidatorPassword(pubkey)]
    //         }

    //         const keymanagerUrl = `http://teku-prater.my.ava.do:9999/keymanager/eth/v1/keystores`
    //         postToKeyManager(keymanagerUrl, JSON.stringify(message), res, next);
    //     }
    // });

    // server.get("/getFeeRecipient", (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const result = fs.readFileSync(`/.stader/data/validators/stader-fee-recipient.txt`, 'utf8').trim();
    //         res.send(200, result);
    //         return next()
    //     } catch (err) {
    //         console.error(err);
    //         res.send(400, err);
    //         return next();
    //     }
    // })

    // server.get("/transactions", (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const result = JSON.parse(fs.readFileSync(`/.stader/data/transactions.json`, 'utf8'))
    //         res.send(200, result);
    //         return next()
    //     } catch (err) {
    //         const result = { transactions: [] }
    //         res.send(200, result);
    //         return next()
    //     }
    // })


    // server.post("/setFeeRecipient", (req: Request, res: Response, next: NextFunction) => {
    //     if (!req.body) {
    //         res.send(400, "not enough parameters");
    //         return next();
    //     } else {
    //         const pubKey = req.body.pubkey
    //         const feeRecipientAddress = req.body.feeRecipientAddress

    //         console.log(`Setting fee recipient for ${pubKey} to ${feeRecipientAddress}`)

    //         const message = {
    //             "ethaddress": feeRecipientAddress
    //         }

    //         const keymanagerUrl = `http://teku-prater.my.ava.do:9999/keymanager/eth/v1/validator/${pubKey}/feerecipient`;
    //         postToKeyManager(keymanagerUrl, JSON.stringify(message), res, next);
    //     }
    // });

    // function postToKeyManager(keymanagerUrl: string, body: string, res: Response, next: NextFunction) {
    //     fetch(keymanagerUrl, {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/json;charset=UTF-8' },
    //         body: body,
    //     }).then(async (r) => {
    //         const result = await r.text();
    //         console.log(result);
    //         res.send(200, result);
    //         return next();
    //     }).catch(e => {
    //         console.log(e);
    //         res.send(500, e);
    //         return next();
    //     });
    // }

    server.listen(9999, function () {
        console.log("%s listening", server.name);
        // supervisorCtl.callMethod("supervisor.getState", []).then((value: any) => {
        //     console.log("supervisor", value.statename)
        // })
    });
}
main();


