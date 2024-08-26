import "./App.css";
import { Container, Row } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "./config";
import { WalletOptions } from "./WalletOptions";
import { Account } from "./Account";
import Logo from "./logo.svg";

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Container fluid>
          <Row className="p-2">
            <ConnectWallet />
          </Row>
          <Row className="p-2">
            <div className="header">
              <img src={Logo} alt="Logo" />
              <h1>Heirhold</h1>
            </div>
          </Row>
        </Container>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
