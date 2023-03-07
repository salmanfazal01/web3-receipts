import { isAddressNull } from "./helper";

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
      approvalDate: result.approvalDate.toNumber?.(),
      totalSales: result.totalSales?.toNumber?.(),
      notCreated: isAddressNull(result.owner) || !result.owner,
      receiptIds: result.receiptIds.map((i) => i.toNumber?.()),
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
  obj.date = result[0].saleDate?.toNumber?.() || 0;
  obj.sales = result[0].itemNames.map((_item, i) => ({
    name: _item,
    price: result[0].itemPrices[i]?.toNumber?.() || 0,
    quantity: result[0].itemQuantities[i]?.toNumber?.() || 0,
  }));

  console.log("getReceipt", obj);

  return obj;
};

// Sales
export const getTotalSales = async (contract, _companyId) => {
  const _result = await contract.call("getTotalSales", _companyId);
  const result = _result?.toNumber?.() || 0;
  console.log("getTotalSales", result);
  return result;
};

export const getCompanyReceipts = async (contract, _id, callback) => {
  try {
    const _result = await contract.call("getCompanyReceipts", _id);

    const result = _result.map((sale) => ({
      companyId: sale.company,
      saleDate: sale.saleDate?.toNumber?.() || 0,
      total: sale.saleTotal?.toNumber?.() || 0,
      items: sale.itemNames?.map?.((_, i) => ({
        name: sale.itemNames[i],
        price: sale.itemPrices[i]?.toNumber?.() || 0,
        quantity: sale.itemQuantities[i]?.toNumber?.() || 0,
      })),
    }));

    console.log("getCompanyReceipts", result);

    callback?.(result);

    return result;
  } catch (error) {
    console.log("Error in getCompanyReceipts:", error);
    throw error;
  }
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

export const getAdminStats = async (contract, callback) => {
  try {
    const _result = await contract.call("getAdminStats");

    const obj = {
      totalCompanies: _result[0]?.toNumber?.() || 0,
      totalReceipts: _result[1]?.toNumber?.() || 0,
      totalAdmins: _result[2]?.toNumber?.() || 0,
      totalSales: _result[3]?.toNumber?.() || 0,
    };

    callback?.(obj || {});

    return obj;
  } catch (error) {
    console.log("Error in getAdminStats:", error);
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
