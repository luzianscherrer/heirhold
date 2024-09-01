import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export const ImportHeirholdWallet = ({ readFullContract }) => {
  const defaultWalletAddress = "";

  const [show, setShow] = useState(false);
  const [walletAddress, setWalletAddress] = useState(defaultWalletAddress);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setWalletAddress(defaultWalletAddress);
    setValidated(false);
    setShow(true);
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
    console.log(`import ${walletAddress}`);
    readFullContract(walletAddress, true);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Import an existing Heirhold wallet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Import an existing Heirhold wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              controlId="formImportWalletAddress"
              className="pt-4 pb-4"
            >
              <Form.Label>Wallet address</Form.Label>
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
            <Button variant="primary" type="submit">
              Import
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
