import React, { useContext } from 'react';

import './TableRow.scss';

import { ReactComponent as ExpandUpIcon } from '../assets/expand-up-icon.svg';
import { ReactComponent as ExpandDownIcon } from '../assets/expand-down-icon.svg';
import { ReactComponent as BeerglassIcon } from '../assets/beer-icon.svg';

import { AppContext } from '../context/AppContext';

const TableRow = ({ beer, expanded, toggleDetails, setSelectedView }) => {
  const context = useContext(AppContext);

  const ExpandIcon = () => {
    if (expanded) {
      return (
        <div className="expandUpIcon">
          <ExpandUpIcon />
        </div>
      );
    } else {
      return (
        <div className="expandDownIcon">
          <ExpandDownIcon />
        </div>
      );
    }
  }



  return (
    <>
      <tr className={`table-row ${expanded ? "open" : ""}`} onClick={() => toggleDetails(beer.id)}>
        <td>{beer.name}</td>
        <td>{beer.first_brewed}</td>
        <td className='hideOnMobile'><button>Rating</button></td>
        <td className='hideOnMobile'><button>1 Comment</button></td>
        <td className='details'>
          <div className='details-wrapper'>
            <button onClick={() => {
              context.sortBeers("setBeerFirstInArray", "", beer.id)
              setSelectedView('showcase');
            }}>Details
            </button>
            <ExpandIcon />
          </div>
        </td>
      </tr>
      <tr className="collapsible-table-row">
        <td colSpan={5} onClick={() => toggleDetails(beer.id)}>
          <div className='flex-container'>
            <div>
              <strong>ABV: </strong>{beer.abv}
              <br />
              <strong>IBU: </strong>{beer.ibu}
            </div>
            <div>
              <strong>EBC: </strong>{beer.ebc}
              <br />
              <strong>SRM: </strong>{beer.srm}
            </div>
            <div>
              <strong>pH: </strong>{beer.ph}
              <br />
              <strong>Attenuation Level: </strong>{beer.attenuation_level}
            </div>
            <div>
              <strong>Target FG: </strong>{beer.target_fg}
              <br />
              <strong>Target OG: </strong>{beer.target_og}
            </div>
            <div>
              <strong>Volume: </strong>{beer.volume.value} {beer.volume.unit}
              <br />
              <strong>Boil Volume: </strong>{beer.boil_volume.value} {beer.boil_volume.unit}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;