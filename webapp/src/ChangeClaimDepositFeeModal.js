import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { truncateAddress } from "./utils";
import { useWriteContract, useAccount } from "wagmi";
import { heirholdWalletConfig } from "./heirholdWalletConfig";
import { parseEther } from "viem";

export const ChangeClaimDepositFeeModal = ({
  showChangeClaimDepositFeeModal,
  setShowChangeClaimDepositFeeModal,
  address,
  addNotification,
  currentValueDepositFee,
}) => {
  const { chain } = useAccount();
  const [claimDepositFee, setClaimDepositFee] = useState();
  const [validated, setValidated] = useState(false);
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const handleClose = useCallback(() => {
    setShowChangeClaimDepositFeeModal(false);
    setValidated(false);
  }, [setShowChangeClaimDepositFeeModal]);
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
  const handleClaimDepositFeeChange = (event) => {
    setClaimDepositFee(event.target.value);
  };
  const handleSave = async () => {
    console.log(`set deposit fee to ${claimDepositFee}`);

    writeContract({
      address: address,
      abi: heirholdWalletConfig.abi,
      functionName: "setClaimFeeDepositAmount",
      args: [parseEther(claimDepositFee)],
    });
  };

  useEffect(() => {
    console.log(`set default to ${currentValueDepositFee} for ${address}`);
    setClaimDepositFee(currentValueDepositFee);
  }, [currentValueDepositFee, address]);

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
        `The wallet is being updated in transaction ${hash}. The change will appear in your dashboard once confirmed.`
      );
    }
  }, [hash, addNotification, handleClose]);

  return (
    <Modal show={showChangeClaimDepositFeeModal} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Change claim deposit fee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formClaimDepositFee" className="pt-4 pb-4">
            <Form.Label>
              Claim deposit fee for wallet {truncateAddress(address)}
            </Form.Label>
            <InputGroup>
              <Form.Control
                required
                type="number"
                autoComplete="off"
                value={claimDepositFee}
                onChange={handleClaimDepositFeeChange}
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
            {isPending ? "Confirming..." : "Change"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
