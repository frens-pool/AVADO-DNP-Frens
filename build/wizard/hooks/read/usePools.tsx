import Gun from "gun";
import { server_config } from "../../server_config";
import { useState } from "react";

export function usePools() {
    const gun = Gun(server_config.gundb_url);

    const [pools,setPools] = useState();

    gun.get("pools").on((data)=>{
        setPools(data);
    });
    const createPool = gun.get("pools").createPool;

    return { pools, createPool };
}
