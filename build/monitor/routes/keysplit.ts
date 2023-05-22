import { Express, Request, Response, NextFunction } from "express";
import keysplitSSV from "../utils/keysplitSSV";

module.exports = (server: Express) => {
  server.post(
    "/keysplit",
    async (req: Request, res: Response, next: NextFunction) => {
      const { payload } = await keysplitSSV();
    }
  );
};
