import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import emblem from '../images/emblem.svg'
import '../css/Navbar.css'

const Navbar = (props) => {

  const [isActive, setActive] = useState(true);

  const RenderMenu = () =>{

      return(
        (props.isAdmin) ? 
          <>
            <li className={(isActive) ? "knav-active knav-nav-item": "knav-nav-item"}>
                <NavLink className="knav-nav-link" exact activeClassName="knav-active" to="/admin/">
                  <span className="knav-link-text">Register House</span>
                  <span className="knav-sr-only">(current)</span>
                </NavLink>
            </li>
            <li className="knav-nav-item">
                <NavLink className="knav-nav-link" exact activeClassName="knav-active" to="/admin/explore" onClick={() => setActive(false)}>
                  <span className="knav-link-text">Explore</span>
                </NavLink>
            </li>
          </>
          :
          <>
            <li className={(isActive) ? "knav-active knav-nav-item": "knav-nav-item"}>
                <NavLink className="knav-nav-link" exact activeClassName="knav-active" to="/userprofile/">
                  <span className="knav-link-text">Profile</span>
                  <span className="knav-sr-only">(current)</span>
                </NavLink>
            </li>
            <li className="knav-nav-item">
                <NavLink className="knav-nav-link" exact activeClassName="knav-active" to="/userprofile/property" onClick={() => setActive(false)}>
                  <span className="knav-link-text">Property</span>
                </NavLink>
            </li>
            <li className="knav-nav-item">
                <NavLink className="knav-nav-link" exact activeClassName="knav-active" to="/userprofile/requests" onClick={() => setActive(false)}>
                  <span className="knav-link-text">Requests</span>
                </NavLink>
            </li>
            <li className="knav-nav-item">
                <NavLink className="knav-nav-link" exact activeClassName="knav-active" to="/userprofile/requested" onClick={() => setActive(false)}>
                  <span className="knav-link-text">Requested</span>
                </NavLink>
            </li>
            <li className="knav-nav-item">
                <NavLink className="knav-nav-link" exact activeClassName="knav-active" to="/userprofile/explore" onClick={() => setActive(false)}>
                  <span className="knav-link-text">Explore</span>
                </NavLink>
            </li>
          </>
      )
    }

  return (
    <div className="knav-navbar-wrapper">
        <nav className="knav-navbar knav-navbar-expand-lg knav-navbar-light knav-bg-light" >
            <div className="knav-brand-section">
              <NavLink to='/' className="knav-brand-link">
                  <img src={emblem} alt="emblem" className="knav-emblem"/>
                  <div className="knav-brand-info">
                    <span className="knav-brand-title">Crypto-Powered Affordable Housing</span>
                    <span className="knav-brand-subtitle">Blockchain System</span>
                  </div>
              </NavLink>
              <div className="knav-admin-badge">
                {props.isAdmin && (
                  <span className="knav-admin-label">
                    <span className="knav-admin-icon">⚡</span>
                    Admin Dashboard
                  </span>
                )}
              </div>
            </div>
            
            <button className="knav-navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="knav-navbar-toggler-icon"></span>
            </button>
            
            <div className="knav-collapse knav-navbar-collapse" id="navbarNav">
                <ul className="knav-navbar-nav knav-ml-auto">
                    <RenderMenu/>
                </ul>
            </div>
        </nav>
        <div className="knav-accent-line"></div>
    </div>
  )
}

export default Navbar