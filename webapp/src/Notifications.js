import { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { watchContractEvent } from "@wagmi/core";
import { heirholdFactoryAbi } from "./HeirholdFactoryAbi";
import { config } from "./config";
import { getBalance } from "@wagmi/core";

// { title: "Title", body: "Body", id: crypto.randomUUID() }

export function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const addNotification = (title, body) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { title, body, id: crypto.randomUUID() },
    ]);
  };

  useEffect(() => {
    console.log("watch");

    const testActions = async () => {
      const balance = await getBalance(config, {
        address: "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
      });
      console.log(balance);
    };
    testActions();

    const unwatch = watchContractEvent(config, {
      address: "0xEf06B4970F659E8B5025Ec588241F703d2467605",
      abi: heirholdFactoryAbi,
      eventName: "CreateHeirholdWallet",
      onLogs(logs) {
        console.log(logs[0].args.walletAddress);
        addNotification(
          "New wallet created",
          `Address ${logs[0].args.walletAddress}`
        );
      },
    });
    return () => {
      console.log("unwatch");
      unwatch();
    };
  }, []);

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
