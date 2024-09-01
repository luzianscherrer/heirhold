import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { watchContractEvent, readContracts } from "@wagmi/core";
import { config } from "./config";
import { WalletOptions } from "./WalletOptions";
import { Account } from "./Account";
import { Notifications } from "./Notifications";
import { CreateHeirholdWallet } from "./CreateHeirholdWallet";
import { HeirholdWallets } from "./HeirholdWallets";
import { useState, useEffect } from "react";
import { heirholdFactoryConfig } from "./heirholdFactoryConfig";
import Logo from "./logo.svg";
import { heirholdWalletConfig } from "./heirholdWalletConfig";
import { ImportHeirholdWallet } from "./ImportHeirholdWallet";

/* global BigInt */

const queryClient = new QueryClient();

document.body.style = "background: #fbfbfb;";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

function MainContent() {
  const { isConnected, address } = useAccount();
  const [wallets, setWallets] = useState([]);
  // const [wallets, setWallets] = useState([
  //   {
  //     address: "0x0095a405ca5277b9c27d7bfe0d5ce1f92515942f",
  //     owner: "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
  //     balance: BigInt(1238000000000000000n),
  //     claimGracePeriod: BigInt(604800n),
  //     claimDepositFeeAmount: BigInt(100000000000000000n),
  //     allowedClaimants: [
  //       "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
  //       "0x247061b632062bB8bF30937A901bc4097a46f383",
  //     ],
  //     claims: [
  //       {
  //         claimant: "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
  //         timestamp: BigInt(1025086017n),
  //       },
  //     ],
  //   },
  //   {
  //     address: "0xc0ffee254729296a45a3885639AC7E10F9d54979",
  //     owner: "0x247061b632062bB8bF30937A901bc4097a46f383",
  //     balance: BigInt(12338457800000000000n),
  //     claimGracePeriod: BigInt(864000n),
  //     claimDepositFeeAmount: BigInt(100000000000000000n),
  //     allowedClaimants: [
  //       "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
  //       "0x247061b632062bB8bF30937A901bc4097a46f383",
  //     ],
  //     claims: [
  //       {
  //         claimant: "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
  //         timestamp: BigInt(1725857642n),
  //       },
  //     ],
  //   },
  // ]);

  const readFullContract = async (address) => {
    console.log("read", address);

    const values = [
      "owner",
      "getBalance",
      "claimGracePeriod",
      "claimDepositFeeAmount",
      "getAllowedClaimants",
      "getClaims",
    ];

    const result = await readContracts(config, {
      contracts: values.map((value) => ({
        abi: heirholdWalletConfig.abi,
        address: address,
        functionName: value,
      })),
    });

    console.log(result);
    const [
      owner,
      balance,
      claimGracePeriod,
      claimDepositFeeAmount,
      allowedClaimants,
      claims,
    ] = result;

    const wallet = {
      address: address,
      owner: owner.result,
      balance: balance.result,
      claimGracePeriod: claimGracePeriod.result,
      claimDepositFeeAmount: claimDepositFeeAmount.result,
      allowedClaimants: allowedClaimants.result,
      claims: claims.result,
    };

    setWallets((wallets) => {
      let newWallets = structuredClone(wallets);
      const index = newWallets.findIndex(
        (obj) => obj.address === wallet.address
      );
      if (index !== -1) {
        newWallets[index] = wallet;
        console.log("update");
      } else {
        newWallets.unshift(wallet);
        console.log("add");
      }

      return newWallets;
    });
  };

  useEffect(() => {
    console.log("watch CreateHeirholdWallet");
    const unwatch = watchContractEvent(config, {
      address: heirholdFactoryConfig.address,
      abi: heirholdFactoryConfig.abi,
      eventName: "CreateHeirholdWallet",
      args: { owner: address },
      onLogs(logs) {
        console.log("logs", logs);
        console.log(`new wallet ${logs[0].args.walletAddress}`);
        readFullContract(logs[0].args.walletAddress);
      },
    });
    return () => {
      console.log("unwatch CreateHeirholdWallet");
      unwatch();
    };
  }, []);

  if (isConnected)
    return (
      <>
        <Row className="p-2">
          <Col></Col>
          <Col lg={8} className="d-flex gap-2">
            <CreateHeirholdWallet />{" "}
            <ImportHeirholdWallet readFullContract={readFullContract} />
          </Col>
          <Col></Col>
        </Row>
        <Row className="p-2">
          <Col></Col>
          <Col lg={8}>
            <HeirholdWallets wallets={wallets} />
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
