import React, { useState, useContext, useRef, useEffect } from 'react';

import './FilterModal.scss';

import { ReactComponent as CloseIcon } from '../assets/close-icon.svg';
import { ReactComponent as BackArrow } from '../assets/back-arrow.svg';

import MethodOptions from '../components/filterModal/MethodOptions';
import AmountOptions from '../components/filterModal/AmountOptions';
import HopsOptions from '../components/filterModal/HopsOptions';
import MaltsOptions from '../components/filterModal/MaltsOptions';

import { AppContext } from '../context/AppContext';

const FilterModal = ({ setFilterModalOpen }) => {
  const context = useContext(AppContext);

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [matchesCount, setMatchesCount] = useState(0);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const inputMinRef = useRef(null);
  const inputMaxRef = useRef(null);
  const lastFocusedInputRef = useRef(null);


  // function matchesFilterRange(value) {
  //   if (value >= minValue && value <= maxValue) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }



  const HeaderSection = () => {
    const CloseButton = () => {
      return (
        <div className="closeButton" onClick={() => setFilterModalOpen(false)}>
          <CloseIcon />
        </div>
      );
    };

    const BackButton = () => {
      return (
        <div className="backButton" onClick={() => {
          setSelectedValue(null);
          setSelectedTitle(null);
        }}>
          <BackArrow />
        </div>
      );
    };

    return (
      <div className='headerSection'>
        {selectedValue && selectedTitle &&
          <BackButton />
        }
        <h2>Filter by</h2>
        {selectedValue && selectedTitle &&
          <button onClick={() => {
            setSelectedValue(null)
            setSelectedTitle(null)
          }}>{selectedTitle}</button>
        }
        <CloseButton />
      </div>
    );
  }

  const FilterOptions = () => {
    return (
      <div className='filterOptions'>
        <div className='flex-container'>
          <div className='method-amount-options'>
            <MethodOptions setSelectedTitle={setSelectedTitle} setSelectedValue={setSelectedValue} />
            <AmountOptions setSelectedTitle={setSelectedTitle} setSelectedValue={setSelectedValue} />
          </div>
          <div className='hops-malts-options'>
            <HopsOptions setSelectedTitle={setSelectedTitle} setSelectedValue={setSelectedValue} />
            <MaltsOptions setSelectedTitle={setSelectedTitle} setSelectedValue={setSelectedValue} />
          </div>
        </div>
      </div>
    );
  }

  const RangeSelector = () => {
    return (
      <div className={`rangeSelector ${selectedValue ? "open" : ""}`}>


        <div className='header'>
          <h2>Filter by</h2>
          <button onClick={() => {
            setSelectedValue(null)
            setSelectedTitle(null)
          }}>{selectedTitle}</button>
        </div>

        <div className="rangeFields">
          <input
            type="text"
            placeholder="From"
            value={minValue}
          />
          <span> - </span>
          <input
            type="text"
            placeholder="To"
            value={maxValue}
          />
        </div>

        <button className='resultsButton' onClick={() => { }}>Show results</button>
      </div>
    );
  }

  return (
    <div className="filterModal">
      <HeaderSection />
      {(selectedValue && selectedTitle) ? (
        <RangeSelector />
      ) : (
        <FilterOptions />
      )}
    </div >
  );
}


export default FilterModal;
