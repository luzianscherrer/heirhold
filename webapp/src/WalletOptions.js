import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useConnect } from "wagmi";
import { Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  console.log(connectors);

  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col
          xs="auto"
          className="d-flex justify-content-center align-items-center"
        >
          {connectors.length === 1 ? (
            <Button
              variant="primary"
              onClick={() =>
                window.open("https://metamask.io", "_blank", "noopener")
              }
            >
              Install a wallet
            </Button>
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Connect wallet
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {connectors
                  .filter((connector) => connector.id !== "injected")
                  .map((connector) => (
                    <WalletOption
                      key={connector.uid}
                      connector={connector}
                      onClick={() => connect({ connector })}
                    />
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Col>
      </Row>
    </Container>
  );
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
    <Dropdown.Item as="button" disabled={!ready} onClick={onClick}>
      {connector.name}
    </Dropdown.Item>
  );
}
