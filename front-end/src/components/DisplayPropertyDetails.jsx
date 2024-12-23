import React from 'react'

const DisplayPropertyDetails = (props) => {
  return (
    <>
    {
          <div className='explore-result'>
            <div className='row'>
              <div className='col-12 col-md-6'>
                <p><b>Owner:</b> {props.owner}</p>
                <p><b>Title Deed Number:</b> {props.deedNo}</p>
                <p><b>Property ID:</b> {props.propertyId}</p>
                <p><b>Market Value:</b> {props.marketValue}</p>
              </div>

              <div className='col-12 col-md-6'>
                <p><b>County:</b> {props.county}</p>
                <p><b>Sub-County:</b> {props.sub_county}</p>
                <p><b>City:</b> {props.city}</p>
                <p><b>Size:</b> {props.sqft} sq. ft.</p>
              </div>
            </div>
            {
            (props.available) ? 
              <button className='marked-available'><b>Marked Available</b></button>
              :
              <button className='mark-available-btn' onClick={() => {props.markAvailable(props.index)}} ><b>Mark Available</b></button>
            }
          </div> 
    }
    </>
  )
}

export default DisplayPropertyDetails