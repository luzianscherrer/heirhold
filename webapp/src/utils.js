export const truncateAddress = (address) => {
  if (address.length <= 12) return address;
  return address.substr(0, 5) + "..." + address.substr(address.length - 4);
};

export const parseClaimGracePeriod = (seconds) => {
  const value = Number(seconds) / (60 * 60);
  if ((value / 24) % 365 === 0) {
    return `${value / (24 * 365)} years`;
  } else if (value % 24 === 0) {
    return `${value / 24} days`;
  } else {
    return `${value} minutes`;
  }
};
