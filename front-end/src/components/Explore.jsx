// explore.jsx
import React, { useEffect, useState } from 'react'
import '../css/Explore.css'
import DisplayExploreResult from './DisplayExploreResult';

const Explore = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [explore, setExplore] = useState({
    county:"", sub_county:"", city:"", deedNo:""
  })

  const [landDetail, setLandDetail] = useState({
    owner:"", propertyId:"", index:"", marketValue:"", sqft:""
  })

  const [didIRequested, setDidIRequested] = useState(false);
  const [available, setAvailable] = useState(false);
  const [noResult, setNoResult] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setExplore({...explore, [name]:value})
  }

  const handleOnClick = async () =>{
    setLoading(true);
    try {
      const landDetails = await contract.getHouseDetails(explore.county, explore.sub_county, explore.city, explore.deedNo, {
        from: account
      })

      const isAvaliable = await contract.isAvailable(explore.county, explore.sub_county, explore.city, explore.deedNo, {
        from: account
      })

      const owner = landDetails[0];
      const propertyId = landDetails[1].words[0]
      const index = landDetails[2].words[0]
      const marketValue = landDetails[3].words[0]
      const sqft = landDetails[4].words[0]
      const deedNo = explore.deedNo

      if(account === owner){
        setIsOwner(true)
      }
      else{
        setIsOwner(false);
        if(isAvaliable){
          const _didIRequested = await contract.didIRequested(explore.county, explore.sub_county, explore.city, explore.deedNo,{
            from: account
          })
          
          setDidIRequested(_didIRequested);
        }
      }

      setLandDetail({owner, propertyId, index, marketValue, sqft, deedNo})
      setAvailable(isAvaliable);
      setNoResult(1);
    } catch (error) {
      console.error("Error fetching land details:", error);
      setNoResult(1);
    } finally {
      setLoading(false);
    }
  }

  const requestForBuy = async () =>{
    try {
      await contract.RequestForBuy(explore.county, explore.sub_county, explore.city, explore.deedNo, {
        from: account
      })
      setDidIRequested(true);
    } catch (error) {
      console.error("Error requesting to buy:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOnClick();
  }

  useEffect(()=>{
    console.log(landDetail)
  }, [landDetail])

  
  return (
    <div className='container explore-maindiv'>
      <div className="explore-header">
        <h2>Explore Properties</h2>
        <p>Search for properties using location details and title deed number</p>
      </div>
      
      <div className="explore-card">
        <form method='POST' className='explore-form' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-12 col-sm-6'>
              <div className='form-group'>
                  <label>County</label>
                  <input type="text" className="form-control" name="county" placeholder="Enter County" 
                  autoComplete="off" value={explore.county} onChange={onChangeFunc}/>
              </div>
              <div className='form-group'>
                  <label>Sub-County</label>
                  <input type="text" className="form-control" name="sub_county" placeholder="Enter Sub-County" 
                  autoComplete="off" value={explore.sub_county} onChange={onChangeFunc}/>
              </div>
            </div>
            <div className='col-12 col-sm-6'>
              <div className='form-group'>
                  <label>City</label>
                  <input type="text" className="form-control" name="city" placeholder="Enter city" 
                  autoComplete="off" value={explore.city} onChange={onChangeFunc}/>
              </div>
              <div className='form-group'>
                  <label>Title deed</label>
                  <input type="text" className="form-control" name="deedNo" placeholder="Enter Title Deed" 
                  autoComplete="off" value={explore.deedNo} onChange={onChangeFunc}/>
              </div>
            </div>
          </div>
          <button className='explore-btn' type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Searching...
              </>
            ) : "Explore Properties"}
          </button>
        </form>
      </div>

      <DisplayExploreResult
          owner = {landDetail.owner}
          propertyId = {landDetail.propertyId}
          deedNo = {landDetail.deedNo}
          marketValue = {landDetail.marketValue}
          sqft = {landDetail.sqft}
          available = {available}
          isAdmin = {props.isAdmin}
          didIRequested = {didIRequested}
          requestForBuy = {requestForBuy}
          noResult = {noResult}
          isOwner = {isOwner}
      />
        
    </div>
  )
}

export default Explore