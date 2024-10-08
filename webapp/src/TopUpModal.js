import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { truncateAddress } from "./utils";
import { useSendTransaction, useAccount } from "wagmi";
import { parseEther } from "viem";

export const TopUpModal = ({
  showTopUpModal,
  setShowTopUpModal,
  address,
  addNotification,
}) => {
  const defaultAmount = "";

  const { chain } = useAccount();
  const [amount, setAmount] = useState(defaultAmount);
  const [validated, setValidated] = useState(false);
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const handleClose = useCallback(() => {
    setShowTopUpModal(false);
    setAmount(defaultAmount);
    setValidated(false);
  }, [setShowTopUpModal]);
  const handleSubmit = (event) => {
    console.log("handleSubmit");
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      handleSave();
    }
    setValidated(true);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleSave = async () => {
    console.log(`send ${amount}`);

    sendTransaction({
      to: address,
      value: parseEther(amount),
    });
  };

  useEffect(() => {
    handleClose();

    if (error) {
      console.log(error);
      addNotification("Transaction failed", "This operation is not possible.");
    }
  }, [error, handleClose, addNotification]);

  useEffect(() => {
    handleClose();

    if (hash) {
      addNotification(
        "Transaction submitted",
        `The balance is being updated in transaction ${hash}. The change will appear in your dashboard once confirmed.`
      );
    }
  }, [hash, addNotification, handleClose]);

  return (
    <Modal show={showTopUpModal} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Top-up balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formTopUpBalance" className="pt-4 pb-4">
            <Form.Label>
              Amount to send to {truncateAddress(address)}
            </Form.Label>
            <InputGroup>
              <Form.Control
                required
                type="number"
                autoComplete="off"
                value={amount}
                onChange={handleAmountChange}
              />
              <InputGroup.Text id="inputGroupPostpend">
                {window.globalData.demoMode
                  ? window.globalData.demoNativeCurrency
                  : chain.nativeCurrency.symbol}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Top-up"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
