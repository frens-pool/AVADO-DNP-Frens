import express, { Express, Request, Response, NextFunction } from 'express';
import { db } from "../db";
module.exports = (server: Express) => {
    /**
     * @openapi
     * /pools:
     *   get:
     *     description: get pools
     *     responses:
     *       200:
     *         description: Returns an array of pools
     */
    server.get("/pools", async (req: Request, res: Response, next: NextFunction) => {
        // await db.read();
        const p = await db.get("pools")
        res.send(p);
        next()
    });

    server.post("/pool", async (req: Request, res: Response, next: NextFunction) => {
        const { poolName, poolAddress } = req.body
        console.log(`Pool name=${poolName}`);
        console.log(`poolAddress=${poolAddress}`);
        await db.push("pools", { poolName, poolAddress });
        next()
    });

}

