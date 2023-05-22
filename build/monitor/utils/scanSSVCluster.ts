import { SSVScannerCommand } from "cluster-scanner";

export default async function scanSSVCluster(params: ClusterScannerParams) {
  const command = new SSVScannerCommand(params);
  const result = (await command.scan()) as ClusterScannerResult;

  return result;
}

export interface ClusterScannerParams {
  nodeUrl: string;
  contractAddress: string;
  ownerAddress: string;
  operatorIds: number[];
}

export interface ClusterScannerResult {
  payload: {
    Owner: string;
    Operators: string;
    Block: number;
    Data: string;
  };
  cluster: {
    validatorCount: string;
    networkFeeIndex: string;
    index: string;
    balance: string;
    active: boolean;
  };
}
