import { Container, Row, Col } from "react-bootstrap";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "react-bootstrap";

const truncateAddress = (address) => {
  if (address.length <= 12) return address;
  return address.substr(0, 5) + "..." + address.substr(address.length - 4);
};

export function Account() {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col
          xs="auto"
          className="d-flex justify-content-center align-items-center"
        >
          {address && (
            <div>
              Connected to <strong>{truncateAddress(address)}</strong> on{" "}
              {chain.name}
            </div>
          )}
        </Col>
        {/* <div>{chain.nativeCurrency.symbol}</div> */}
        <Col
          xs="auto"
          className="d-flex justify-content-center align-items-center"
        >
          <Button onClick={() => disconnect()}>Disconnect wallet</Button>
        </Col>
      </Row>
    </Container>
  );
}
