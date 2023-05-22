import type { NextPage } from "next";
import { useState, useEffect } from "react";
// import useGunData from "../hooks/read/useGunData";

const Home: NextPage = () => {
  const [visData, setVisData] = useState(false);
  // const { data, node, addData } = useGunData("pools1");

  // useEffect(()=>{
  //     console.log(`data client changed!`);
  // },[data])

  // node?.once((data)=>{
  //     console.log(`Data chagnedd`,data);
  //     setVisData(data);
  // })

  return (
    <>
      <div>My Pools:</div>
      <pre>{JSON.stringify(visData, null, 2)}</pre>
      <button
        onClick={() => {
          // addData({ name: "sponnet.eth pool" });
        }}
      >
        create pool
      </button>
    </>
  );
};

export default Home;
