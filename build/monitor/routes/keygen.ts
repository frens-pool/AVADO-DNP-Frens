import express, { Express, Request, Response, NextFunction } from 'express';
import { gun } from "../db";
import { v4 as uuidv4 } from 'uuid';
import { mkValidatorKeys, pickupValidatorKeys} from '../util/keygen';

module.exports = (server: Express) => {

    server.post("/generate", async (req: Request, res: Response, next: NextFunction) => {
        const { chain, pooladdress } = req.body;

        const validatorData = mkValidatorKeys(chain,pooladdress);

        res.send(validatorData);
        next()
    });

    server.get("/read", async (req: Request, res: Response, next: NextFunction) => {
        const { chain, pooladdress } = req.body;

        const validatorData = pickupValidatorKeys();

        res.send(validatorData);
        next()
    });

    server.get("/delete", async (req: Request, res: Response, next: NextFunction) => {
        const { chain, pooladdress } = req.body;

        // const validatorData = pickupValidatorKeys();

        res.send("ok");
        next()
    });

}

