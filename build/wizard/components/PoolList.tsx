import { queryPools } from "../hooks/graphql/queryPools";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Address, useAccount } from "wagmi";
import { PlusIcon } from "@heroicons/react/20/solid";

import Modal from "../components/Modal";
import { NewPool } from "../components/NewPool";

export const PoolList = () => {
  const { address } = useAccount();
  const [userPools, setUserPools] = useState<any[]>([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (address) fetchUserPools(address);
  }, [address]);

  const fetchUserPools = async (operatorAddress: Address) => {
    let poolsOfUser = await queryPools({ operatorAddress });
    setUserPools(poolsOfUser.data.creates);
  };

  console.log(userPools.length > 0);

  if (userPools.length > 0) {
    return (
      <div>
        <Modal setModal={setModal} modal={modal}>
          <NewPool />
        </Modal>

        <div className="flex justify-between mt-2">
          <div className="text-2xl font-bold">My Pools:</div>

          <button
            type="button"
            onClick={() => setModal(true)}
            className="inline-flex items-center rounded-md bg-frens-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Pool
          </button>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {userPools.map(({ contractAddress }: any) => (
            <div key={contractAddress}>
              <Link href={`/pool/${contractAddress}`}>
                <a className="underline text-frens-main">{contractAddress}</a>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <Modal setModal={setModal} modal={modal}>
        <NewPool />
      </Modal>
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No pools</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new pool.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setModal(true)}
            className="inline-flex items-center rounded-md bg-frens-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Pool
          </button>
        </div>
      </div>
    </div>
  );
};
