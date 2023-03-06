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

export const getUnapprovedCompanies = async (contract, callback) => {
  try {
    const _result = await contract.call("getUnapprovedCompanies");

    const result = _result.map((item) => ({
      companyId: item.owner,
      companyName: item.companyName,
      companyAddress: item.companyAddress,
      approved: item.approved,
      approvedBy: item.approvedBy,
      approvalDate: item.approvalDate,
      totalSales: item.totalSales,
    }));

    callback?.(result);

    return result;
  } catch (error) {
    console.log("Error in getUnapprovedCompanies:", error);
    throw error;
  }
};

export const getCompany = async (contract, _id, callback) => {
  try {
    const result = await contract.call("getCompany", _id);

    const obj = {
      companyId: result.owner,
      companyName: result.companyName,
      companyAddress: result.companyAddress,
      approved: result.approved,
      approvedBy: result.approvedBy,
      approvalDate: result.approvalDate,
      totalSales: result.totalSales,
      notCreated:
        result.owner === "0x0000000000000000000000000000000000000000" ||
        !result.owner,
    };

    console.log("getCompany", obj);

    callback?.(obj);

    return obj;
  } catch (error) {
    console.log("Error in getCompany:", error);
    throw error;
  }
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
export const getAdmins = async (contract, callback) => {
  try {
    const _result = await contract.call("getAdmins");

    const result = _result.map((item) => ({
      adminId: item.adminId,
      isAdmin: item.isAdmin,
      isSuperAdmin: item.isSuperAdmin,
    }));

    callback?.(result || []);

    return result;
  } catch (error) {
    console.log("Error in getAdmins:", error);
    return error;
  }
};

export const addAdmin = async (contract, _id, _isSuperAdmin) => {
  try {
    const result = await contract.call("addAdmin", _id, _isSuperAdmin);
    console.log("addAdmin", result);
    return result;
  } catch (error) {
    console.log("Error in addAdmin:", error);
    throw error;
  }
};

export const removeAdmin = async (contract, _id) => {
  try {
    const result = await contract.call("removeAdmin", _id);
    console.log("removeAdmin", result);
    return result;
  } catch (error) {
    console.log("Error in removeAdmin:", error);
    throw error;
  }
};
