// DisplayExploreResult.jsx
import React from 'react'

const DisplayExploreResult = (props) => {
  const resultContainerStyle = {
    marginTop: '2rem',
    width: '100%',
    background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
    border: '1px solid #444',
    padding: '1.5rem',
    borderRadius: '12px',
    color: 'white',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
  };

  const resultTextStyle = {
    marginBottom: '1rem',
    fontSize: '1.1rem',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #333',
    paddingBottom: '0.5rem'
  };

  const labelStyle = {
    color: '#1ac71a',
    minWidth: '150px'
  };

  const noResultStyle = {
    marginTop: '2rem',
    color: 'white',
    textAlign: 'center',
    padding: '3rem',
    background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
    borderRadius: '12px',
    border: '1px solid #444'
  };

  const noResultTextStyle = {
    fontSize: '2rem',
    color: '#ff4d4d',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    border: 'none',
    outline: 'none',
    padding: '0.75rem',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1.1rem',
    marginTop: '1rem',
    transition: 'all 0.3s ease'
  };

  const markedSaleStyle = {
    ...buttonStyle,
    backgroundColor: '#1ac71a',
    boxShadow: '0 4px 10px rgba(26, 199, 26, 0.3)'
  };

  const buyButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(145deg, #1ac71a, #18a518)',
    boxShadow: '0 4px 15px rgba(26, 199, 26, 0.3)',
    cursor: 'pointer'
  };

  const buyButtonHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 20px rgba(26, 199, 26, 0.4)',
    background: 'linear-gradient(145deg, #1edc1e, #1ac71a)'
  };

  const pendingStyle = {
    ...buttonStyle,
    backgroundColor: '#2a8a2a',
    boxShadow: '0 4px 10px rgba(42, 138, 42, 0.3)'
  };

  const noSaleStyle = {
    ...buttonStyle,
    background: 'linear-gradient(145deg, #ff3333, #cc0000)',
    boxShadow: '0 4px 10px rgba(255, 51, 51, 0.3)'
  };

  const noSaleHoverStyle = {
    background: 'linear-gradient(145deg, #ff4d4d, #ff3333)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 20px rgba(255, 51, 51, 0.4)'
  };

  const [buttonHover, setButtonHover] = React.useState(false);

  return (
    <>
    {
        (props.propertyId != 0) ?   // propertyId != 0 means we got a result while exploring.
          (
            <div style={resultContainerStyle}>
              <p style={resultTextStyle}><b style={labelStyle}>Owner:</b> {props.owner}</p>
              <p style={resultTextStyle}><b style={labelStyle}>Title Deed:</b> {props.deedNo}</p>
              <p style={resultTextStyle}><b style={labelStyle}>Property ID:</b> {props.propertyId}</p>
              <p style={resultTextStyle}><b style={labelStyle}>Market Value:</b> {props.marketValue}</p>
              <p style={{...resultTextStyle, borderBottom: 'none'}}><b style={labelStyle}>Size:</b> {props.sqft} sq. ft.</p>

              {
              (props.available) ?  // if house is marked for sale.
                (
                  (props.isAdmin || props.isOwner) ?  // isOwner means "is Owner exploring its own house?"
                    (
                      // if owner is exploring its own house, then, owner CANNOT request its own house, hence "Marked for sale" will be displayed only.
                      <button style={markedSaleStyle}><b>Marked for sale</b></button>
                    )
                    :
                    (
                      // if owner is exploring other's house, then owner can request to buy other's house, hence "Request for buy" can be displayed on button.
                      (props.didIRequested) ? 
                      <button style={pendingStyle}><b>Request Pending</b></button>
                      :
                      <button 
                        style={{
                          ...buyButtonStyle,
                          ...(buttonHover ? buyButtonHoverStyle : {})
                        }}
                        onClick={props.requestForBuy}
                        onMouseEnter={() => setButtonHover(true)}
                        onMouseLeave={() => setButtonHover(false)}
                      >
                        <b>Request for buy</b>
                      </button>
                    )
                )
                :
                <button 
                  style={{
                    ...noSaleStyle,
                    ...(buttonHover ? noSaleHoverStyle : {})
                  }}
                  onMouseEnter={() => setButtonHover(true)}
                  onMouseLeave={() => setButtonHover(false)}
                >
                  <b>Not for sale</b>
                </button>
              }

            </div> 
          )
          :
          (
            (props.noResult) ? 
              <div style={noResultStyle}>
                <p style={noResultTextStyle}>No result found :(</p>
                <p>Please check your search criteria and try again</p>
              </div>
              :
              <></>
          )
    }
    </>
  )
}

export default DisplayExploreResult