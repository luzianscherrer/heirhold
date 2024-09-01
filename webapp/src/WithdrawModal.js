import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { truncateAddress } from "./utils";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { heirholdWalletConfig } from "./heirholdWalletConfig";

export const WithdrawModal = ({
  showWithdrawModal,
  setShowWithdrawModal,
  address,
  addNotification,
}) => {
  const defaultAmount = "";

  const { chain } = useAccount();
  const [amount, setAmount] = useState(defaultAmount);
  const [validated, setValidated] = useState(false);
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const handleClose = useCallback(() => {
    setShowWithdrawModal(false);
    setAmount(defaultAmount);
    setValidated(false);
  }, [setShowWithdrawModal]);
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

    writeContract({
      address: address,
      abi: heirholdWalletConfig.abi,
      functionName: "withdraw",
      args: [parseEther(amount)],
    });
  };

  useEffect(() => {
    handleClose();

    if (error) console.log(error);
  }, [error, handleClose]);

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
    <Modal show={showWithdrawModal} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formWithdrawBalance" className="pt-4 pb-4">
            <Form.Label>
              Amount to withdraw from {truncateAddress(address)}
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
                {chain.nativeCurrency.symbol}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Withdraw"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
