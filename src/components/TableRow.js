import React from 'react';

const TableRow = ({ beer, expanded, toggleDetails }) => {
  return (
    <>
      <tr className={`table-row ${expanded ? "open" : ""}`} onClick={() => toggleDetails(beer.id)}>
        <td>{beer.name}</td>
        <td>{beer.first_brewed}</td>
        <td><button>Rating</button></td>
        <td><button>1 Comment</button></td>
        <td><button>Showcase</button></td>
      </tr>
      <tr className="collapsible-table-row">
        <td colSpan={5} onClick={() => toggleDetails(beer.id)}>
          <div className='flex-container'>
            <div>
              ABV: {beer.abv}
              <br />
              IBU: {beer.ibu}
            </div>
            <div>
              EBC: {beer.ebc}
              <br />
              SRM: {beer.srm}
            </div>
            <div>
              pH: {beer.ph}
              <br />
              Attenuation level: {beer.attenuation_level}
            </div>
            <div>
              Target fg: {beer.target_fg}
              <br />
              Target og: {beer.target_og}
            </div>
            <div>
              Volume: {beer.volume.value} {beer.volume.unit}
              <br />
              Boil volume: {beer.boil_volume.value} {beer.boil_volume.unit}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;