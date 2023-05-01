import '../styles/globals.scss';
// import '../styles/style.sass';
import '@rainbow-me/rainbowkit/styles.css';

import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { goerli } from 'wagmi/chains'
import { server_config } from '../server_config'
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useStaderStatus } from '../lib/status';

function MyApp({ Component, pageProps }: AppProps) {
  const [wagmiClient, setWagmiClient] = useState<any>();
  const [chains, setChains] = useState<any>();

  useEffect(() => {
    const setupClient = async () => {
      const clientRpcs = await getClientRpcs();

      const rpcProviders: any = clientRpcs.map((client_rpc: any) =>
        jsonRpcProvider({
          rpc: (_) => ({ http: client_rpc })
        })
      )

      const { chains, provider, webSocketProvider } = configureChains(
        [
          goerli
        ],
        rpcProviders.concat([
          alchemyProvider({
            // This is Alchemy's default API key.
            // You can get your own at https://dashboard.alchemyapi.io
            apiKey: "8kMhSrpLGyIlRYBtAtT9IAVWeVK8hiOZ",
          }),
          publicProvider(),
        ])
      );

      const { connectors } = getDefaultWallets({
        appName: 'Avado Stader',
        chains,
      });

      const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider,
        webSocketProvider,
      });

      setWagmiClient(wagmiClient)
      setChains(chains)
    }

    setupClient()
  }, []);


  // Trigger initial fetch of all stader info + refresh sync info very 60 seconds
  const { fetchNodeSyncProgressStatus, fetchContractsInfo, fetchNodeStatus } = useStaderStatus()
  useEffect(() => {
    fetchNodeSyncProgressStatus()
    fetchNodeStatus()
    fetchContractsInfo()
    const interval = setInterval(() => {
      fetchNodeSyncProgressStatus();
    }, 60 * 1000); // 60 seconds refresh
    return () => clearInterval(interval);
  }, []);

  return <>
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
    {wagmiClient ? (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    ) : (
      <>Connecting to Ethereum clients...</>
    )}
  </>

  async function getClientRpcs(): Promise<string[]> {
    try {
      const data = JSON.parse(await (await fetch(`${server_config.monitor_url}/ec-clients`)).text()).data;
      const clientRpcs = data ? data.map((c: any) => c.api) : [];
      return clientRpcs;
    } catch (e) {
      return []
    }
  }
}

export default MyApp;
