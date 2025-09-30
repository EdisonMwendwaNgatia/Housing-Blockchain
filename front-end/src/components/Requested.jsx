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

  const containerStyle = {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f2027 100%)',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const noResultDivStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    background: 'rgba(16, 185, 129, 0.05)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  };

  const noResultStyle = {
    fontSize: '1.8rem',
    color: '#10b981',
    fontWeight: '600',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(16, 185, 129, 0.3)',
    background: 'linear-gradient(135deg, #10b981, #34d399)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const listContainerStyle = {
    display: 'grid',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  return (
    <div className='container' style={containerStyle}>
        {  
        (length === 0) ? 
        <div className="supad-no-result-div" style={noResultDivStyle}>
          <p className='supad-no-result' style={noResultStyle}>No pending requests.</p>
        </div>
        :
        <div style={listContainerStyle}>
          {requestedList.map((details, index) =>{
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
          })}
        </div>
        } 
    </div>
  )
}

export default Requested