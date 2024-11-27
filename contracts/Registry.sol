// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.9.0;

contract Registry{

    address public superAdmin;
    uint public totalAdmins;
    
    struct Admin{
        address adminAddress;
        string city;
        string sub_county;
        string county;
    }

    struct HouseDetails{
        address owner;
        address admin;
        uint256 propertyId;
        uint deedNumber;
        uint index;
        bool registered;
        uint marketValue;
        bool markAvailable;
        mapping(uint => RequestDetails) requests; // reqNo => RequestDetails
        uint noOfRequests;  // other users requested to this house
        uint sqft;
    }

    struct UserProfile{
        address userAddr;
        string fullName;
        string gender;
        string email;
        uint256 contact;
        string residentialAddr;
        uint totalIndices;
        uint requestIndices;  // this user requested to other houses
    }

    struct OwnerOwns{
        uint deedNumber;
        string county;
        string sub_county;
        string city;
    }
    
    struct RequestedHouses{
        uint deedNumber;
        string county;
        string sub_county;
        string city;
    }

    struct RequestDetails{
        address whoRequested;
        uint reqIndex;
    }

    mapping(address => Admin) public admins;
    mapping(address => mapping(uint => OwnerOwns)) public ownerMapsProperty;  // ownerAddr => index no. => OwnerOwns 
    mapping(address => mapping(uint => RequestedHouses)) public requestedHouses;  // ownerAddr => reqIndex => RequestedHouses
    mapping(string => mapping(string => mapping(string => mapping(uint => HouseDetails)))) public houseDetalsMap; // county => sub_county => city => deedNo => HouseDetails
    mapping(address => UserProfile) public userProfile;
    

    constructor(){
        superAdmin = msg.sender;
    }

    modifier onlyAdmin(){
        require(admins[msg.sender].adminAddress == msg.sender, "Only admin can Register house");
        _;
    }


    // SuperAdmin: Registers new admin
    function addAdmin(address _adminAddr, string memory _county, string memory _district, string memory _city) external{
        Admin storage newAdmin = admins[_adminAddr];
        totalAdmins++;

        newAdmin.adminAddress = _adminAddr;
        newAdmin.city = _city;
        newAdmin.sub_county = _district;
        newAdmin.county = _county;
    }


    // check if it is admin
    function isAdmin() external view returns(bool){
        if(admins[msg.sender].adminAddress == msg.sender){
            return true;
        }
        else return false;
    }


    // Admin: registers house
    function registerHouse(string memory _county, string memory _district, string memory _city, uint256 _propertyId, uint _deedNo, address _owner, uint _marketValue, uint _sqft) external onlyAdmin{
        
        require(keccak256(abi.encodePacked(admins[msg.sender].county)) == keccak256(abi.encodePacked(_county))  
        && keccak256(abi.encodePacked(admins[msg.sender].sub_county)) == keccak256(abi.encodePacked(_district))
        && keccak256(abi.encodePacked(admins[msg.sender].city)) == keccak256(abi.encodePacked(_city)), "Admin can only register house of same city.");

        require(houseDetalsMap[_county][_district][_city][_deedNo].registered == false, "Deed Number already registered!");

        HouseDetails storage newHouseRegistry = houseDetalsMap[_county][_district][_city][_deedNo];
        OwnerOwns storage newOwnerOwns = ownerMapsProperty[_owner][userProfile[_owner].totalIndices];
        

        newHouseRegistry.owner = _owner;
        newHouseRegistry.admin = msg.sender;
        newHouseRegistry.propertyId = _propertyId;
        newHouseRegistry.deedNumber = _deedNo;
        newHouseRegistry.index = userProfile[_owner].totalIndices;
        newHouseRegistry.registered = true;
        newHouseRegistry.marketValue = _marketValue;
        newHouseRegistry.markAvailable = false;
        newHouseRegistry.sqft = _sqft;

        newOwnerOwns.deedNumber = _deedNo;
        newOwnerOwns.county = _county;
        newOwnerOwns.sub_county = _district;
        newOwnerOwns.city = _city;

        userProfile[_owner].totalIndices++;
    }


    // User_1: set user profile
    function setUserProfile(string memory _fullName, string memory _gender, string memory _email, uint256 _contact, string memory _residentialAddr) external{
        
        UserProfile storage newUserProfile = userProfile[msg.sender];

        newUserProfile.fullName = _fullName;
        newUserProfile.gender = _gender;
        newUserProfile.email = _email;
        newUserProfile.contact = _contact;
        newUserProfile.residentialAddr = _residentialAddr;
    }


    // User_1: mark property available
    function markMyPropertyAvailable(uint indexNo) external {
        
        string memory county = ownerMapsProperty[msg.sender][indexNo].county;
        string memory sub_county = ownerMapsProperty[msg.sender][indexNo].sub_county;
        string memory city = ownerMapsProperty[msg.sender][indexNo].city;
        uint deedNumber = ownerMapsProperty[msg.sender][indexNo].deedNumber;

        require(houseDetalsMap[county][sub_county][city][deedNumber].markAvailable == false, "Property already marked available");

        houseDetalsMap[county][sub_county][city][deedNumber].markAvailable = true;
    
    }


    // User_2: Request for buy  **ownerAddress & index = arguements** 
    function RequestForBuy(string memory _county, string memory _district, string memory _city, uint _deedNo) external{

        HouseDetails storage thisHouseDetail = houseDetalsMap[_county][_district][_city][_deedNo];
        require(thisHouseDetail.markAvailable == true, "This property is NOT marked for sale!");

        uint req_serialNum = thisHouseDetail.noOfRequests; 
        thisHouseDetail.requests[req_serialNum].whoRequested = msg.sender;
        thisHouseDetail.requests[req_serialNum].reqIndex = userProfile[msg.sender].requestIndices;
        thisHouseDetail.noOfRequests++;

        // adding requested house to user_2 profile
        RequestedHouses storage newReqestedHouses = requestedHouses[msg.sender][userProfile[msg.sender].requestIndices];
        newReqestedHouses.deedNumber = _deedNo;
        newReqestedHouses.county = _county;
        newReqestedHouses.sub_county = _district;
        newReqestedHouses.city = _city;

        userProfile[msg.sender].requestIndices++;

    }


    // User_1: Accept the buy request; sell.
    function AcceptRequest(uint _index, uint _reqNo) external{

        uint _deedNo = ownerMapsProperty[msg.sender][_index].deedNumber;
        string memory _county = ownerMapsProperty[msg.sender][_index].county; 
        string memory _district = ownerMapsProperty[msg.sender][_index].sub_county;
        string memory _city = ownerMapsProperty[msg.sender][_index].city;
        
        // updating HouseDetails
        address newOwner = houseDetalsMap[_county][_district][_city][_deedNo].requests[_reqNo].whoRequested;
        uint newOwner_reqIndex = houseDetalsMap[_county][_district][_city][_deedNo].requests[_reqNo].reqIndex;
        uint noOfReq = houseDetalsMap[_county][_district][_city][_deedNo].noOfRequests;

        // deleting requested house from all requesters AND removing all incoming requests
        for(uint i=0; i<noOfReq; i++){
            address requesterAddr = houseDetalsMap[_county][_district][_city][_deedNo].requests[i].whoRequested;
            uint requester_reqIndx = houseDetalsMap[_county][_district][_city][_deedNo].requests[i].reqIndex;
            
            delete requestedHouses[requesterAddr][requester_reqIndx];
            delete houseDetalsMap[_county][_district][_city][_deedNo].requests[i];
        }

        houseDetalsMap[_county][_district][_city][_deedNo].owner = newOwner;
        houseDetalsMap[_county][_district][_city][_deedNo].markAvailable = false;
        houseDetalsMap[_county][_district][_city][_deedNo].noOfRequests = 0;

        // deleting property from user_1's ownerMapsProperty 
        delete ownerMapsProperty[msg.sender][_index];

        // adding ownerMapsProperty for newOwner
        uint newOwnerTotProp = userProfile[newOwner].totalIndices;
        OwnerOwns storage newOwnerOwns = ownerMapsProperty[newOwner][newOwnerTotProp];
       
        newOwnerOwns.deedNumber = _deedNo;
        newOwnerOwns.county = _county;
        newOwnerOwns.sub_county = _district;
        newOwnerOwns.city = _city;

        houseDetalsMap[_county][_district][_city][_deedNo].index = newOwnerTotProp;

        userProfile[newOwner].totalIndices++;

    }


    
    //******* GETTERS **********

    // return house details 
    function getHouseDetails(string memory _county, string memory _district, string memory _city, uint _deedNo) external view returns(address, uint256, uint, uint, uint){
        
        address owner = houseDetalsMap[_county][_district][_city][_deedNo].owner;
        uint256 propertyid = houseDetalsMap[_county][_district][_city][_deedNo].propertyId;
        uint indx = houseDetalsMap[_county][_district][_city][_deedNo].index;
        uint mv = houseDetalsMap[_county][_district][_city][_deedNo].marketValue;
        uint sqft = houseDetalsMap[_county][_district][_city][_deedNo].sqft;

        return(owner, propertyid, indx, mv, sqft);
    }

    function getRequestCnt_propId(string memory _county, string memory _district, string memory _city, uint _deedNo) external view returns(uint, uint256){
        uint _noOfRequests = houseDetalsMap[_county][_district][_city][_deedNo].noOfRequests;
        uint256 _propertyId = houseDetalsMap[_county][_district][_city][_deedNo].propertyId;
        return(_noOfRequests, _propertyId);
    }

    function getRequesterDetail(string memory _county, string memory _district, string memory _city, uint _deedNo, uint _reqIndex) external view returns(address){
        address requester = houseDetalsMap[_county][_district][_city][_deedNo].requests[_reqIndex].whoRequested;
        return(requester);
    }

    function isAvailable(string memory _county, string memory _district, string memory _city, uint _deedNo) external view returns(bool){
        bool available = houseDetalsMap[_county][_district][_city][_deedNo].markAvailable;
        return(available);
    }

    function getOwnerOwns(uint indx) external view returns(string memory, string memory, string memory, uint){
        
        uint deedNo = ownerMapsProperty[msg.sender][indx].deedNumber;
        string memory county = ownerMapsProperty[msg.sender][indx].county;
        string memory sub_county = ownerMapsProperty[msg.sender][indx].sub_county;
        string memory city = ownerMapsProperty[msg.sender][indx].city;

        return(county, sub_county, city, deedNo);
    }

    function getRequestedHouses(uint indx) external view returns(string memory, string memory, string memory, uint){
        
        uint deedNo = requestedHouses[msg.sender][indx].deedNumber;
        string memory county = requestedHouses[msg.sender][indx].county;
        string memory sub_county = requestedHouses[msg.sender][indx].sub_county;
        string memory city = requestedHouses[msg.sender][indx].city;

        return(county, sub_county, city, deedNo);
    }

    function getUserProfile() external view returns(string memory, string memory, string memory, uint256, string memory){
        
        string memory fullName = userProfile[msg.sender].fullName;
        string memory gender = userProfile[msg.sender].gender;
        string memory email = userProfile[msg.sender].email;
        uint256 contact = userProfile[msg.sender].contact;
        string memory residentialAddr = userProfile[msg.sender].residentialAddr;

        return(fullName, gender, email, contact, residentialAddr);
    }

    function getIndices() external view returns(uint, uint){

        uint _totalIndices = userProfile[msg.sender].totalIndices;
        uint _reqIndices = userProfile[msg.sender].requestIndices;

        return(_totalIndices, _reqIndices);
    }


    function didIRequested(string memory _county, string memory _district, string memory _city, uint _deedNo) external view returns(bool){
        
        HouseDetails storage thisHouseDetail = houseDetalsMap[_county][_district][_city][_deedNo];
        uint _noOfRequests = thisHouseDetail.noOfRequests;

        if(_noOfRequests == 0) 
            return (false);

        for(uint i=0; i<_noOfRequests; i++){
            if(thisHouseDetail.requests[i].whoRequested == msg.sender){
                return (true);
            }
        } 

        return(false);
    } 

}
