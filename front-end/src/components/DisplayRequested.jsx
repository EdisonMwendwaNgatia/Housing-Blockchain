import React from 'react'

const DisplayRequested = (props) => {
  
  const exploreResultStyle = {
    background: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    borderRadius: '20px',
    padding: '2.5rem',
    margin: '1rem 0',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const exploreResultHoverStyle = {
    ...exploreResultStyle,
    transform: 'translateY(-5px)',
    boxShadow: '0 25px 50px rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.4)'
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '2rem'
  };

  const colStyle = {
    flex: '1',
    minWidth: '300px',
    padding: '0 1rem'
  };

  const paragraphStyle = {
    color: '#e5e7eb',
    fontSize: '1rem',
    marginBottom: '1rem',
    lineHeight: '1.6',
    transition: 'color 0.3s ease'
  };

  const boldStyle = {
    color: '#34d399',
    fontWeight: '600',
    textShadow: '0 1px 2px rgba(52, 211, 153, 0.3)'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '1rem 2.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '50px',
    cursor: 'default',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'supad-pulse 2s infinite'
  };

  const [isHovered, setIsHovered] = React.useState(false);

  // Add keyframe animation style
  const keyframesStyle = `
    @keyframes supad-pulse {
      0%, 100% { 
        box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
      }
      50% { 
        box-shadow: 0 15px 35px rgba(245, 158, 11, 0.6);
      }
    }
  `;

  React.useEffect(() => {
    // Inject keyframes into document head
    const style = document.createElement('style');
    style.textContent = keyframesStyle;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Responsive styles
  const mediaQueryStyle = `
    @media screen and (max-width: 768px) {
      .supad-col {
        flex: 100%;
        min-width: auto;
        padding: 0 0.5rem;
      }
      .supad-explore-result {
        padding: 1.5rem;
        margin: 0.5rem 0;
      }
      .supad-button {
        padding: 0.8rem 2rem;
        font-size: 0.9rem;
      }
    }
  `;

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = mediaQueryStyle;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
        <div 
          className='supad-explore-result'
          style={isHovered ? exploreResultHoverStyle : exploreResultStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className='supad-row' style={rowStyle}>
            <div className='supad-col' style={colStyle}>
                <p style={paragraphStyle}>
                  <span style={boldStyle}>Owner:</span> {props.owner}
                </p>
                <p style={paragraphStyle}>
                  <span style={boldStyle}>Deed Number:</span> {props.deedNo}
                </p>
                <p style={paragraphStyle}>
                  <span style={boldStyle}>Property ID:</span> {props.propertyId}
                </p>
                <p style={paragraphStyle}>
                  <span style={boldStyle}>Market Value:</span> ${props.marketValue.toLocaleString()}
                </p>
              </div>
              <div className='supad-col' style={colStyle}>
                <p style={paragraphStyle}>
                  <span style={boldStyle}>Size:</span> {props.sqft.toLocaleString()} sq. ft.
                </p>
                <p style={paragraphStyle}>
                  <span style={boldStyle}>County:</span> {props.county}
                </p>
                <p style={paragraphStyle}>
                  <span style={boldStyle}>Sub-County:</span> {props.sub_county}
                </p>
                <p style={paragraphStyle}>
                  <span style={boldStyle}>City:</span> {props.city}
                </p>
            </div>
          </div>

            <button 
              className='supad-no-sale supad-button' 
              style={buttonStyle}
            >
              <b>⏳ Request Pending</b>
            </button>
        </div>
    </>
  )
}

export default DisplayRequested