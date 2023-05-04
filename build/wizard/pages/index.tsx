import type { NextPage } from "next";
import NodeComponent from "../components/NodeComponent";
import Validators from "../components/Validators";
import { PoolComponent } from "../components/PoolComponent";

const Home: NextPage = () => {
  return (
    <>
      <PoolComponent />
      {/* <NodeComponent /> */}
      <hr />
      {/* <Validators /> */}
    </>
  );
};

export default Home;
