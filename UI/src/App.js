import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './progress-bar.css';
import img from './images/pot.png'

function MeasurementProgressBar({ value, caption, temperature, tempValue }) {
  return (
    <div>
      <CircularProgressbar
        value={value}
        text={temperature ? `${tempValue}°C` : `${value}%`}
        className="progress-bar"
        styles={buildStyles({})} />
      <p>{caption}</p>
    </div>
  );
}

const Image = () => {
  return (
    <img src= {img} alt="image" className="image" />
  );
};

const ProgressBars = () => {
const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="progress-bars">
      {!isPopupOpen && <img src= {img} alt="image" className="image" />}
      <MeasurementProgressBar value={75} caption="Light" />
      <MeasurementProgressBar value={25} caption="CO2" />
      <MeasurementProgressBar value={50} caption="Humidity" />
      <MeasurementProgressBar value={100} caption="Temperature" temperature tempValue={20} />
      <button
      className='button'
        onClick={() => {
          // When the button is clicked, toggle the state of the popup
          setIsPopupOpen(!isPopupOpen);
        }}
      >
        Controls
      </button>
      {/* Render the popup if it is open */}
      {isPopupOpen && (
        <div className="popup">
          <p>Popup content</p>
          <button
            onClick={() => {
              // When the close button is clicked, close the popup
              setIsPopupOpen(false);
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export { ProgressBars, Image };
export default ProgressBars;






