import { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { watchContractEvent } from "@wagmi/core";
import { heirholdFactoryConfig } from "./heirholdFactoryConfig";
import { config } from "./config";
import { getBalance } from "@wagmi/core";
import { useAccount, useBlockNumber } from "wagmi";

export function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { address } = useAccount();

  const addNotification = (title, body) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { title, body, id: crypto.randomUUID() },
    ]);
  };
  //   const removeNotification = (id) => {
  //     setNotifications((prevNotifications) =>
  //       prevNotifications.filter((n) => n.id !== id)
  //     );
  //   };

  //   useEffect(() => {
  //     console.log("watch");

  //     // const testActions = async () => {
  //     //   const balance = await getBalance(config, {
  //     //     address: "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
  //     //   });
  //     //   console.log(balance);
  //     // };
  //     // testActions();

  //     const unwatch = watchContractEvent(config, {
  //       address: heirholdFactoryConfig.address,
  //       abi: heirholdFactoryConfig.abi,
  //       eventName: "CreateHeirholdWallet",
  //       args: { owner: address },
  //       onLogs(logs) {
  //         console.log(logs);
  //         addNotification(
  //           "New wallet created",
  //           `Address ${logs[0].args.walletAddress}`
  //         );
  //       },
  //     });
  //     return () => {
  //       console.log("unwatch");
  //       unwatch();
  //     };
  //   }, [address]);

  return (
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
      {notifications.map((notification) => (
        <Toast
          bg="light"
          key={notification.id}
          onClose={() => {
            setNotifications(
              notifications.filter((n) => n.id !== notification.id)
            );
          }}
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">{notification.title}</strong>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
