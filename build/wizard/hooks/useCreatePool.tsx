import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useAccount,
} from "wagmi";

import { FrensContracts } from "../utils/contracts";

export function useCreatePool() {
  const { chain } = useNetwork();
  const { address: ownerAddress } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0x5dC7D3A7B8216a65e9b65B1941E774248c1Ee8Ab", // temp
    abi: FrensContracts.StakingPoolFactory.abi,
    functionName: "create",
    args: [ownerAddress, false],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
