export const truncateAddress = (address) => {
  if (address.length <= 12) return address;
  return address.substr(0, 5) + "..." + address.substr(address.length - 4);
};
