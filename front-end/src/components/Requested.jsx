import React, {useState, useEffect } from 'react'
import DisplayRequested from './DisplayRequested';

const Requested = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  const reqArr = [];

  const [requestedList, setRequestedList] = useState([]);
  const [length, setLength] = useState(0);

  useEffect(() =>{

    const getRequested = async () =>{

      const _indices = await contract.getIndices({from: account});
      const _reqIndices = _indices[1].words[0];

      for(let i=0; i<_reqIndices; i++){

        const reqLand = await contract.getRequestedHouses(i, {from: account});

        // if deedNo. != 0
        if(reqLand[3].words[0] != 0){
          const landDetails = await contract.getHouseDetails(reqLand[0], reqLand[1], reqLand[2], reqLand[3].words[0], {
            from: account
          })

          const landDetails2 = {county: reqLand[0], sub_county: reqLand[1], city: reqLand[2], deedNo: reqLand[3].words[0]}
          let allDetails = {...landDetails, ...landDetails2}
          reqArr.push(allDetails);
        }
      }
      setRequestedList(reqArr);
      setLength(reqArr.length);
      console.log(reqArr);
    }

    getRequested();

  }, [])


  return (
    <div className='container'>
        {  
        (length === 0) ? 
        <div className="no-result-div">
          <p className='no-result'>No pending requests.</p>
        </div>
        :
          requestedList.map((details, index) =>{
            return(
              <DisplayRequested
                 
                key = {index}
                owner = {details[0]}
                propertyId = {details[1].words[0]}
                index = {details[2].words[0]}
                marketValue = {details[3].words[0]}
                sqft = {details[4].words[0]}
                county = {details.county}
                sub_county = {details.sub_county}
                city = {details.city}
                deedNo = {details.deedNo}

              />
            )
          })
        } 
    </div>
  )
}

export default Requested