import React, { useEffect, useState } from 'react'
import '../css/Profile.css'

const Profile = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [userInfo, setUserInfo] = useState({
    address:"", fullName:"", gender:"", email:"", contact:"", residential_addr:""
  })

  const [update, setUpdate] = useState(false);

  const handleUpdate = async () =>{

    await contract.setUserProfile(userInfo.fullName, userInfo.gender, userInfo.email, userInfo.contact, userInfo.residential_addr, {
      from: account});

    console.log(userInfo);
    setUpdate(false);
  }

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setUserInfo({...userInfo, [name]:value})
  }

  useEffect(() => {

    const getUserInfo = async() =>{
      const response = await contract.getUserProfile({from: account});

      setUserInfo({
        address: account, 
        fullName: (response[0]) ? response[0] : "NA", 
        gender: (response[1]) ? response[1] : "NA", 
        email: (response[2]) ? response[2] : "NA", 
        contact: (response[3].words[0]) ? response[3].words[0] : "NA", 
        residential_addr: (response[4]) ? response[4] : "NA"
      });
    }

    getUserInfo();
  }, [])

  return (
    <div className='container profl-profile-main-div explore-maindiv'>
      
      <div className='profl-profile-header'>
        <div className='profl-header-content'>
          <h1 className='profl-profile-title'>User Profile</h1>
          <p className='profl-profile-subtitle'>Manage your blockchain identity</p>
        </div>
        <div className='profl-profile-accent'></div>
      </div>

      {(update) ? 
      
        <>
          <div className='profl-edit-container'>
            <div className='profl-edit-header'>
              <h2>Edit Profile Information</h2>
              <div className='profl-edit-divider'></div>
            </div>

            <div className='profl-form-section'>
              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <div className='profl-form-column'>
                    <form method='POST' className='profl-admin-form'>
                      <div className='profl-form-group'>
                          <label className='profl-form-label'>Full Name</label>
                          <div className='profl-input-wrapper'>
                            <input 
                              type="text" 
                              className="profl-form-control" 
                              name="fullName" 
                              placeholder="Enter full name" 
                              autoComplete="off" 
                              value={userInfo.fullName} 
                              onChange={onChangeFunc}
                            />
                          </div>
                      </div>
                      <div className='profl-form-group'>
                          <label className='profl-form-label'>Gender</label>
                          <div className='profl-select-wrapper'>
                            <select 
                              className='profl-select-gender' 
                              name='gender' 
                              defaultValue={userInfo.gender} 
                              onChange={onChangeFunc}
                            >
                              <option value="NA">Not Specified</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="I prefer not to say">Prefer not to say</option>
                            </select>
                          </div>
                      </div>
                      <div className='profl-form-group'>
                          <label className='profl-form-label'>Email Address</label>
                          <div className='profl-input-wrapper'>
                            <input 
                              type="email" 
                              className="profl-form-control" 
                              name="email" 
                              placeholder="Enter email address" 
                              autoComplete="off" 
                              value={userInfo.email} 
                              onChange={onChangeFunc}
                            />
                          </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-12 col-sm-6'>
                  <div className='profl-form-column'>
                    <form method='POST' className='profl-admin-form'>
                      <div className='profl-form-group'>
                          <label className='profl-form-label'>Contact Number</label>
                          <div className='profl-input-wrapper'>
                            <input 
                              type="number" 
                              className="profl-form-control" 
                              name="contact" 
                              placeholder="Enter contact number" 
                              autoComplete="off" 
                              value={userInfo.contact} 
                              onChange={onChangeFunc}
                            />
                          </div>
                      </div>
                      <div className='profl-form-group'>
                          <label className='profl-form-label'>Residential Address</label>
                          <div className='profl-input-wrapper'>
                            <input 
                              type="text" 
                              className="profl-form-control" 
                              name="residential_addr" 
                              placeholder="Enter residential address" 
                              autoComplete="off" 
                              value={userInfo.residential_addr} 
                              onChange={onChangeFunc}
                            />
                          </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='profl-action-buttons'>
              <button className='profl-cancel-btn' onClick={() => {setUpdate(false)}}>
                Cancel
              </button>
              <button className='profl-update-btn' onClick={handleUpdate}>
                <span className='profl-btn-text'>Confirm Update</span>
                <span className='profl-btn-icon'>✓</span>
              </button>
            </div>
          </div>
        </>
      
        :

        <>
          <div className='profl-view-container'>
            <div className='profl-view-header'>
              <h2>Profile Information</h2>
              <div className='profl-view-divider'></div>
            </div>

            <div className='profl-info-grid'>
              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <div className='profl-info-column'>
                    <div className='profl-info-item'>
                      <label className='profl-info-label'><b>Owner Address</b></label>
                      <p className='profl-info-value profl-address'>{userInfo.address}</p>
                    </div>

                    <div className='profl-info-item'>
                      <label className='profl-info-label'><b>Full Name</b></label>
                      <p className='profl-info-value'>{userInfo.fullName}</p>
                    </div>

                    <div className='profl-info-item'>
                      <label className='profl-info-label'><b>Gender</b></label>
                      <p className='profl-info-value'>{userInfo.gender}</p>
                    </div>
                  </div>
                </div>

                <div className='col-12 col-sm-6'>
                  <div className='profl-info-column'>
                    <div className='profl-info-item'>
                      <label className='profl-info-label'><b>Email Address</b></label>
                      <p className='profl-info-value'>{userInfo.email}</p>
                    </div>

                    <div className='profl-info-item'>
                      <label className='profl-info-label'><b>Contact Number</b></label>
                      <p className='profl-info-value'>{userInfo.contact}</p>
                    </div>

                    <div className='profl-info-item'>
                      <label className='profl-info-label'><b>Residential Address</b></label>
                      <p className='profl-info-value'>{userInfo.residential_addr}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='profl-action-buttons'>
              <button className='profl-update-btn profl-primary' onClick={() => {setUpdate(true)}}>
                <span className='profl-btn-text'>Update Profile</span>
                <span className='profl-btn-icon'>✎</span>
              </button>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Profile