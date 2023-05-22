import express, { Express, Request, Response, NextFunction } from 'express';
import { gun } from "../db";
import { v4 as uuidv4 } from 'uuid';
module.exports = (server: Express) => {

    /**
     * @openapi
     * /members:
     *   get:
     *     summary: Retrieve a list of members
     *     responses:
     *       '200':
     *         description: A list of members
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   memberId:
     *                     type: string
     *                     description: The ID of the member
     *                   nickName:
     *                     type: string
     *                     description: The nickname of the member
     *                   email:
     *                     type: string
     *                     description: The email of the member
     *                   poolId:
     *                     type: string
     *                     description: The ID of the pool the member belongs to
     *                   status:
     *                     type: string
     *                     enum:
     *                       - invited
     *                       - joined
     *                     description: The status of the member
     *     tags:
     *       - Members
     */
    server.get("/members", async (req: Request, res: Response, next: NextFunction) => {
        // const p = await db.get("members")
        // res.send(p||[]);
        next()
    });

    /**
     * @openapi
     * /member:
     *   post:
     *     summary: Create a new member
     *     requestBody:
     *       description: Member object to create
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nickName:
     *                 type: string
     *                 description: The nickname of the new member
     *               email:
     *                 type: string
     *                 description: The email of the new member
     *               poolId:
     *                 type: string
     *                 description: The ID of the pool the new member belongs to
     *             required:
     *               - nickName
     *               - email
     *               - poolId
     *     responses:
     *       '200':
     *         description: The member has been created successfully
     *       '400':
     *         description: Invalid input data
     *       '500':
     *         description: An internal server error occurred
     *     tags:
     *       - Members
     */
    server.post("/member", async (req: Request, res: Response, next: NextFunction) => {
        const { nickName, email, poolId } = req.body;
        const memberId = uuidv4();
        // await db.push("members", { memberId, nickName, email, poolId, status: "invited" });
        res.send({ memberId });
        next()
    });

}

