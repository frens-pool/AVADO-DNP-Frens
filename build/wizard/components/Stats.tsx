import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";

const tabs = [
  { name: "Protocol Stats", icon: UsersIcon, identifier: "protocol" },
  { name: "Your Stats", icon: UserIcon, identifier: "my" },
];

const stats = [
  {
    name: "Pooled ETH",
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
    name: "NFT Pool Shares",
    stat: "118",
    change: "4.05%",
    changeType: "decrease",
  },
];
const statsMy = [
  {
    name: "Pooled ETH",
    stat: "0",
    change: "0%",
    changeType: "increase",
  },
  {
    name: "# Validators",
    stat: "0",
    change: "0%",
    changeType: "increase",
  },
  {
    name: "Rewards",
    stat: "0.0 ETH",
    change: "0%",
    changeType: "increase",
  },
  {
    name: "APR",
    stat: "0%",
    change: "0%",
    changeType: "increase",
  },
  {
    name: "NFT Pool Shares",
    stat: "0",
    change: "0%",
    changeType: "increase",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Stats = () => {
  const [currentTab, setCurrentTab] = useState("protocol");

  return (
    <div>
      <div className="">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => {
                    setCurrentTab(tab.identifier);
                  }}
                  className={classNames(
                    currentTab === tab.identifier
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                >
                  <tab.icon
                    className={classNames(
                      currentTab === tab.identifier
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {currentTab === "my" ? <StatsMy /> : <StatsProtocol />}
    </div>
  );
};

const StatsMy = () => {
  return (
    <dl className="mt-3 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      {statsMy.map((item) => (
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
                  : "Decreased"} by{" "}
              </span>
              {item.change}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
};

const StatsProtocol = () => {
  return (
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
                  : "Decreased"} by{" "}
              </span>
              {item.change}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
};
