import express, { Express, Request, Response, NextFunction } from 'express';
import { db } from "../db";
import { v4 as uuidv4 } from 'uuid';
module.exports = (server: Express) => {

    server.get("/pools", async (req: Request, res: Response, next: NextFunction) => {
        // await db.read();
        const p = await db.get("pools")
        res.send(p || []);
        next()
    });

    server.post("/pool", async (req: Request, res: Response, next: NextFunction) => {
        const { poolName, poolAddress } = req.body;
        const poolId = uuidv4();
        await db.push("pools", { poolName, poolAddress, poolId });
        res.send({ poolId });
        next()
    });

}

