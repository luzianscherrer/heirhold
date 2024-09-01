import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { truncateAddress } from "./utils";
import { useWriteContract } from "wagmi";
import { heirholdWalletConfig } from "./heirholdWalletConfig";

export const AddClaimantModal = ({
  showAddClaimantModal,
  setShowAddClaimantModal,
  address,
  addNotification,
}) => {
  const defaultWalletAddress = "";

  const [walletAddress, setWalletAddress] = useState(defaultWalletAddress);
  const [validated, setValidated] = useState(false);
  const { data: hash, isPending, writeContract } = useWriteContract();

  const handleClose = () => {
    setShowAddClaimantModal(false);
    setWalletAddress(defaultWalletAddress);
    setValidated(false);
  };
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
  const handleWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };
  const handleSave = async () => {
    console.log(`add ${walletAddress}`);

    writeContract({
      address: address,
      abi: heirholdWalletConfig.abi,
      functionName: "addAllowedClaimant",
      args: [walletAddress],
    });
  };

  useEffect(() => {
    handleClose();

    if (hash) {
      addNotification(
        "Transaction submitted",
        `The wallet is being updated in transaction ${hash}. The change will appear in your dashboard once confirmed.`
      );
    }
  }, [hash]);

  return (
    <Modal show={showAddClaimantModal} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new claimant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formImportWalletAddress" className="pt-4 pb-4">
            <Form.Label>
              Claimant address to be added to wallet {truncateAddress(address)}
            </Form.Label>
            <Form.Control
              required
              type="text"
              autoComplete="off"
              placeholder="0x..."
              pattern="^0x[a-fA-F0-9]{40}$"
              value={walletAddress}
              onChange={handleWalletAddressChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? "Confirming..." : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
