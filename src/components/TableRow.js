import React from 'react';

const TableRow = ({ beer, expanded, toggleDetails }) => {
  return (
    <>
      <tr className={`table-row ${expanded ? "open" : ""}`} onClick={() => toggleDetails(beer.id)}>
        <td>{beer.name}</td>
        <td>{beer.first_brewed}</td>
        <td className='hideOnMobile'><button>Rating</button></td>
        <td className='hideOnMobile'><button>1 Comment</button></td>
        <td><button>Showcase</button></td>
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