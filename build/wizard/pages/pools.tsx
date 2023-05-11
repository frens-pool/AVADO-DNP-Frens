import type { NextPage } from "next";
import { usePools } from "../hooks/read/usePools";

const Home: NextPage = () => {
  const { pools, createPool } = usePools();

  return (
    <>
      <div>My Pools:</div>
      <pre>{JSON.stringify(pools)}</pre>
      <button
        onClick={() => {
          createPool({ name: "sponnet.eth pool" });
        }}
      >
        create pool
      </button>
    </>
  );
};

export default Home;
