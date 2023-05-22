import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
};

export const InviteFrens = ({
  poolContract,
  setStep,
  step,
}: {
  poolContract: string;
  setStep: any;
  step: any;
}) => {
  const link = `https://app.frens.fun/pool/${poolContract}`;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  function copyToClipboard(copyMe: string): void {
    navigator.clipboard.writeText(copyMe);
  }

  if (step === 3) {
    return (
      <div className="flex flex-col justify-center my-3 text-center underline text-frens-main">
        <Link
          href={`/pool/${poolContract}`}
          className="underline text-frens-main"
        >
          {link}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="my-2 text-center underline">
        <Link href={`/pool/${poolContract}`} className="underline">
          {link}
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mt-4">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Email of friend
          </label>
          <input
            defaultValue="test"
            {...register("email")}
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Vitaliks pool"
          />
        </div>
        <button
          className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => handleSubmit(onSubmit)}
        >
          Send email
        </button>
      </form>
    </div>
  );
};
