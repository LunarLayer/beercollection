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

  function ApplyFilter() {
    let minValue = document.getElementById('minValueInput').value;
    let maxValue = document.getElementById('maxValueInput').value;

    if (minValue && maxValue && selectedTitle) {
      const newFilter = { filterTitle: selectedTitle, filterValue: selectedValue, minValue: minValue, maxValue: maxValue };
      context.addFilter(newFilter);
    }
  }

  const HeaderSection = () => {
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

    const CloseButton = () => {
      return (
        <div className="closeButton" onClick={() => setFilterModalOpen(false)}>
          <CloseIcon />
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
          <button className="selectedItemButton" onClick={() => {
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
        <div className="flex-container">
          <input
            id="minValueInput"
            type="text"
            placeholder="From"
          />
          <span> - </span>
          <input
            id="maxValueInput"
            type="text"
            placeholder="To"
          />
        </div>
        <button className='applyFilterButton' onClick={() => {
          ApplyFilter();
          setFilterModalOpen(false);
        }}>Apply filter</button>
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
