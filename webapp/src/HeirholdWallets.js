import {
  Container,
  Card,
  Badge,
  Col,
  Row,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
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
                <th scope="row" className="align-top">
                  Allowed claimants:
                </th>
                <td>
                  <div className="ms-3">
                    0xe712336C2577d8B4F5dbD1dB19626503e9079672
                    <br />
                    0x247061b632062bB8bF30937A901bc4097a46f383
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" className="pt-3 align-top">
                  Pending claims:
                </th>
                <td>
                  <div className="ms-3 pt-3">
                    <i>Claimant 0xe712336C2577d8B4F5dbD1dB19626503e9079672</i>
                  </div>
                  <div className="ms-3">
                    This claim will unlock 2024-11-13 13:49{" "}
                  </div>
                  <div className="ms-3">
                    <Button variant="outline-danger" size="sm" className="mt-1">
                      REJECT
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Container fluid className="p-0">
            <Row>
              <Col className="d-flex align-items-center">
                Balance: <strong className="ms-2">12.308 ETH</strong>
              </Col>
              <Col className="text-end">
                <Button variant="outline-primary">Top-up</Button>
                <Button variant="outline-primary" className="ms-2">
                  Withdraw
                </Button>
                <DropdownButton
                  variant="outline-primary"
                  className="ms-2 d-inline-block"
                  title="Edit"
                >
                  <Dropdown.Item as="button">
                    Change claim grace period
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                    Change claim deposit fee
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                    Remove claimant 0xe712336C2577d8B4F5dbD1dB19626503e9079672
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                    Remove claimant 0x247061b632062bB8bF30937A901bc4097a46f383
                  </Dropdown.Item>
                  <Dropdown.Item as="button">Add a new claimant</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </Container>
  );
};
