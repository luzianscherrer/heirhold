import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Button, InputGroup, Dropdown } from "react-bootstrap";
import { useAccount, useWriteContract } from "wagmi";
import { heirholdFactoryConfig } from "./heirholdFactoryConfig";
import { parseEther } from "viem";

export const CreateHeirholdWallet = ({ addNotification }) => {
  /* global BigInt */

  const defaultClaimGracePeriod = "365";
  const defaultClaimGracePeriodUnit = "Days";
  const defaultClaimDepositFeeAmount = "0.1";
  const defaultDepositAmount = "0";

  const { chain } = useAccount();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [show, setShow] = useState(false);
  const [claimGracePeriod, setClaimGracePeriod] = useState(
    defaultClaimGracePeriod
  );
  const [claimGracePeriodUnit, setClaimGracePeriodUnit] = useState(
    defaultClaimGracePeriodUnit
  );
  const [claimDepositFeeAmount, setClaimDepositFeeAmount] = useState(
    defaultClaimDepositFeeAmount
  );
  const [depositAmount, setDepositAmount] = useState(defaultDepositAmount);
  const [validated, setValidated] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
    setValidated(false);
  }, [setShow]);
  const handleShow = () => {
    setClaimGracePeriod(defaultClaimGracePeriod);
    setClaimGracePeriodUnit(defaultClaimGracePeriodUnit);
    setClaimDepositFeeAmount(defaultClaimDepositFeeAmount);
    setDepositAmount(defaultDepositAmount);
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
  const handleClaimGracePeriodChange = (event) => {
    setClaimGracePeriod(event.target.value);
  };
  const handleClaimDepositFeeAmountChange = (event) => {
    setClaimDepositFeeAmount(event.target.value);
  };
  const handleDepositAmountChange = (event) => {
    setDepositAmount(event.target.value);
  };
  const handleSave = async () => {
    console.log("handle save");

    const unitMultipliers = {
      Years: 60 * 60 * 24 * 365,
      Days: 60 * 60 * 24,
      Minutes: 60,
    };
    const claimGracePeriodSeconds =
      claimGracePeriod * (unitMultipliers[claimGracePeriodUnit] || 1);

    writeContract({
      address: heirholdFactoryConfig.address,
      abi: heirholdFactoryConfig.abi,
      functionName: "createHeirholdWallet",
      args: [
        BigInt(claimGracePeriodSeconds),
        parseEther(claimDepositFeeAmount),
        [],
      ],
      value: parseEther(depositAmount),
    });
  };

  useEffect(() => {
    handleClose();

    if (hash) {
      addNotification(
        "Transaction submitted",
        `The wallet is being created in transaction ${hash}. It will appear in your dashboard once confirmed.`
      );
    }
  }, [hash, addNotification, handleClose]);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ width: "fit-content" }}
      >
        Create a new Heirhold wallet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton={!isPending}>
            <Modal.Title>Create a new Heirhold wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formClaimGracePeriod" className="pt-4">
              <Form.Label>Claim grace period</Form.Label>
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
                    >
                      Years
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setClaimGracePeriodUnit("Days");
                      }}
                    >
                      Days
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setClaimGracePeriodUnit("Minutes");
                      }}
                    >
                      Minutes
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formClaimDepositFeeAmount" className="pt-4">
              <Form.Label>Claim deposit fee</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  type="number"
                  autoComplete="off"
                  value={claimDepositFeeAmount}
                  onChange={handleClaimDepositFeeAmountChange}
                />
                <InputGroup.Text id="inputGroupPostpend">
                  {window.globalData.demoMode
                    ? window.globalData.demoNativeCurrency
                    : chain.nativeCurrency.symbol}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formDepositAmount" className="pt-4 pb-4">
              <Form.Label>Initial deposit</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  type="number"
                  autoComplete="off"
                  value={depositAmount}
                  onChange={handleDepositAmountChange}
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
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isPending}>
              {isPending ? "Confirming..." : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
