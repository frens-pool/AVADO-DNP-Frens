import express, { Express, Request, Response, NextFunction } from "express";
import { gun } from "../db";
import { v4 as uuidv4 } from "uuid";
module.exports = (server: Express) => {
  server.post(
    "/keysplit",
    async (req: Request, res: Response, next: NextFunction) => {
      const { poolName, poolAddress } = req.body;
      const poolId = uuidv4();
      console.log(req);
      // const poolsRef = req.gun.get("pools").set(
      //     (currentItems = []) => {
      //         const newItem = { poolName, poolAddress, poolId };
      //         return [...currentItems, newItem];
      //     }
      // );

      // await db.push("pools", { poolName, poolAddress, poolId });
      // res.send({ poolId });
      next();
    }
  );
};
