export const truncateAddress = (address) => {
  if (address.length <= 12) return address;
  return address.substr(0, 5) + "..." + address.substr(address.length - 4);
};

export const parseClaimGracePeriod = (seconds) => {
  const value = Number(seconds) / 60;
  if ((value / (60 * 24)) % 365 === 0) {
    const displayValue = value / (60 * 24 * 365);
    if (displayValue === 1) return `${displayValue} year`;
    else return `${displayValue} years`;
  } else if ((value / 60) % 24 === 0) {
    const displayValue = value / (60 * 24);
    if (displayValue === 1) return `${displayValue} day`;
    else return `${displayValue} days`;
  } else {
    if (value === 1) return `${value} minute`;
    else return `${value} minutes`;
  }
};
