import type { NextPage } from "next";
import { useState } from "react";

import { PoolList } from "../components/PoolList";

const Home: NextPage = () => {
  return (
    <div>
      <PoolList />
    </div>
  );
};

export default Home;
