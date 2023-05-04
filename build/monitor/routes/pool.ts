import express, { Express, Request, Response, NextFunction } from 'express';
// import { db } from "../db";
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
        // res.send(await db.data.pools || []);
        res.send([]);
        next()
    });

    server.post("/pool", async (req: Request, res: Response, next: NextFunction) => {
        // await db.read();
        // res.send(await db.data.pools || []);
        next()
    });

}

