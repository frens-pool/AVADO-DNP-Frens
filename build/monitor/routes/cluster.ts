import { Express, Request, Response, NextFunction } from "express";
import config from "../config.json";
import scanSSVCluster, { ClusterScannerResult } from "../utils/scanSSVCluster";

module.exports = (server: Express) => {
  server.get(
    "/cluster",
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req);
      const params = {
        nodeUrl: config.ethereum.executionNodeUrl,
        contractAddress: config.contracts.ssvNetworkProxy,
        ownerAddress: config.keysplit.ownerAddress,
        operatorIds: config.keysplit.operatorIds,
      };

      let result: ClusterScannerResult | null = null;

      result = await scanSSVCluster(params);

      res.send(result || []);
    }
  );
};
