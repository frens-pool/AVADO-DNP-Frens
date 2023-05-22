import { Express, Request, Response, NextFunction } from "express";
import { SSVScannerCommand } from "cluster-scanner";
import { gun } from "../db";

module.exports = (server: Express) => {
  server.get(
    "/cluster",
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req);

      const params = {
        nodeUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        contractAddress: "0xAfdb141Dd99b5a101065f40e3D7636262dce65b3",
        ownerAddress: "0xa9E403A1b58eC4ce400069B97da22Dd7c7f04ad7",
        operatorIds: [1, 2, 3, 4],
      };
      const command = new SSVScannerCommand(params);
      const result = await command.scan();
      console.log(
        JSON.stringify(
          {
            block: result.payload.Block,
            "cluster snapshot": result.cluster,
            cluster: Object.values(result.cluster),
          },
          null,
          "  "
        )
      );
      res.send(result || []);
    }
  );
};
