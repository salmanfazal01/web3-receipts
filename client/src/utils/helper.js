export const smallerString = (
  _string,
  firstN = 5,
  lastN = -4,
  numOfDots = 4
) => {
  const _first = _string.slice(0, firstN);
  const _last = _string.slice(lastN);

  return `${_first}${Array(numOfDots).join(".")}${_last}`;
};

export const isAddressNull = (address) => {
  return address === "0x0000000000000000000000000000000000000000" || !address;
};
