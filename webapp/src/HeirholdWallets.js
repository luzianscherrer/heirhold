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
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { AddClaimantModal } from "./AddClaimantModal";
import { ChangeClaimGracePeriodModal } from "./ChangeClaimGracePeriodModal";
import { ChangeClaimDepositFeeModal } from "./ChangeClaimDepositFeeModal";
import { TopUpModal } from "./TopUpModal";
import { WithdrawModal } from "./WithdrawModal";
import { useState, useEffect } from "react";
import { useWriteContract } from "wagmi";
import { heirholdWalletConfig } from "./heirholdWalletConfig";

export const HeirholdWallets = ({ wallets, setWallets, addNotification }) => {
  const { address, chain } = useAccount();
  const [modalAddress, setModalAddress] = useState("");
  const [showAddClaimantModal, setShowAddClaimantModal] = useState();
  const [modalClaimGracePeriod, setModalClaimGracePeriod] = useState(0);
  const [showTopUpModal, setShowTopUpModal] = useState();
  const [showWithdrawModal, setShowWithdrawModal] = useState();
  const [showChangeClaimGracePeriodModal, setShowChangeClaimGracePeriodModal] =
    useState();
  const [modalClaimDepositFee, setModalClaimDepositFee] = useState("");
  const [showChangeClaimDepositFeeModal, setShowChangeClaimDepositFeeModal] =
    useState();
  const { data: hash, writeContract } = useWriteContract();

  useEffect(() => {
    if (hash) {
      addNotification(
        "Transaction submitted",
        `The wallet is being updated in transaction ${hash}. The change will appear in your dashboard once confirmed.`
      );
    }
  }, [hash, addNotification]);

  function claimIsUnlocked(wallet, claim) {
    console.log(
      "DEBUG",
      claim.timestamp,
      new Date(Number(claim.timestamp) * 1000)
    );
    return (
      Math.floor(new Date().getTime() / 1000) >=
      Number(claim.timestamp) + Number(wallet.claimGracePeriod)
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
              <Button
                variant="outline-danger"
                onClick={() => {
                  console.log("execute claim", wallet.address);
                  writeContract({
                    address: wallet.address,
                    abi: heirholdWalletConfig.abi,
                    functionName: "executeClaimTransferOwnership",
                  });
                }}
              >
                Execute claim
              </Button>
            </Col>
          );
        } else {
          return (
            <Col className="text-end">
              <Button
                variant="outline-primary"
                onClick={() => {
                  console.log("claim", wallet.address);
                  writeContract({
                    address: wallet.address,
                    abi: heirholdWalletConfig.abi,
                    functionName: "removeClaim",
                  });
                }}
              >
                Cancel claim
              </Button>
            </Col>
          );
        }
      } else {
        return (
          <Col className="text-end">
            <Button
              variant="outline-primary"
              onClick={() => {
                console.log("claim", wallet.address);
                writeContract({
                  address: wallet.address,
                  abi: heirholdWalletConfig.abi,
                  functionName: "createOrUpdateClaim",
                  value: wallet.claimDepositFeeAmount,
                });
              }}
            >
              Claim
            </Button>
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
    <>
      <Container fluid className="p-0">
        {wallets.map((wallet) => {
          return (
            <div key={wallet.address}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>
                    <Container fluid className="p-0">
                      <Row>
                        <Col>
                          <strong>
                            Wallet {truncateAddress(wallet.address)}
                          </strong>
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
                            {(+formatEther(
                              wallet.claimDepositFeeAmount
                            )).toFixed(4)}{" "}
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
                                      onClick={() => {
                                        console.log("claim", wallet.address);
                                        writeContract({
                                          address: wallet.address,
                                          abi: heirholdWalletConfig.abi,
                                          functionName: "rejectClaim",
                                          args: [claim.claimant],
                                        });
                                      }}
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
                          <Button
                            variant="outline-primary"
                            onClick={() => {
                              setModalAddress(wallet.address);
                              setShowTopUpModal(true);
                            }}
                          >
                            Top-up
                          </Button>
                          <Button
                            variant="outline-primary"
                            className="ms-2"
                            onClick={() => {
                              setModalAddress(wallet.address);
                              setShowWithdrawModal(true);
                            }}
                            disabled={wallet.balance === 0n.valueOf()}
                          >
                            Withdraw
                          </Button>
                          <DropdownButton
                            variant="outline-primary"
                            className="ms-2 d-inline-block"
                            title="Edit"
                          >
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                setModalAddress(wallet.address);
                                setModalClaimGracePeriod(
                                  Number(wallet.claimGracePeriod)
                                );
                                setShowChangeClaimGracePeriodModal(true);
                              }}
                            >
                              Change claim grace period
                            </Dropdown.Item>
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                setModalAddress(wallet.address);
                                setModalClaimDepositFee(
                                  formatEther(wallet.claimDepositFeeAmount)
                                );
                                setShowChangeClaimDepositFeeModal(true);
                              }}
                            >
                              Change claim deposit fee
                            </Dropdown.Item>
                            {wallet.allowedClaimants.map((claimant) => {
                              return (
                                <Dropdown.Item
                                  as="button"
                                  key={claimant}
                                  onClick={() => {
                                    console.log("remove", claimant);
                                    writeContract({
                                      address: wallet.address,
                                      abi: heirholdWalletConfig.abi,
                                      functionName: "removeAllowedClaimant",
                                      args: [claimant],
                                    });
                                  }}
                                >
                                  Remove claimant {truncateAddress(claimant)}
                                </Dropdown.Item>
                              );
                            })}
                            <Dropdown.Item
                              as="button"
                              onClick={() => {
                                setModalAddress(wallet.address);
                                setShowAddClaimantModal(true);
                              }}
                            >
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
            </div>
          );
        })}
      </Container>

      <AddClaimantModal
        showAddClaimantModal={showAddClaimantModal}
        setShowAddClaimantModal={setShowAddClaimantModal}
        address={modalAddress}
        addNotification={addNotification}
      />

      <TopUpModal
        showTopUpModal={showTopUpModal}
        setShowTopUpModal={setShowTopUpModal}
        address={modalAddress}
        addNotification={addNotification}
      />

      <WithdrawModal
        showWithdrawModal={showWithdrawModal}
        setShowWithdrawModal={setShowWithdrawModal}
        address={modalAddress}
        addNotification={addNotification}
      />

      <ChangeClaimGracePeriodModal
        showChangeClaimGracePeriodModal={showChangeClaimGracePeriodModal}
        setShowChangeClaimGracePeriodModal={setShowChangeClaimGracePeriodModal}
        address={modalAddress}
        addNotification={addNotification}
        currentValueGracePeriod={modalClaimGracePeriod}
      />

      <ChangeClaimDepositFeeModal
        showChangeClaimDepositFeeModal={showChangeClaimDepositFeeModal}
        setShowChangeClaimDepositFeeModal={setShowChangeClaimDepositFeeModal}
        address={modalAddress}
        addNotification={addNotification}
        currentValueDepositFee={modalClaimDepositFee}
      />
    </>
  );
};
