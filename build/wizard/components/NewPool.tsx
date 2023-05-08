import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { InviteFrens } from "./InviteFrens";
import { CreatePool } from "./CreatePool";

export const NewPool = () => {
  const poolAddress = useRouter().query["pool"];
  const [poolContract, setPoolContract] = useState("");
  const [tokenCode, setTokenCode] = useState("abcdef");
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (poolAddress) {
      setPoolContract(poolAddress as string);
      setStep(4);
    }
  }, [poolAddress]);

  return (
    <div className="" data-theme="winter">
      <main className="flex flex-col justify-center items-center min-h-[33vh]">
        <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">1️⃣ Create Pool</h1>
          <div className={`${step == 1 ? "block" : "hidden"}`}>
            <CreatePool
              setStep={setStep}
              setPoolContract={setPoolContract}
              setTokenCode={setTokenCode}
            />
          </div>
        </div>
        <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
          <h1 className="text-3xl font-bold">2️⃣ Invite Friends</h1>
          <div className={`${step == 2 || step == 3 ? "block" : "hidden"}`}>
            <InviteFrens
              poolContract={poolContract}
              setStep={setStep}
              step={step}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
