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
    <div className='container registerHouse-maindiv'>
      <div className='row'>

         {/* left form */}
        <div className='col-12 col-sm-6'>
            <form method='POST' className='admin-form'>
                <div className='form-group'>
                    <label>County</label>
                    <input type="text" className="form-control" name="county" placeholder="Enter County" 
                    autoComplete="off" value={landDetails.county} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>Sub-County</label>
                    <input type="text" className="form-control" name="sub_county" placeholder="Enter Sub-County" 
                    autoComplete="off" value={landDetails.sub_county} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>City</label>
                    <input type="text" className="form-control" name="city" placeholder="Enter city" 
                    autoComplete="off" value={landDetails.city} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>Property ID</label>
                    <input type="number" className="form-control" name="propertyId" placeholder="Enter property ID" 
                    autoComplete="off" value={landDetails.propertyId} onChange={onChangeFunc}/>
                </div>
            </form>
        </div>

        {/* right form */}
        <div className='col-12 col-sm-6'>
          <form method='POST' className='admin-form'>
            <div className='form-group'>
                <label>Title Deed</label>
                <input type="number" className="form-control" name="deedNo" placeholder="Enter Title Deed" 
                autoComplete="off" value={landDetails.deedNo} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                <label>Owner Address</label>
                <input type="text" className="form-control" name="owner" placeholder="Enter owner address" 
                autoComplete="off" value={landDetails.owner} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                <label>Market Value</label>
                <input type="number" className="form-control" name="marketValue" placeholder="Enter market value" 
                autoComplete="off" value={landDetails.marketValue} onChange={onChangeFunc}/>
            </div>
            <div className='form-group'>
                <label>Size</label>
                <input type="number" className="form-control" name="size" placeholder="Enter size (sq. ft.)" 
                autoComplete="off" value={landDetails.size} onChange={onChangeFunc}/>
            </div>
          </form>
        </div>
      </div>
      <button className='admin-form-btn' onClick={handleOnClick}>Submit</button>
    </div>
  )
}

export default RegisterProperty