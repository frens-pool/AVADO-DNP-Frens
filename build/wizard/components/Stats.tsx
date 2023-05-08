import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

const stats = [
  {
    name: "Staked ETH",
    stat: "196",
    change: "12%",
    changeType: "increase",
  },
  {
    name: "# Validators",
    stat: "7",
    change: "20%",
    changeType: "increase",
  },
  {
    name: "Rewards",
    stat: "0.6 ETH",
    change: "1.05%",
    changeType: "increase",
  },
  {
    name: "APR",
    stat: "5.57%",
    change: "1.05%",
    changeType: "increase",
  },
  {
    name: "Pool Shares",
    stat: "118",
    change: "4.05%",
    changeType: "decrease",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Stats = () => {
  return (
    <div>
      <h3 className="px-4 text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3>
      <dl className="mt-3 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
              </div>

              <div
                className={classNames(
                  item.changeType === "increase"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                  "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowUpIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase"
                    ? "Increased"
                    : "Decreased"}{" "}
                  by{" "}
                </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
