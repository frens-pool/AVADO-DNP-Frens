import express, { Express, Request, Response, NextFunction } from 'express';
import { db } from "../db";
import { v4 as uuidv4 } from 'uuid';
module.exports = (server: Express) => {

    server.get("/members", async (req: Request, res: Response, next: NextFunction) => {
        const p = await db.get("members")
        res.send(p||[]);
        next()
    });

    server.post("/member", async (req: Request, res: Response, next: NextFunction) => {
        const { nickName, email, poolId } = req.body;
        const memberId = uuidv4();
        await db.push("members", { memberId, nickName, email, poolId, status: "invited" });
        next()
    });

}

