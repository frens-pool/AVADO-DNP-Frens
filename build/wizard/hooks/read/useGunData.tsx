import { server_config } from "../../server_config";
import { useEffect, useState } from "react";
import Gun, { GunValueSimple } from "gun";
const gun = Gun(server_config.gundb_url); // Initialize Gun
const useGunData = (path: string) => {
  const [data, setData] = useState<any>();
  const [node, setNode] = useState<any>();

  useEffect(() => {
    
    const node = gun.get(path); // Get the node in the path
    setNode(node);
    // Subscribe to updates on the node
    node.on((value) => {
      console.log(`data update!`,value);
      setData(value); // Update the data in the hook
    });

    return () => {
      node.off(); // Unsubscribe from updates when the component unmounts
    };
  }, [path]);

  const addData = ({ name }) => {
    
    gun.get(path).put({ name: "sponnet-" + Math.random().toString() });

  }

  return { data, node,addData };
};

export default useGunData;