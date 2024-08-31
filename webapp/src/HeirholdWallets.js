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
import { useState } from "react";
import { truncateAddress } from "./utils";
import { useAccount, chain } from "wagmi";
import { formatEther } from "viem";

export const HeirholdWallets = () => {
  /* global BigInt */

  const { address, chain } = useAccount();
  const [wallets, setWallets] = useState([
    {
      address: "0x0095a405ca5277b9c27d7bfe0d5ce1f92515942f",
      owner: "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
      balance: BigInt(1238000000000000000n),
      claimGracePeriod: 864000,
      claimDepositFeeAmount: BigInt(100000000000000000n),
      allowedClaimants: [
        "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
        "0x247061b632062bB8bF30937A901bc4097a46f383",
      ],
      claims: [
        {
          claimant: "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
          timestamp: 1725086017,
        },
      ],
    },
    {
      address: "0xc0ffee254729296a45a3885639AC7E10F9d54979",
      owner: "0x247061b632062bB8bF30937A901bc4097a46f383",
      balance: BigInt(12338457800000000000n),
      claimGracePeriod: 864000,
      claimDepositFeeAmount: BigInt(100000000000000000n),
      allowedClaimants: [
        "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
        "0x247061b632062bB8bF30937A901bc4097a46f383",
      ],
      claims: [
        {
          claimant: "0xe712336C2577d8B4F5dbD1dB19626503e9079672",
          timestamp: 1725086017,
        },
      ],
    },
  ]);

  return (
    <Container fluid className="p-0">
      {wallets.map((wallet) => {
        return (
          <Card key={wallet.address} className="mb-3">
            <Card.Body>
              <Card.Title>
                <Container fluid className="p-0">
                  <Row>
                    <Col>
                      <strong>Wallet {truncateAddress(wallet.address)}</strong>
                    </Col>
                    <Col className="text-end">
                      {address === wallet.owner && (
                        <Badge bg="secondary">OWNER</Badge>
                      )}
                    </Col>
                  </Row>
                </Container>
              </Card.Title>
              <table>
                <tbody>
                  <tr>
                    <th scope="row">Full address:</th>
                    <td>
                      <div className="ms-3">{wallet.address}</div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Claim grace period:</th>
                    <td>
                      <div className="ms-3">{wallet.claimGracePeriod}</div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Claim deposit fee:</th>
                    <td>
                      <div className="ms-3">
                        {(+formatEther(wallet.claimDepositFeeAmount)).toFixed(
                          4
                        )}{" "}
                        {chain.nativeCurrency.symbol}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="align-top">
                      Allowed claimants:
                    </th>
                    <td>
                      <div className="ms-3">
                        {wallet.allowedClaimants.length ? (
                          wallet.allowedClaimants.map((claimant) => {
                            return (
                              <>
                                {claimant}
                                <br />
                              </>
                            );
                          })
                        ) : (
                          <>None</>
                        )}
                      </div>
                    </td>
                  </tr>
                  {wallet.claims.length ? (
                    <tr>
                      <th scope="row" className="pt-3 align-top">
                        Pending claims:
                      </th>
                      {wallet.claims.map((claim) => {
                        return (
                          <td>
                            <div className="ms-3 pt-3">
                              Claimant {claim.claimant}
                            </div>
                            <div className="ms-3">
                              <i>
                                This claim will unlock{" "}
                                {new Date(
                                  (claim.timestamp + wallet.claimGracePeriod) *
                                    1000
                                ).toLocaleString()}
                              </i>
                            </div>
                            {wallet.owner === address && (
                              <div className="ms-3">
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  className="mt-1"
                                >
                                  REJECT
                                </Button>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ) : (
                    <tr>
                      <th scope="row">Pending claims:</th>
                      <td>
                        <div className="ms-3">None</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Container fluid className="p-0">
                <Row>
                  <Col className="d-flex align-items-center" xs="auto">
                    Balance:{" "}
                    <strong className="ms-2">
                      {(+formatEther(wallet.balance)).toFixed(4)}{" "}
                      {chain.nativeCurrency.symbol}
                    </strong>
                  </Col>
                  {wallet.owner === address ? (
                    <Col className="text-end">
                      <Button variant="outline-primary">Top-up</Button>
                      <Button
                        variant="outline-primary"
                        className="ms-2"
                        disabled={wallet.balance === 0n.valueOf()}
                      >
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
                        {wallet.allowedClaimants.map((claimant) => {
                          return (
                            <Dropdown.Item as="button">
                              Remove claimant {truncateAddress(claimant)}
                            </Dropdown.Item>
                          );
                        })}
                        <Dropdown.Item as="button">
                          Add a new claimant
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  ) : (
                    <Col className="text-end">
                      <Button
                        variant="outline-primary"
                        disabled={!wallet.allowedClaimants.includes(address)}
                      >
                        Claim
                      </Button>
                    </Col>
                  )}
                </Row>
              </Container>
            </Card.Footer>
          </Card>
        );
      })}
    </Container>
  );
};
