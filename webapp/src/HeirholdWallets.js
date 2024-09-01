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
import { truncateAddress, parseClaimGracePeriod } from "./utils";
import { useAccount, chain } from "wagmi";
import { formatEther } from "viem";

export const HeirholdWallets = ({ wallets, setWallets }) => {
  /* global BigInt */

  const { address, chain } = useAccount();

  function claimIsUnlocked(wallet, claim) {
    return (
      new Date(
        (Number(claim.timestamp) + Number(wallet.claimGracePeriod)) * 1000
      ) < new Date()
    );
  }

  function claimState(wallet, address) {
    if (wallet.allowedClaimants.includes(address)) {
      if (
        wallet.claims.filter((claim) => claim.claimant === address).length === 1
      ) {
        if (
          claimIsUnlocked(
            wallet,
            wallet.claims.find((claim) => claim.claimant === address)
          )
        ) {
          return (
            <Col className="text-end">
              <Button variant="outline-danger">Execute claim</Button>
            </Col>
          );
        } else {
          return (
            <Col className="text-end">
              <Button variant="outline-primary">Cancel claim</Button>
            </Col>
          );
        }
      } else {
        return (
          <Col className="text-end">
            <Button variant="outline-primary">Claim</Button>
          </Col>
        );
      }
    }
    return (
      <Col className="text-end">
        <Button
          variant="outline-primary"
          style={{ visibility: "hidden" }}
          disabled
        >
          Claim
        </Button>
      </Col>
    );
  }

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
                        <Badge pill bg="secondary">
                          OWNER
                        </Badge>
                      )}
                      {address !== wallet.owner &&
                        wallet.allowedClaimants.includes(address) &&
                        wallet.claims.filter(
                          (claim) => claim.claimant === address
                        ).length === 0 && (
                          <Badge pill bg="secondary">
                            CLAIMABLE
                          </Badge>
                        )}
                      {address !== wallet.owner &&
                        wallet.allowedClaimants.includes(address) &&
                        wallet.claims.filter(
                          (claim) => claim.claimant === address
                        ).length === 1 && (
                          <Badge pill bg="secondary">
                            CLAIMED
                          </Badge>
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
                      <div className="ms-3">
                        {parseClaimGracePeriod(wallet.claimGracePeriod)}
                      </div>
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
                              <div key={claimant}>
                                {claimant}
                                <br />
                              </div>
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
                          <td key={claim.claimant}>
                            <div className="ms-3 pt-3">
                              Claimant {claim.claimant}
                            </div>
                            <div className="ms-3">
                              <i>
                                This claim{" "}
                                {claimIsUnlocked(wallet, claim) ? (
                                  <>did</>
                                ) : (
                                  <>will</>
                                )}{" "}
                                unlock{" "}
                                {new Date(
                                  (Number(claim.timestamp) +
                                    Number(wallet.claimGracePeriod)) *
                                    1000
                                ).toLocaleString()}
                              </i>{" "}
                              {claimIsUnlocked(wallet, claim) && (
                                <Badge pill bg="warning" text="dark">
                                  UNLOCKED CLAIM
                                </Badge>
                              )}
                            </div>
                            {wallet.owner === address && (
                              <div className="ms-3">
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  className="mt-1"
                                >
                                  Reject this claim
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
                            <Dropdown.Item as="button" key={claimant}>
                              Remove claimant {truncateAddress(claimant)}
                            </Dropdown.Item>
                          );
                        })}
                        <Dropdown.Item as="button">
                          Add a new claimant
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={() => {
                            setWallets(
                              wallets.filter(
                                (w) => w.address !== wallet.address
                              )
                            );
                            localStorage.setItem(
                              "wallets",
                              JSON.stringify(
                                wallets
                                  .filter((w) => w.address !== wallet.address)
                                  .map((w) => w.address)
                              )
                            );
                          }}
                        >
                          Remove wallet from dashboard
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  ) : (
                    claimState(wallet, address)
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
