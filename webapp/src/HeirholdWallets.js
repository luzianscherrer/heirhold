import { Container, Card, Badge, Col, Row, Button } from "react-bootstrap";
import { truncateAddress } from "./utils";

export const HeirholdWallets = () => {
  return (
    <Container fluid className="p-0">
      <Card key="asdf">
        <Card.Body>
          <Card.Title>
            <Container fluid className="p-0">
              <Row>
                <Col>
                  <strong>
                    Wallet{" "}
                    {truncateAddress(
                      "0x0095a405ca5277b9c27d7bfe0d5ce1f92515942f"
                    )}
                  </strong>
                </Col>
                <Col className="text-end">
                  <Badge bg="secondary">OWNER</Badge>
                </Col>
              </Row>
            </Container>
          </Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">
            <Button variant="outline-secondary" size="sm">
              Edit
            </Button>
          </Card.Subtitle> */}
          <table>
            <tbody>
              <tr>
                <th scope="row">Full address:</th>
                <td>
                  <div className="ms-3">
                    0x0095a405ca5277b9c27d7bfe0d5ce1f92515942f
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">Claim grace period:</th>
                <td>
                  <div className="ms-3">365 days</div>
                </td>
              </tr>
              <tr>
                <th scope="row">Claim deposit fee:</th>
                <td>
                  <div className="ms-3">0.1 ETH</div>
                </td>
              </tr>
              <tr>
                <th scope="row">Active claims:</th>
                <td>
                  <div className="ms-3">none</div>
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Container fluid className="p-0">
            <Row>
              <Col className="d-flex align-items-center">
                Balance: <strong className="ms-2">12.3 ETH</strong>
              </Col>
              <Col className="text-end">
                <Button variant="outline-primary">Top-up</Button>
                <Button variant="outline-primary" className="ms-2">
                  Withdraw
                </Button>
                <Button variant="outline-primary" className="ms-2">
                  Edit
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </Container>
  );
};
