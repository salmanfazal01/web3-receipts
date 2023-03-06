import { ethers } from "ethers";

// Company
export const registerCompany = async (contract, _name, _address) => {
  const result = await contract.call("registerCompany", _name, _address);
  console.log("registerCompany", result);
  return result;
};

export const approveCompany = async (contract, _id) => {
  const result = await contract.call("approveCompany", _id);
  console.log("approveCompany", result);
  return result;
};

export const getCompany = async (contract, _id) => {
  const result = await contract.call("getCompany", _id);
  console.log("getCompany", result);
  return result;
};

// Receipts
export const issueReceipt = async (
  contract,
  itemNames,
  itemPrices,
  itemQuantities
) => {
  const result = await contract.call(
    "issueReceipt",
    itemNames,
    itemPrices,
    itemQuantities
  );
  console.log("issueReceipt", result);
  return result;
};

export const getReceipt = async (contract, _id) => {
  const result = await contract.call("getReceipt", _id);

  const obj = {};
  obj.companyId = result[0].company;
  obj.companyName = result.companyName;
  obj.date = parseInt(result[0].saleDate);
  obj.sales = result[0].itemNames.map((_item, i) => ({
    name: _item,
    price: parseFloat(result[0].itemPrices[i]),
    quantity: parseInt(result[0].itemQuantities[i]),
  }));

  console.log("getReceipt", obj);

  return obj;
};

// Sales
export const getTotalSales = async (contract, _companyId) => {
  const _result = await contract.call("getTotalSales", _companyId);
  const result = parseFloat(_result);
  console.log("getTotalSales", result);
  return result;
};

// Admin
export const getAdmins = async (contract) => {
  const result = await contract.call("getAdmins");
  console.log("getAdmin", result);
  return result;
};

export const getSuperAdmins = async (contract) => {
  const result = await contract.call("getSuperAdmins");
  console.log("getSuperAdmins", result);
  return result;
};

export const addAdmin = async (contract, _id) => {
  const result = await contract.call("grantAdminRole", _id);
  console.log("addAdmin", result);
  return result;
};

export const removeAdmin = async (contract, _id) => {
  const result = await contract.call("revokeAdminRole", _id);
  console.log("removeAdmin", result);
  return result;
};
