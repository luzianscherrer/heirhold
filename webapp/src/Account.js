import { Container, Row, Col } from "react-bootstrap";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "react-bootstrap";
import { truncateAddress } from "./utils";

export function Account() {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col
          xs="auto"
          className="justify-content-center align-items-center d-none d-md-flex"
        >
          {address && (
            <div>
              Connected to <strong>{truncateAddress(address)}</strong> on{" "}
              {window.globalData.demoMode
                ? window.globalData.demoNetworkName
                : chain
                ? chain.name
                : "an unsupported chain"}
            </div>
          )}
        </Col>
        <Col
          xs="auto"
          className="d-flex justify-content-center align-items-center d-md-none"
        >
          {address && <div>{truncateAddress(address)}</div>}
        </Col>
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
