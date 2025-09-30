import React, { useEffect, useState } from 'react'
import DisplayPropertyDetails from './DisplayPropertyDetails';

const Property = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [landDetailList, setLandDetailList] = useState([])
  const [length, setLength] = useState(0);
  const [reload, setReload] = useState(0);
  const detailsArr = [];

  // Embedded CSS styles
  const styles = `
    .proprt-container {
      margin-bottom: 4rem;
      min-height: 100vh;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f2027 100%);
      padding: 2rem;
      position: relative;
    }

    .proprt-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="proprt-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16,185,129,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23proprt-grid)"/></svg>');
      opacity: 0.3;
      pointer-events: none;
    }

    .proprt-no-result-div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      position: relative;
      z-index: 2;
    }

    .proprt-no-result-card {
      background: rgba(16, 185, 129, 0.05);
      border: 2px solid rgba(16, 185, 129, 0.2);
      border-radius: 20px;
      padding: 4rem 3rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      max-width: 500px;
      position: relative;
      overflow: hidden;
    }

    .proprt-no-result-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
      animation: proprt-rotate 15s linear infinite;
      pointer-events: none;
    }

    @keyframes proprt-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .proprt-no-result-icon {
      font-size: 4rem;
      color: #10b981;
      margin-bottom: 1.5rem;
      animation: proprt-pulse 2s ease-in-out infinite;
    }

    @keyframes proprt-pulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.1); opacity: 1; }
    }

    .proprt-no-result {
      font-size: 1.8rem;
      color: #d1fae5;
      margin: 0;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
      position: relative;
      z-index: 2;
    }

    .proprt-no-result-subtitle {
      font-size: 1rem;
      color: rgba(209, 250, 229, 0.7);
      margin-top: 1rem;
      font-weight: 300;
      position: relative;
      z-index: 2;
    }

    .proprt-properties-grid {
      display: grid;
      gap: 2rem;
      position: relative;
      z-index: 2;
      max-width: 1200px;
      margin: 0 auto;
    }

    .proprt-header {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
      z-index: 2;
    }

    .proprt-title {
      font-size: 2.5rem;
      color: #10b981;
      font-weight: 700;
      margin: 0;
      text-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
      margin-bottom: 0.5rem;
    }

    .proprt-subtitle {
      font-size: 1.1rem;
      color: rgba(209, 250, 229, 0.8);
      margin: 0;
      font-weight: 300;
      letter-spacing: 1px;
    }

    .proprt-divider {
      width: 120px;
      height: 4px;
      background: linear-gradient(90deg, #059669, #10b981, #34d399);
      margin: 1rem auto;
      border-radius: 2px;
    }

    .proprt-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 40vh;
      color: #10b981;
      font-size: 1.2rem;
      position: relative;
      z-index: 2;
    }

    .proprt-loading::before {
      content: '⚡';
      display: inline-block;
      margin-right: 1rem;
      font-size: 1.5rem;
      animation: proprt-spin 1s linear infinite;
    }

    @keyframes proprt-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Responsive Design */
    @media screen and (max-width: 768px) {
      .proprt-container {
        padding: 1rem;
      }
      
      .proprt-title {
        font-size: 2rem;
      }
      
      .proprt-no-result-card {
        padding: 2.5rem 2rem;
        margin: 0 1rem;
      }
      
      .proprt-no-result {
        font-size: 1.5rem;
      }
      
      .proprt-no-result-icon {
        font-size: 3rem;
      }
    }

    @media screen and (max-width: 400px) {
      .proprt-no-result-card {
        padding: 2rem 1.5rem;
      }
      
      .proprt-title {
        font-size: 1.8rem;
      }
      
      .proprt-no-result {
        font-size: 1.3rem;
      }
    }
  `;

  useEffect(() => {
    // Inject styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      // Cleanup styles on unmount
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(()=>{

    const getProperty = async () =>{
      const _indices = await contract.getIndices({from: account});
      const _totalIndices = _indices[0].words[0];

      for(let i=0; i<_totalIndices; i++){
        const ownerOwns = await contract.getOwnerOwns(i, {from: account});  // returns object
        
        // if survey no. != 0
        if(ownerOwns[3].words[0] !== 0){
            const landDetails = await contract.getHouseDetails(ownerOwns[0], ownerOwns[1], ownerOwns[2], ownerOwns[3].words[0], {
              from: account
            })

            const isAvaliable = await contract.isAvailable(ownerOwns[0], ownerOwns[1], ownerOwns[2], ownerOwns[3].words[0], {
              from: account
            })
            
            const landDetails2 = {county: ownerOwns[0], sub_county: ownerOwns[1], city: ownerOwns[2], deedNo: ownerOwns[3].words[0], isAvaliable}
            let allDetails = {...landDetails, ...landDetails2}
            detailsArr.push(allDetails);
        }
      }
      setLandDetailList(detailsArr);
      setLength(detailsArr.length)
      console.log(detailsArr)
    }

    getProperty();

  }, [reload])


  const markAvailableFunction = async (indx) =>{
      await contract.markMyPropertyAvailable(indx, {from: account});
      setReload(!reload);
      console.log(indx);
  }



  return (
    <div className='container proprt-container'>
      <div className='proprt-header'>
        <h1 className='proprt-title'>My Properties</h1>
        <p className='proprt-subtitle'>Blockchain Property Management</p>
        <div className='proprt-divider'></div>
      </div>

      {  
        (length == 0) ? 
        <div className="proprt-no-result-div">
          <div className="proprt-no-result-card">
            <div className="proprt-no-result-icon">🏠</div>
            <p className='proprt-no-result'>No properties found</p>
            <p className='proprt-no-result-subtitle'>Start by registering your first property on the blockchain</p>
          </div>
        </div>
        :
        <div className='proprt-properties-grid'>
          {landDetailList.map((details, index) =>{
            return(
              <DisplayPropertyDetails
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
                available = {details.isAvaliable}
                markAvailable = {markAvailableFunction}
              />
            )
          })}
        </div>
      } 
      
    </div>
  )
}

export default Property