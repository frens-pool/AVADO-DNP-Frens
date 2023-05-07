import React, { FunctionComponent, ReactNode } from "react";
import NavBar from "./NavBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="h-full min-h-screen bg-gray-100">
        <NavBar />

        <div className="min-h-full">
          <main className="-mt-24 pb-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h1 className="sr-only">Page title</h1>
              {/* Main 3 column grid */}
              <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                {/* Left column */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                  <section aria-labelledby="section-1-title">
                    <h2 className="sr-only" id="section-1-title">
                      Section title
                    </h2>
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                      <div className="p-6">{children}</div>
                    </div>
                  </section>
                </div>

                {/* Right column */}
                <div className="grid grid-cols-1 gap-4">
                  <section aria-labelledby="section-2-title">
                    <h2 className="sr-only" id="section-2-title">
                      Section title
                    </h2>
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                      <div className="p-6">Page agnostic stats</div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>

        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; Made with ❤️ by your FRENS
              </span>{" "}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Layout;
