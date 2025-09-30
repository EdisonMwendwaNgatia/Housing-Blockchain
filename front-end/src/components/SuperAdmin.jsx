import React, { useEffect, useState } from 'react'
import emblem from '../images/emblem.svg'
import '../css/SuperAdmin.css'
import { NavLink } from 'react-router-dom';

const SuperAdmin = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  
  const [adminData, setAdminData] = useState({
    address:"", county:"", sub_county:"", city:""
  });

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setAdminData({...adminData, [name]:value});
  }

  const handleSubmit = async () =>{
    await contract.addAdmin(adminData.address, adminData.county, adminData.sub_county, adminData.city, {
      from: account
    })

    console.log('admin details submitted');
    setAdminData({address:"", county:"", sub_county:"", city:""});
  }


  return (
    <div className='container supad-superAdmin-mainDiv'>
      <div className='supad-superAdmin-header'>
        <div className='supad-superAdmin-heading-div'>
          <NavLink to='/' className='supad-emblem-link'>
            <img src={emblem} alt="emblem" className="supad-emblem" />
          </NavLink>
          <div className='supad-header-content'>
            <h1>Super Admin</h1>
            <p className='supad-header-subtitle'>Blockchain Administration Portal</p>
          </div>
        </div>
        <div className='supad-blockchain-accent'></div>
      </div>

      <div className='supad-admin-section'>
        <div className='supad-section-header'>
          <h2 className='supad-superAdmin-p'>Add New Administrator</h2>
          <div className='supad-section-divider'></div>
        </div>

        <div className='supad-form-container'>
          <form method='POST' className='supad-admin-form'>
            <div className='supad-form-group'>
              <label>Admin Address</label>
              <div className='supad-input-wrapper'>
                <input 
                  type="text" 
                  className="supad-form-control" 
                  name="address" 
                  placeholder="Enter admin address" 
                  autoComplete="off" 
                  value={adminData.address} 
                  onChange={onChangeFunc}
                />
              </div>
            </div>
            
            <div className='supad-form-group'>
              <label>County</label>
              <div className='supad-input-wrapper'>
                <input 
                  type="text" 
                  className="supad-form-control" 
                  name="county" 
                  placeholder="Enter county" 
                  autoComplete="off" 
                  value={adminData.county} 
                  onChange={onChangeFunc}
                />
              </div>
            </div>
            
            <div className='supad-form-group'>
              <label>Sub-County</label>
              <div className='supad-input-wrapper'>
                <input 
                  type="text" 
                  className="supad-form-control" 
                  name="sub_county" 
                  placeholder="Enter Sub-county" 
                  autoComplete="off" 
                  value={adminData.sub_county} 
                  onChange={onChangeFunc}
                />
              </div>
            </div>
            
            <div className='supad-form-group'>
              <label>City</label>
              <div className='supad-input-wrapper'>
                <input 
                  type="text" 
                  className="supad-form-control" 
                  name="city" 
                  placeholder="Enter city" 
                  autoComplete="off" 
                  value={adminData.city} 
                  onChange={onChangeFunc}
                />
              </div>
            </div>
          </form>
          
          <div className='supad-button-container'>
            <button className='supad-admin-form-btn' onClick={handleSubmit}>
              <span className='supad-btn-text'>Add Administrator</span>
              <span className='supad-btn-icon'>⚡</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdmin