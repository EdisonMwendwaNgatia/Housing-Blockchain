import React, { useState } from 'react'
import '../css/RegisterProperty.css'

const RegisterProperty = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  
  const [landDetails, setLandDetials] = useState({
    county:"", sub_county:"", city:"", propertyId:"", deedNo:"", owner:"", marketValue:"", size:""
  }) 

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setLandDetials({...landDetails, [name]:value});
  }

  const handleOnClick = async () =>{
    await contract.registerHouse(landDetails.county, landDetails.sub_county, landDetails.city, landDetails.propertyId, landDetails.deedNo, landDetails.owner, landDetails.marketValue, landDetails.size, {
      from: account
    })
    console.log(landDetails)
    setLandDetials({county:"", sub_county:"", city:"", propertyId:"", deedNo:"", owner:"", marketValue:"", size:""})
  }

  return (
    <div className='container regp-registerHouse-maindiv'>
      <div className='regp-page-header'>
        <div className='regp-header-content'>
          <h1 className='regp-page-title'>Property Registration</h1>
          <p className='regp-page-subtitle'>Secure Blockchain Property Registration System</p>
        </div>
        <div className='regp-blockchain-pattern'></div>
      </div>

      <div className='regp-form-wrapper'>
        <div className='regp-form-container'>
          <div className='regp-section-header'>
            <div className='regp-icon-wrapper'>
              <span className='regp-property-icon'>🏠</span>
            </div>
            <h2 className='regp-form-title'>Register New Property</h2>
            <div className='regp-title-divider'></div>
          </div>

          <div className='row regp-form-row'>
            {/* Left Form Section */}
            <div className='col-12 col-sm-6 regp-form-column'>
              <div className='regp-form-section'>
                <h3 className='regp-section-title'>Location Details</h3>
                <form method='POST' className='regp-admin-form'>
                  <div className='regp-form-group'>
                    <label className='regp-form-label'>County</label>
                    <div className='regp-input-wrapper'>
                      <input 
                        type="text" 
                        className="regp-form-control" 
                        name="county" 
                        placeholder="Enter County" 
                        autoComplete="off" 
                        value={landDetails.county} 
                        onChange={onChangeFunc}
                      />
                    </div>
                  </div>
                  
                  <div className='regp-form-group'>
                    <label className='regp-form-label'>Sub-County</label>
                    <div className='regp-input-wrapper'>
                      <input 
                        type="text" 
                        className="regp-form-control" 
                        name="sub_county" 
                        placeholder="Enter Sub-County" 
                        autoComplete="off" 
                        value={landDetails.sub_county} 
                        onChange={onChangeFunc}
                      />
                    </div>
                  </div>
                  
                  <div className='regp-form-group'>
                    <label className='regp-form-label'>City</label>
                    <div className='regp-input-wrapper'>
                      <input 
                        type="text" 
                        className="regp-form-control" 
                        name="city" 
                        placeholder="Enter city" 
                        autoComplete="off" 
                        value={landDetails.city} 
                        onChange={onChangeFunc}
                      />
                    </div>
                  </div>
                  
                  <div className='regp-form-group'>
                    <label className='regp-form-label'>Property ID</label>
                    <div className='regp-input-wrapper'>
                      <input 
                        type="number" 
                        className="regp-form-control" 
                        name="propertyId" 
                        placeholder="Enter property ID" 
                        autoComplete="off" 
                        value={landDetails.propertyId} 
                        onChange={onChangeFunc}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Form Section */}
            <div className='col-12 col-sm-6 regp-form-column'>
              <div className='regp-form-section'>
                <h3 className='regp-section-title'>Property Details</h3>
                <form method='POST' className='regp-admin-form'>
                  <div className='regp-form-group'>
                    <label className='regp-form-label'>Title Deed</label>
                    <div className='regp-input-wrapper'>
                      <input 
                        type="number" 
                        className="regp-form-control" 
                        name="deedNo" 
                        placeholder="Enter Title Deed Number" 
                        autoComplete="off" 
                        value={landDetails.deedNo} 
                        onChange={onChangeFunc}
                      />
                    </div>
                  </div>
                  
                  <div className='regp-form-group'>
                    <label className='regp-form-label'>Owner Address</label>
                    <div className='regp-input-wrapper'>
                      <input 
                        type="text" 
                        className="regp-form-control" 
                        name="owner" 
                        placeholder="Enter owner wallet address" 
                        autoComplete="off" 
                        value={landDetails.owner} 
                        onChange={onChangeFunc}
                      />
                    </div>
                  </div>
                  
                  <div className='regp-form-group'>
                    <label className='regp-form-label'>Market Value (KSH)</label>
                    <div className='regp-input-wrapper'>
                      <input 
                        type="number" 
                        className="regp-form-control" 
                        name="marketValue" 
                        placeholder="Enter market value" 
                        autoComplete="off" 
                        value={landDetails.marketValue} 
                        onChange={onChangeFunc}
                      />
                    </div>
                  </div>
                  
                  <div className='regp-form-group'>
                    <label className='regp-form-label'>Size (sq. ft.)</label>
                    <div className='regp-input-wrapper'>
                      <input 
                        type="number" 
                        className="regp-form-control" 
                        name="size" 
                        placeholder="Enter property size" 
                        autoComplete="off" 
                        value={landDetails.size} 
                        onChange={onChangeFunc}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='regp-submit-section'>
            <button className='regp-admin-form-btn' onClick={handleOnClick}>
              <span className='regp-btn-icon'>📝</span>
              <span className='regp-btn-text'>Register Property</span>
              <span className='regp-btn-arrow'>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterProperty