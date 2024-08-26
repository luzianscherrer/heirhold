import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useConnect } from "wagmi";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors
    .slice(0, 1)
    .map((connector) => (
      <WalletOption
        key={connector.uid}
        connector={connector}
        onClick={() => connect({ connector })}
      />
    ));
}

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col
          xs="auto"
          className="d-flex justify-content-center align-items-center"
        >
          <Button disabled={!ready} onClick={onClick}>
            Connect wallet
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
