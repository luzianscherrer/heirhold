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
import { useState, useEffect, useCallback, useRef } from "react";
import { heirholdFactoryConfig } from "./heirholdFactoryConfig";
import Logo from "./logo.svg";
import { heirholdWalletConfig } from "./heirholdWalletConfig";
import { ImportHeirholdWallet } from "./ImportHeirholdWallet";

const queryClient = new QueryClient();

document.body.style = "background: #fbfbfb;";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

function MainContent({ notifications, setNotifications }) {
  const { isConnected, address } = useAccount();
  const [wallets, setWallets] = useState([]);
  const initialized = useRef(false);

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

  const addNotification = useCallback(
    (title, body) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { title, body, id: crypto.randomUUID() },
      ]);
    },
    [setNotifications]
  );

  const readFullContract = useCallback(
    async (address, reportError) => {
      console.log("read", address);

      const values = [
        "owner",
        "getBalance",
        "claimGracePeriod",
        "claimDepositFeeAmount",
        "getAllowedClaimants",
        "getClaims",
      ];

      try {
        const result = await readContracts(config, {
          allowFailure: false,
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
          owner: owner,
          balance: balance,
          claimGracePeriod: claimGracePeriod,
          claimDepositFeeAmount: claimDepositFeeAmount,
          allowedClaimants: allowedClaimants,
          claims: claims,
        };

        let newWallets = structuredClone(wallets);
        const index = newWallets.findIndex(
          (obj) => obj.address === wallet.address
        );
        if (index !== -1) {
          const newWalletStr = JSON.stringify(wallet, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
          );
          const existingWalletStr = JSON.stringify(newWallets[index], (_, v) =>
            typeof v === "bigint" ? v.toString() : v
          );
          if (newWalletStr !== existingWalletStr) {
            newWallets[index] = wallet;
            console.log("update", wallet);
            setWallets(newWallets);
          }
        } else {
          newWallets.unshift(wallet);
          console.log("add", wallet);
          setWallets(newWallets);
        }
      } catch (error) {
        console.log("Error reading contract data", error);
        if (reportError) {
          addNotification(
            "Import failed",
            `The wallet ${address} could not be imported into your dashboard. Is it a valid Heirhold wallet?`
          );
        }
      }
    },
    [addNotification, wallets]
  );

  useEffect(() => {
    const loadFromStorage = async () => {
      let walletsToAdd = [];
      const storedWalletAddresses = JSON.parse(
        localStorage.getItem("wallets") || "[]"
      );
      console.log("load storage wallets", storedWalletAddresses);
      const values = [
        "owner",
        "getBalance",
        "claimGracePeriod",
        "claimDepositFeeAmount",
        "getAllowedClaimants",
        "getClaims",
      ];
      for (const storedWalletAddress of storedWalletAddresses) {
        console.log("loading ", storedWalletAddress);
        try {
          const result = await readContracts(config, {
            allowFailure: false,
            contracts: values.map((value) => ({
              abi: heirholdWalletConfig.abi,
              address: storedWalletAddress,
              functionName: value,
            })),
          });

          const [
            owner,
            balance,
            claimGracePeriod,
            claimDepositFeeAmount,
            allowedClaimants,
            claims,
          ] = result;

          const wallet = {
            address: storedWalletAddress,
            owner: owner,
            balance: balance,
            claimGracePeriod: claimGracePeriod,
            claimDepositFeeAmount: claimDepositFeeAmount,
            allowedClaimants: allowedClaimants,
            claims: claims,
          };
          walletsToAdd.push(wallet);
        } catch (error) {
          console.log("error loading", error);
        }
      }
      setWallets(walletsToAdd);
      console.log("load done");
    };
    if (!initialized.current) {
      initialized.current = true;
      loadFromStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("wallets changed, persist to local storage", wallets);
    localStorage.setItem(
      "wallets",
      JSON.stringify(wallets.map((w) => w.address))
    );
  }, [wallets]);

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
        readFullContract(logs[0].args.walletAddress, false);
      },
    });
    return () => {
      console.log("unwatch CreateHeirholdWallet");
      unwatch();
    };
  }, [readFullContract, address]);

  useEffect(() => {
    const unwatches = wallets.map((wallet) => {
      console.log(`watch HeirholdWalletSettingsChange ${wallet.address}`);
      return watchContractEvent(config, {
        address: wallet.address,
        abi: heirholdWalletConfig.abi,
        eventName: "HeirholdWalletSettingsChange",
        onLogs(logs) {
          console.log("logs", logs);
          readFullContract(wallet.address, false);
        },
      });
    });
    return () => {
      console.log("unwatch HeirholdWalletSettingsChange");
      unwatches.forEach((unwatch) => {
        console.log("unwatch HeirholdWalletSettingsChange");
        unwatch();
      });
    };
  }, [wallets, readFullContract]);

  if (isConnected)
    return (
      <>
        <Row className="p-2">
          <Col></Col>
          <Col lg={8} className="d-flex gap-2">
            <CreateHeirholdWallet addNotification={addNotification} />{" "}
            <ImportHeirholdWallet readFullContract={readFullContract} />
          </Col>
          <Col></Col>
        </Row>
        <Row className="p-2">
          <Col></Col>
          <Col lg={8}>
            <HeirholdWallets
              wallets={wallets}
              setWallets={setWallets}
              addNotification={addNotification}
            />
          </Col>
          <Col></Col>
        </Row>
      </>
    );
}

function App() {
  const [notifications, setNotifications] = useState([]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
        />
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
          <MainContent
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </Container>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
