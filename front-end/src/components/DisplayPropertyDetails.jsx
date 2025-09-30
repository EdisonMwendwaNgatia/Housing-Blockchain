import React, { useEffect } from 'react'

const DisplayPropertyDetails = (props) => {

  // Embedded CSS styles
  const styles = `
    .propdt-explore-result {
      background: rgba(16, 185, 129, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 20px;
      padding: 2.5rem;
      margin-bottom: 2rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .propdt-explore-result:hover {
      transform: translateY(-5px);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
      border-color: rgba(16, 185, 129, 0.4);
    }

    .propdt-explore-result::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
      transition: left 0.5s;
    }

    .propdt-explore-result:hover::before {
      left: 100%;
    }

    .propdt-property-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid rgba(16, 185, 129, 0.2);
      position: relative;
      z-index: 2;
    }

    .propdt-property-icon {
      font-size: 2.5rem;
      color: #10b981;
      margin-right: 1rem;
      animation: propdt-float 3s ease-in-out infinite;
    }

    @keyframes propdt-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    .propdt-property-title {
      font-size: 1.5rem;
      color: #d1fae5;
      font-weight: 600;
      margin: 0;
      text-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
    }

    .propdt-property-id {
      font-size: 0.9rem;
      color: rgba(209, 250, 229, 0.7);
      background: rgba(16, 185, 129, 0.2);
      padding: 0.3rem 1rem;
      border-radius: 20px;
      font-weight: 500;
    }

    .propdt-row {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      margin-bottom: 2rem;
      position: relative;
      z-index: 2;
    }

    .propdt-col {
      flex: 1;
      min-width: 280px;
    }

    .propdt-detail-group {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      padding: 1.5rem;
      border: 1px solid rgba(16, 185, 129, 0.1);
      transition: all 0.3s ease;
    }

    .propdt-detail-group:hover {
      background: rgba(0, 0, 0, 0.3);
      border-color: rgba(16, 185, 129, 0.3);
      transform: translateX(5px);
    }

    .propdt-detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(16, 185, 129, 0.1);
    }

    .propdt-detail-item:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }

    .propdt-detail-label {
      font-weight: 600;
      color: #a7f3d0;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      min-width: 120px;
    }

    .propdt-detail-value {
      color: #ffffff;
      font-weight: 500;
      font-size: 1rem;
      text-align: right;
      word-break: break-all;
      max-width: 200px;
    }

    .propdt-detail-value.propdt-highlight {
      color: #34d399;
      font-weight: 700;
    }

    .propdt-button-container {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
      position: relative;
      z-index: 2;
    }

    .propdt-marked-available {
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      color: #ffffff;
      border: none;
      padding: 1rem 2.5rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: default;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      position: relative;
      overflow: hidden;
    }

    .propdt-marked-available::before {
      content: '✓ ';
      margin-right: 0.5rem;
      font-size: 1.2rem;
    }

    .propdt-mark-available-btn {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%);
      color: #ffffff;
      border: none;
      padding: 1rem 2.5rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
      position: relative;
      overflow: hidden;
    }

    .propdt-mark-available-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .propdt-mark-available-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(220, 38, 38, 0.4);
      background: linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%);
    }

    .propdt-mark-available-btn:hover::before {
      left: 100%;
    }

    .propdt-mark-available-btn:active {
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
    }

    .propdt-status-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1.2rem;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .propdt-status-available {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 2px solid rgba(16, 185, 129, 0.4);
    }

    .propdt-status-unavailable {
      background: rgba(220, 38, 38, 0.2);
      color: #f87171;
      border: 2px solid rgba(220, 38, 38, 0.4);
    }

    .propdt-blockchain-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #059669, #10b981, #34d399, #06d6a0);
      background-size: 400% 400%;
      animation: propdt-gradient-shift 3s ease infinite;
    }

    @keyframes propdt-gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* Responsive Design */
    @media screen and (max-width: 768px) {
      .propdt-explore-result {
        padding: 2rem 1.5rem;
      }
      
      .propdt-row {
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .propdt-col {
        min-width: unset;
      }
      
      .propdt-property-header {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
      
      .propdt-detail-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .propdt-detail-value {
        text-align: left;
        max-width: unset;
      }
      
      .propdt-mark-available-btn, .propdt-marked-available {
        padding: 0.8rem 2rem;
        font-size: 0.9rem;
      }
    }

    @media screen and (max-width: 400px) {
      .propdt-explore-result {
        padding: 1.5rem 1rem;
      }
      
      .propdt-detail-group {
        padding: 1rem;
      }
      
      .propdt-property-icon {
        font-size: 2rem;
      }
      
      .propdt-property-title {
        font-size: 1.3rem;
      }
    }
  `;

  useEffect(() => {
    // Inject styles only once when component mounts
    const existingStyle = document.querySelector('#propdt-styles');
    if (!existingStyle) {
      const styleSheet = document.createElement("style");
      styleSheet.id = 'propdt-styles';
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }
  }, []);

  return (
    <>
      <div className='propdt-explore-result'>
        <div className='propdt-blockchain-accent'></div>
        
        <div className='propdt-property-header'>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div className='propdt-property-icon'>🏠</div>
            <div>
              <h3 className='propdt-property-title'>Property #{props.propertyId}</h3>
              <span className={`propdt-status-badge ${props.available ? 'propdt-status-available' : 'propdt-status-unavailable'}`}>
                {props.available ? '● Available' : '● Not Listed'}
              </span>
            </div>
          </div>
          <div className='propdt-property-id'>
            Deed #{props.deedNo}
          </div>
        </div>

        <div className='propdt-row'>
          <div className='propdt-col'>
            <div className='propdt-detail-group'>
              <div className='propdt-detail-item'>
                <span className='propdt-detail-label'>Owner</span>
                <span className='propdt-detail-value'>{props.owner}</span>
              </div>
              <div className='propdt-detail-item'>
                <span className='propdt-detail-label'>Title Deed</span>
                <span className='propdt-detail-value propdt-highlight'>{props.deedNo}</span>
              </div>
              <div className='propdt-detail-item'>
                <span className='propdt-detail-label'>Property ID</span>
                <span className='propdt-detail-value'>{props.propertyId}</span>
              </div>
              <div className='propdt-detail-item'>
                <span className='propdt-detail-label'>Market Value</span>
                <span className='propdt-detail-value propdt-highlight'>${props.marketValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className='propdt-col'>
            <div className='propdt-detail-group'>
              <div className='propdt-detail-item'>
                <span className='propdt-detail-label'>County</span>
                <span className='propdt-detail-value'>{props.county}</span>
              </div>
              <div className='propdt-detail-item'>
                <span className='propdt-detail-label'>Sub-County</span>
                <span className='propdt-detail-value'>{props.sub_county}</span>
              </div>
              <div className='propdt-detail-item'>
                <span className='propdt-detail-label'>City</span>
                <span className='propdt-detail-value'>{props.city}</span>
              </div>
              <div className='propdt-detail-item'>
                <span className='propdt-detail-label'>Size</span>
                <span className='propdt-detail-value propdt-highlight'>{props.sqft.toLocaleString()} sq. ft.</span>
              </div>
            </div>
          </div>
        </div>

        <div className='propdt-button-container'>
          {
            (props.available) ? 
              <button className='propdt-marked-available'><b>Listed on Marketplace</b></button>
              :
              <button className='propdt-mark-available-btn' onClick={() => {props.markAvailable(props.index)}} >
                <b>List on Marketplace</b>
              </button>
          }
        </div>
      </div>
    </>
  )
}

export default DisplayPropertyDetails