import { useContractEvent, useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { server_config } from "../server_config";

import { useCreatePool } from "../hooks/useCreatePool";
import { FrensContracts } from "../utils/contracts";

export const CreatePool = ({
  setStep,
  setPoolContract,
  setTokenCode,
}: {
  setStep: any;
  setPoolContract: any;
  setTokenCode: any;
}) => {
  const { address: accountAddress } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { data, isLoading, write: createPool } = useCreatePool();
  let etherscanLink = "";

  function onCreatePool(): void {
    // const INVITATION_TOKEN_LENGTH = 9
    // const inviteToken = Math.random().toString(36).substring(2, INVITATION_TOKEN_LENGTH);
    // setTokenCode(inviteToken);
    if (createPool) createPool();
  }

  const postPoolToMonitor = (poolAddress: any, poolName: any) => {
    const api_url: string = `${server_config.monitor_url}/pool`;

    const data = {
      poolAddress: poolAddress,
      poolName: poolName,
    };

    fetch(api_url, {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data),
    })
      .then(async (r) => {
        const result = await r.text();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useContractEvent({
    address: "0x5dC7D3A7B8216a65e9b65B1941E774248c1Ee8Ab", // temp
    abi: FrensContracts.StakingPoolFactory.abi,
    eventName: "Create",
    listener: (node) => {
      postPoolToMonitor(node, "dummyName");
      setPoolContract(node);
      setStep(2);
    },
  });

  if (data) {
    etherscanLink = `https://goerli.etherscan.io/tx/${data.hash}`;

    return (
      <div>
        <div className="my-2">
          This is a link to your own personal staking pool. Share with your
          friends.
        </div>
        <div className="flex items-center justify-center mt-4 mb-2">
          <div>
            <div className="my-2">just a sec ... pool is getting created</div>
            <div className="flex justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-frens-main"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <a
                className="underline text-frens-main pt-1"
                href={etherscanLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                view tx on etherscan
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="my-2">
        AA You will get a link to your own personal staking pool
      </div>
      <div className="flex items-center justify-center mt-4 mb-2">
        <div>
          {isLoading ? (
            <button disabled className="btn text-black">
              Loading ...
            </button>
          ) : (
            <div>
              {accountAddress ? (
                <button
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => onCreatePool()}
                >
                  Create Pool
                </button>
              ) : (
                <button
                  className="bg-teal-200 text-black bg-gradient-to-r from-frens-blue to-frens-teal"
                  onClick={() => {
                    if (openConnectModal) openConnectModal();
                  }}
                >
                  Create Pool
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};