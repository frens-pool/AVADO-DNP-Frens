import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { InviteFrens } from "./InviteFrens";
import { CreatePool } from "./CreatePool";

export const NewPool = () => {
  const poolAddress = useRouter().query["pool"];
  const [poolContract, setPoolContract] = useState("");
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
        <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center mb-4 p-3 bg-white">
          <div className={`${step == 1 ? "block" : "hidden"}`}>
            <h1 className="text-3xl font-bold">Create Pool</h1>
            <div className="">Squad staking made easy</div>
            <CreatePool setStep={setStep} setPoolContract={setPoolContract} />
          </div>
        </div>
        <div className="w-11/12 md:w-2/3 text-center flex flex-col items-center mb-4 p-3 bg-white">
          <div className={`${step == 2 ? "block" : "hidden"}`}>
            <h1 className="text-3xl font-bold">Step 2: Invite Friends</h1>
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
