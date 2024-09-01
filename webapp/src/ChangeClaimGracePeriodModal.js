import { Modal, Form, Button, InputGroup, Dropdown } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { truncateAddress } from "./utils";
import { useWriteContract } from "wagmi";
import { heirholdWalletConfig } from "./heirholdWalletConfig";

export const ChangeClaimGracePeriodModal = ({
  /* global BigInt */

  showChangeClaimGracePeriodModal,
  setShowChangeClaimGracePeriodModal,
  address,
  addNotification,
  currentValueGracePeriod,
}) => {
  const [claimGracePeriod, setClaimGracePeriod] = useState();
  const [claimGracePeriodUnit, setClaimGracePeriodUnit] = useState();
  const [validated, setValidated] = useState(false);
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const handleClose = useCallback(() => {
    setShowChangeClaimGracePeriodModal(false);
    setValidated(false);
  }, [setShowChangeClaimGracePeriodModal]);
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
  const handleClaimGracePeriodChange = (event) => {
    setClaimGracePeriod(event.target.value);
  };
  const handleSave = async () => {
    const unitMultipliers = {
      Years: 60 * 60 * 24 * 365,
      Days: 60 * 60 * 24,
      Minutes: 60,
    };
    const claimGracePeriodSeconds =
      claimGracePeriod * (unitMultipliers[claimGracePeriodUnit] || 1);

    console.log(`set period to ${claimGracePeriodSeconds} seconds`);

    writeContract({
      address: address,
      abi: heirholdWalletConfig.abi,
      functionName: "setClaimGracePeriod",
      args: [BigInt(claimGracePeriodSeconds)],
    });
  };

  useEffect(() => {
    console.log(`set default to ${currentValueGracePeriod} for ${address}`);
    const value = currentValueGracePeriod / 60;
    if ((value / (60 * 24)) % 365 === 0) {
      setClaimGracePeriodUnit("Years");
      setClaimGracePeriod(value / (60 * 24 * 365));
    } else if ((value / 60) % 24 === 0) {
      setClaimGracePeriodUnit("Days");
      setClaimGracePeriod(value / (60 * 24));
    } else {
      setClaimGracePeriodUnit("Minutes");
      setClaimGracePeriod(value);
    }
  }, [currentValueGracePeriod, address]);

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
    <Modal show={showChangeClaimGracePeriodModal} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Change claim grace period</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formClaimGracePeriod" className="pt-4 pb-4">
            <Form.Label>
              Claim grace period for wallet {truncateAddress(address)}
            </Form.Label>
            <InputGroup>
              <Form.Control
                required
                type="number"
                autoComplete="off"
                value={claimGracePeriod}
                onChange={handleClaimGracePeriodChange}
              />
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  {claimGracePeriodUnit}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setClaimGracePeriodUnit("Years");
                    }}
                    default={claimGracePeriodUnit === "Years"}
                  >
                    Years
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setClaimGracePeriodUnit("Days");
                    }}
                    default={claimGracePeriodUnit === "Days"}
                  >
                    Days
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setClaimGracePeriodUnit("Minutes");
                    }}
                    default={claimGracePeriodUnit === "Minutes"}
                  >
                    Minutes
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
