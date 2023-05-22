import { server_config } from "../../server_config";
import { useEffect, useState } from "react";
import Gun, { GunValueSimple } from "gun";
const gun = Gun(server_config.gundb_url); // Initialize Gun
const useGun = (poolId: string) => {
  const [poolData, setPoolData] = useState<any>();
  const node = gun.get(`/pool/${poolId}`);
  node.map().on((value) => {
    
  });
  // useEffect(() => {

  //   // const interval = setInterval(() => {
  //   //   const node = gun.get(`/pool/${poolId}`); // Get the node in the path
  //   //   node.set({ date: `${Date.now()}` });
  //   // },5000);

  //   const node = gun.get(`/pool/${poolId}`); // Get the node in the path
  //   // Subscribe to updates on the node
  //   node.map().on((value,i) => {

  //     console.log(`data update! ${i}: `, value);
  //     setPoolData([value]);
  //     // value.map().on((item)=>{
  //     //   console.log("item",item);
  //     // })
  //     // setPoolData(value); // Update the data in the hook
  //   });

  //   return () => {
  //     node.off(); // Unsubscribe from updates when the component unmounts
  //   };
  // }, []);

  return { gun };
};

export default useGun;