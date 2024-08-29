import { useState } from "react";
import { Modal, Form, Button, InputGroup, Dropdown } from "react-bootstrap";
import { useAccount } from "wagmi";

export const CreateHeirholdWallet = () => {
  const defaultClaimGracePeriod = "365";
  const defaultClaimGracePeriodUnit = "Days";
  const defaultClaimDepositFeeAmount = "0.1";
  const defaultDepositAmount = "0";

  const { chain } = useAccount();
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

  const handleClose = () => setShow(false);
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
    // const provider = new ethers.BrowserProvider(window.ethereum);
    // const singer = await provider.getSigner();
    // const contract = new ethers.Contract(
    //   HEIRHOLD_FACTORY_CONTRACT_ADDRESS,
    //   heirholdFactoryContract.abi,
    //   singer
    // );
    // try {
    //   const options = { value: ethers.parseEther(depositAmount) };
    //   const tx = await contract.createHeirholdWallet(
    //     parseInt(claimGracePeriod),
    //     ethers.parseUnits(claimDepositFeeAmount, "ether"),
    //     [],
    //     options
    //   );
    //   console.log("transaction", tx);
    //   const receipt = await tx.wait();
    //   console.log("receipt", receipt);
    // } catch (exception) {
    //   console.log("creating transaction failed", exception);
    // }
    handleClose();
  };

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
          <Modal.Header closeButton>
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
              <Form.Label>Claim deposit fee amount</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  type="number"
                  autoComplete="off"
                  value={claimDepositFeeAmount}
                  onChange={handleClaimDepositFeeAmountChange}
                />
                <InputGroup.Text id="inputGroupPostpend">
                  {chain.nativeCurrency.symbol}
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
                  {chain.nativeCurrency.symbol}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
