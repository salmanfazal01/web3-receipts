// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CompanyRegistry {
    // Struct representing a company
    struct Company {
        address owner; // Address of the company owner
        string companyName; // Name of the company
        string companyAddress; // Address of the company
        bool approved; // Whether the company is approved by an admin
        uint256 approvalDate; // Date the company was approved
        address approvedBy; // Address of the admin who approved the company
        mapping(uint256 => uint256) monthlySales; // Mapping from month to total sales for that month
        uint256 totalSales; // Total sales for the company
    }

    // Struct representing an admin
    struct Admin {
        bool isSuperAdmin; // Whether the admin is a super admin
        bool exists; // Whether the admin exists
    }

    // Struct representing a receipt
    struct Receipt {
        address company; // Address of the company that issued the receipt
        uint256 saleDate; // Sale date for the receipt
        string[] itemNames; // Name of the items
        uint256[] itemPrices; // Price of the items
        uint256[] itemQuantities; // Quantity of the items
    }

    // Mapping from company addresses to company structs
    mapping(address => Company) public companies;

    // Mapping from admin addresses to admin structs
    mapping(address => Admin) public admins;

    // Mapping from receipt IDs to receipt structs
    mapping(uint256 => Receipt) public receipts;

    // Counter for receipt IDs
    uint256 public receiptCounter;

    // Track for total admins
    address[] public adminKeys;

    // Events
    event CompanyRegistration(
        address indexed company,
        string indexed companyName,
        uint256 indexed date
    );
    event CompanyApproved(
        address indexed company,
        address indexed admin,
        uint256 indexed date
    );
    event ReceiptIssued(
        address indexed company,
        uint256 indexed receiptId,
        uint256 indexed date
    );
    event AdminAdded(address indexed adminId);
    event AdminRemoved(address indexed adminId);

    // Modifier that only allows super admins
    modifier onlySuperAdmin() {
        require(
            admins[msg.sender].isSuperAdmin,
            "Only super admin can perform this action"
        );
        _;
    }

    // Modifier that only allows existing admins
    modifier onlyExistingAdmin() {
        require(
            admins[msg.sender].exists,
            "Only existing admin can perform this action"
        );
        _;
    }

    // Modifier that only allows existing admins or company owners
    modifier onlyAdminOrOwner(address _company) {
        require(
            admins[msg.sender].exists || msg.sender == _company,
            "Only existing admin can perform this action"
        );
        _;
    }

    constructor() {
        admins[msg.sender].isSuperAdmin = true;
        admins[msg.sender].exists = true;
        adminKeys.push(msg.sender);

        emit AdminAdded(msg.sender);
    }

    // Function to add a new admin
    function addAdmin(
        address _admin,
        bool _isSuperAdmin
    ) public onlySuperAdmin returns (address) {
        admins[_admin].isSuperAdmin = _isSuperAdmin;
        admins[_admin].exists = true;
        adminKeys.push(_admin);

        emit AdminAdded(_admin);

        return _admin;
    }

    // Function to remove an existing admin
    function removeAdmin(
        address _admin
    ) public onlySuperAdmin returns (address) {
        require(_admin != msg.sender, "Cannot remove yourself");
        require(admins[_admin].exists, "Admin does not exist");

        for (uint256 i = 0; i < adminKeys.length; i++) {
            if (adminKeys[i] == _admin) {
                adminKeys[i] = adminKeys[adminKeys.length - 1];
                adminKeys.pop();
                break;
            }
        }

        delete admins[_admin];

        emit AdminRemoved(_admin);

        return _admin;
    }

    // Function to get a list of all admins (super admin only)
    function getAdmins() public view onlySuperAdmin returns (address[] memory) {
        address[] memory result = new address[](adminKeys.length);

        uint256 index = 0;
        for (uint256 i = 0; i < adminKeys.length; i++) {
            if (admins[adminKeys[i]].exists) {
                result[index] = adminKeys[i];
                index++;
            }
        }

        return result;
    }

    // Function to get a list of all admins (super admin only)
    // function getAdmins2() public view returns (address[] memory, Admin memory) {
    //     address[] memory result = new address[](adminKeys.length);

    //     Admin storage admin = admins[msg.sender];

    //     uint256 index = 0;
    //     for (uint256 i = 0; i < adminKeys.length; i++) {
    //         if (admins[adminKeys[i]].exists) {
    //             result[index] = adminKeys[i];
    //             index++;
    //         }
    //     }

    //     return (result, admin);
    // }

    // Function for a company to register itself
    function registerCompany(
        string memory _name,
        string memory _address
    ) public returns (address) {
        Company storage company = companies[msg.sender];

        require(!company.approved, "Company already registered");

        company.owner = msg.sender;
        company.companyName = _name;
        company.companyAddress = _address;

        emit CompanyRegistration(msg.sender, _name, block.timestamp);

        return msg.sender;
    }

    // Function for an admin to approve a company
    function approveCompany(
        address _company
    ) public onlyExistingAdmin returns (bool) {
        Company storage company = companies[_company];

        require(!company.approved, "Company already approved");

        company.approved = true;
        company.approvalDate = block.timestamp;
        company.approvedBy = msg.sender;

        emit CompanyApproved(_company, msg.sender, block.timestamp);

        return true;
    }

    // Function for a company to issue a receipt
    function issueReceipt(
        string[] memory _names,
        uint256[] memory _prices,
        uint256[] memory _quantities
    ) public returns (Receipt memory) {
        Company storage company = companies[msg.sender];

        require(company.approved, "Company not approved");
        require(
            _names.length == _prices.length,
            "Names array not equal lengh as Price array"
        );
        require(
            _names.length == _quantities.length,
            "Names array not equal lengh as Quantities array"
        );

        // Calculate the total
        uint _saleAmount = 0;
        for (uint i = 0; i < _prices.length; i++) {
            _saleAmount += _prices[i] * _quantities[i];
        }

        // Create a receipt
        uint256 receiptId = ++receiptCounter;
        Receipt storage receipt = receipts[receiptId];

        receipt.company = msg.sender;
        receipt.saleDate = block.timestamp;
        receipt.itemNames = _names;
        receipt.itemPrices = _prices;
        receipt.itemQuantities = _quantities;

        // Update the company's sales
        company.totalSales += _saleAmount;
        company.monthlySales[getMonth(block.timestamp)] += _saleAmount;

        emit ReceiptIssued(msg.sender, receiptId, block.timestamp);

        return receipts[receiptId];
    }

    // Function to get information about a receipt
    function getReceipt(
        uint256 _receiptId
    ) public view returns (Receipt memory, string memory companyName) {
        Receipt storage receipt = receipts[_receiptId];
        Company storage company = companies[receipt.company];

        return (receipt, company.companyName);
    }

    // Function to get information about a company
    function getCompany(
        address _company
    )
        public
        view
        onlyAdminOrOwner(_company)
        returns (
            bool approved,
            uint256 approvalDate,
            address approvedBy,
            address owner,
            string memory companyName,
            string memory companyAddress,
            uint256 totalSales
        )
    {
        Company storage company = companies[_company];

        approved = company.approved;
        approvalDate = company.approvalDate;
        approvedBy = company.approvedBy;
        owner = company.owner;
        totalSales = company.totalSales;
        companyName = company.companyName;
        companyAddress = company.companyAddress;
    }

    // Function to get total sales for a company in a given month
    function getMonthSales(
        address _company,
        uint256 _month
    ) public view onlyAdminOrOwner(_company) returns (uint256) {
        return companies[_company].monthlySales[_month];
    }

    // Function to get total sales for a company
    function getTotalSales(
        address _company
    ) public view onlyAdminOrOwner(_company) returns (uint256) {
        return companies[_company].totalSales;
    }

    // Helper function to get the month from a Unix timestamp
    function getMonth(uint256 timestamp) private pure returns (uint256) {
        return timestamp / 1 days / 30;
    }
}
