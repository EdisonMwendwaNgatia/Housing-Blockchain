import React from 'react'
import Navbar from './Navbar'
import { Routes, Route } from 'react-router-dom';
import RegisterProperty from './RegisterProperty';
import Explore from './Explore';

const Admin = (props) => {
  return (
    <>
    <Navbar isAdmin={true} />
    <Routes>
      <Route path='/' element={<RegisterProperty myWeb3Api={props.myWeb3Api} account={props.account} />} />
      <Route path='/explore' element={<Explore myWeb3Api={props.myWeb3Api} account={props.account} isAdmin={true} />} />
    </Routes>
    </>
  )
}

export default Admin