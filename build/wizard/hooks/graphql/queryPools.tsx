import { graphClient } from "./graphClient";
import { gql } from "@apollo/client";
import { Address } from "wagmi";

const buildQuery = ({ operatorAddress }: { operatorAddress: string }) => {
  const query = `
  {
    creates(where: {creator: "${operatorAddress}"}) {
      contractAddress
    }
  }
  `;
  return query;
};

export const queryPools = async ({
  operatorAddress,
}: {
  operatorAddress: Address;
}) => {
  const queryForPools = buildQuery({ operatorAddress });
  const response = await graphClient.query({
    query: gql(queryForPools),
  });
  return response;
};
