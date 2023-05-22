import express, { Express, Request, Response, NextFunction } from 'express';
import { gun } from "../db";
import { v4 as uuidv4 } from 'uuid';
module.exports = (server: Express) => {
    /**
     * @openapi
     * /pools:
     *   get:
     *     summary: Retrieve a list of all pools.
     *     description: Returns an array of objects representing each pool, with the fields `poolName`, `poolAddress`, and `poolId`.
     *     responses:
     *       200:
     *         description: A list of all pools.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   poolName:
     *                     type: string
     *                     description: The name of the pool.
     *                   poolAddress:
     *                     type: string
     *                     description: The address of the pool.
     *                   poolId:
     *                     type: string
     *                     description: The ID of the pool.
     *     tags:
     *       - Pools
     */
    server.get("/pools", async (req: Request, res: Response, next: NextFunction) => {
        // console.log(gun);
        // await db.read();
        // console.log(req);
        gun.get('pools3').set(123);
        const pools = gun.get('pools3');
        pools.once((data:any) => {
            res.send(data || []);
            next()
        });

    });

    /**
     * @openapi
     * /pool:
     *   post:
     *     summary: Create a new pool object
     *     requestBody:
     *       description: Pool object to create
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               poolName:
     *                 type: string
     *                 description: The name of the new pool
     *               poolAddress:
     *                 type: string
     *                 description: The address of the new pool
     *             required:
     *               - poolName
     *               - poolAddress
     *     responses:
     *       '200':
     *         description: Object containing the ID of the newly created pool
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 poolId:
     *                   type: string
     *                   description: The ID of the newly created pool
     *     tags:
     *       - Pools
     */
    server.post("/pool", async (req: Request, res: Response, next: NextFunction) => {
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
        next()
    });

}

