import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "./config";
import { WalletOptions } from "./WalletOptions";
import { Account } from "./Account";
import { Notifications } from "./Notifications";
import { CreateHeirholdWallet } from "./CreateHeirholdWallet";
import { HeirholdWallets } from "./HeirholdWallets";
import Logo from "./logo.svg";

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

function MainContent() {
  const { isConnected } = useAccount();
  if (isConnected)
    return (
      <>
        <Row className="p-2">
          <Col></Col>
          <Col lg={8}>
            <CreateHeirholdWallet />
          </Col>
          <Col></Col>
        </Row>
        <Row className="p-2">
          <Col></Col>
          <Col lg={8}>
            <HeirholdWallets />
          </Col>
          <Col></Col>
        </Row>
      </>
    );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Notifications />
        <Container fluid>
          <Row className="p-2">
            <ConnectWallet />
          </Row>
          <Row className="p-2 mt-5">
            <Col></Col>
            <Col lg={8}>
              <div className="header d-flex align-items-center">
                <img src={Logo} alt="Logo" />
                <h1>Heirhold</h1>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <MainContent />
        </Container>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
