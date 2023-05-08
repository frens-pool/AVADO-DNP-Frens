import type { NextPage } from "next";
import { useState } from "react";
import { usePools } from "../hooks/read/usePools";

const Home: NextPage = () => {
    const [open, setOpen] = useState(false);
    const { pools, createPool } = usePools();

    return (
        <>
            <div>My Pools:</div>
            <pre>{JSON.stringify(pools)}</pre>
            <button onClick={() => { createPool({ name: "sponnet.eth pool" }) }}>create pool</button>
        </>
    );
};

export default Home;
