import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HeirholdModule = buildModule("HeirholdModule", (m) => {
  const heirhold = m.contract("HeirholdFactory", [], {});

  return { heirhold };
});

export default HeirholdModule;
