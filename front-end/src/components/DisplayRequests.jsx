import React from 'react'

const DisplayRequests = (props) => {
  return (
        <div className='explore-result'>
            <h4><b>Property ID: {props.propertyId}</b></h4>
            <p><b>Requested by:</b> {props.requester}</p>
            <p><b>Title Deed:</b> {props.deedNo}</p>
            <p><b>County:</b> {props.county}</p>
            <p><b>Sub-County:</b> {props.sub_county}</p>
            <p><b>City:</b> {props.city}</p>

            <button className='accept-req' onClick={() => {props.acceptReq(props.index, props.reqNo)}}><b>Accept Request</b></button>
        </div>
  )
}

export default DisplayRequests