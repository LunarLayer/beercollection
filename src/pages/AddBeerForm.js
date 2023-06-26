import React, {useContext} from 'react';

import { useForm, useFieldArray } from "react-hook-form";

import { BeersContext } from '../context/BeersContext';

import './AddBeerForm.scss';

const AddBeerForm = () => {
  const context = useContext(BeersContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, // add control from useForm
  } = useForm();

  const { fields: foodPairings, append: appendFoodPairing, remove: removeFoodPairing } = useFieldArray({
    control,
    name: 'food_pairing',
  });

  const { fields: comments, append: appendComment, remove: removeComment } = useFieldArray({
    control,
    name: 'comment',
  });
  // const { fields: malts, append: appendMalt, remove: removeMalt } = useFieldArray({
  //   control,
  //   name: 'malts',
  // });

  const onSubmit = (beer) => {
    
    console.log('Submitted beer:', beer);

    const foodPairingsStringArray = beer.food_pairing.map((pairing) => pairing.value);
    const commentsStringArray = beer.comment.map((comment) => comment.value);

    // Create a new beer object with food_pairing as an array of strings
    const newBeer = { ...beer, food_pairing: foodPairingsStringArray, comments: commentsStringArray };

    console.log(newBeer.comments);

    context.addBeer(newBeer)
    // add an id based on beers.length
  };

  return (
    <>
    {/* <h2>Required fields: Name</h2> */}
    <form className="add-beer-form" onSubmit={handleSubmit(onSubmit)}>

      <label>Name</label>
      <input {...register("name", { required: true })} />
      {errors.name && <span>This field is required</span>}

      <label>Tagline</label>
      <input {...register("tagline")}  />

      <label>Food Pairing</label>
      {foodPairings.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`food_pairing.${index}.value`, { required: true })}
            defaultValue={field.value}
          />
          <button type="button" onClick={() => removeFoodPairing(index)}>
            Remove
          </button>
          {errors.food_pairing && errors.food_pairing[index] && ( // TODO: This is placed oddly
            <span>Can't add empty food pairing</span>
          )}
        </div>
      ))}
      <button type="button" onClick={() => appendFoodPairing({ value: '' })}>
        Add Food Pairing
      </button>

      <label>Description</label>
      <textarea 
          // ChatGPT --
        {...register("description")} rows={1} onInput={(e) => {
          e.target.rows = 1;
          e.target.rows = Math.ceil(e.target.scrollHeight / 20);
        }}
        // --
      />

      <label>Brewers tips</label>
      <input {...register("brewers_tips")}  />

      {/* <label>Comment</label>
      <input {...register("comment")}  /> */}

      <label>Comments</label>
      {comments.map((field, index) => (
        <div key={field.id}>
          {field.id}
          <input
            {...register(`comment.${index}.value`, { required: true })}
            defaultValue={field.value}
          />
          <button type="button" onClick={() => removeComment(index)}>
            Remove
          </button>
          {errors.comment && errors.comment[index] && ( // TODO: This is placed oddly
            <span>Can't add empty comment</span>
          )}
        </div>
      ))}
      <button type="button" onClick={() => appendComment({ value: '' })}>
        Add Comment
      </button>
      
      <input type="submit" />
    </form>
    </>
  );
};

export default AddBeerForm;



// import React, { useContext, useState } from 'react';
// import { BeersContext } from '../context/BeersContext';

// import './AddBeerForm.scss';

// const AddBeerForm = () => {
//   const context = useContext(BeersContext);

//   const [beerName, setBeerName] = useState('');
//   const [beerTagline, setBeerTagline] = useState('');
//   const [beerFirstBrewed, setBeerFirstBrewed] = useState('');
//   const [beerDescription, setBeerDescription] = useState('');
//   const [beerImageUrl, setBeerImageUrl] = useState('');
//   const [beerAbv, setBeerAbv] = useState(0);
//   const [beerIbu, setBeerIbu] = useState(0);
//   const [beerTargetFg, setBeerTargetFg] = useState(0);
//   const [beerTargetOg, setBeerTargetOg] = useState(0);
//   const [beerEbc, setBeerEbc] = useState(0);
//   const [beerSrm, setBeerSrm] = useState(0);
//   const [beerPh, setBeerPh] = useState(0);
//   const [beerAttenuationLevel, setBeerAttenuationLevel] = useState(0);
//   const [beerVolume, setBeerVolume] = useState({ value: 0, unit: '' });
//   const [beerBoilVolume, setBeerBoilVolume] = useState({ value: 0, unit: '' });
//   const [beerMashTemp, setBeerMashTemp] = useState([]);
//   const [beerFermentationTemp, setBeerFermentationTemp] = useState({ value: 0, unit: '' });
//   const [beerTwist, setBeerTwist] = useState('');
//   const [beerMalts, setBeerMalts] = useState([]);
//   const [beerHops, setBeerHops] = useState([]);
//   const [beerYeast, setBeerYeast] = useState('');
//   const [beerFoodPairings, setBeerFoodPairings] = useState([]);
//   const [beerBrewersTips, setBeerBrewersTips] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create a new beer object using the form data
//     const newBeer = {
//       name: beerName,
//       tagline: beerTagline,
//       first_brewed: beerFirstBrewed,
//       description: beerDescription,
//       image_url: beerImageUrl,
//       abv: beerAbv,
//       ibu: beerIbu,
//       target_fg: beerTargetFg,
//       target_og: beerTargetOg,
//       ebc: beerEbc,
//       srm: beerSrm,
//       ph: beerPh,
//       attenuation_level: beerAttenuationLevel,
//       volume: beerVolume,
//       boil_volume: beerBoilVolume,
//       method: {
//         mash_temp: beerMashTemp,
//         fermentation: { temp: beerFermentationTemp },
//         twist: beerTwist,
//       },
//       ingredients: {
//         malt: beerMalts,
//         hops: beerHops,
//         yeast: beerYeast,
//       },
//       food_pairing: beerFoodPairings,
//       brewers_tips: beerBrewersTips,
//     };

//     context.addBeer(newBeer);
//     // Add the new beer to the beers array in context
//     // const updatedBeers = [...beers, newBeer];
//     // // Update the beers array in context with the new beer
//     // setBeers(updatedBeers);
//   };

//   const handleFoodPairingChange = (index, value) => {
//     // Update the food pairings array with the new value
//     const updatedFoodPairings = [...beerFoodPairings];
//     updatedFoodPairings[index] = value;
//     setBeerFoodPairings(updatedFoodPairings);
//   };

//   const handleAddFoodPairing = () => {
//     // Add an empty string to the food pairings array
//     setBeerFoodPairings([...beerFoodPairings, '']);
//   };

//   const handleHopChange = (index, field, value) => {
//     // Update the hops array with the new value
//     const updatedHops = [...beerHops];
//     updatedHops[index][field] = value;
//     setBeerHops(updatedHops);
//   };

//   const handleAddHop = () => {
//     // Add an empty hop object to the hops array
//     setBeerHops([...beerHops, { name: '', amount: { value: 0, unit: '' }, add: '', attribute: '' }]);
//   };

//   const handleMaltChange = (index, field, value) => {
//     // Update the malts array with the new value
//     const updatedMalts = [...beerMalts];
//     updatedMalts[index][field] = value;
//     setBeerMalts(updatedMalts);
//   };

//   const handleAddMalt = () => {
//     // Add an empty malt object to the malts array
//     setBeerMalts([...beerMalts, { name: '', amount: { value: 0, unit: '' } }]);
//   };

//   const handleRemoveMashTemp = (index) => {
//     // Remove the mash temp at the specified index
//     const updatedMashTemp = [...beerMashTemp];
//     updatedMashTemp.splice(index, 1);
//     setBeerMashTemp(updatedMashTemp);
//   };
  
//   const handleAddMashTemp = () => {
//     // Add an empty mash temp object to the mash temp array
//     setBeerMashTemp([...beerMashTemp, { value: 0, unit: '' }]);
//   };
  
//   const handleRemoveMalt = (index) => {
//     // Remove the malt at the specified index
//     const updatedMalts = [...beerMalts];
//     updatedMalts.splice(index, 1);
//     setBeerMalts(updatedMalts);
//   };
  
//   const handleRemoveHop = (index) => {
//     // Remove the hop at the specified index
//     const updatedHops = [...beerHops];
//     updatedHops.splice(index, 1);
//     setBeerHops(updatedHops);
//   };
  
//   const handleRemoveFoodPairing = (index) => {
//     // Remove the food pairing at the specified index
//     const updatedFoodPairings = [...beerFoodPairings];
//     updatedFoodPairings.splice(index, 1);
//     setBeerFoodPairings(updatedFoodPairings);
//   };

//   const handleMashTempChange = (index, field, value) => {
//     // Update the mash temp array with the new value
//     const updatedMashTemp = [...beerMashTemp];
//     updatedMashTemp[index][field] = value;
//     setBeerMashTemp(updatedMashTemp);
//   };
  
//   const handleResetForm = () => {
//     // Reset all the form fields to their initial values
//     setBeerName('');
//     setBeerTagline('');
//     setBeerFirstBrewed('');
//     setBeerDescription('');
//     setBeerImageUrl('');
//     setBeerAbv(0);
//     setBeerIbu(0);
//     setBeerTargetFg(0);
//     setBeerTargetOg(0);
//     setBeerEbc(0);
//     setBeerSrm(0);
//     setBeerPh(0);
//     setBeerAttenuationLevel(0);
//     setBeerVolume({ value: 0, unit: '' });
//     setBeerBoilVolume({ value: 0, unit: '' });
//     setBeerMashTemp([]);
//     setBeerFermentationTemp({ value: 0, unit: '' });
//     setBeerTwist('');
//     setBeerMalts([]);
//     setBeerHops([]);
//     setBeerYeast('');
//     setBeerFoodPairings([]);
//     setBeerBrewersTips('');
//   };
  
  


//   return (
//     <form className='add-beer-form' onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input type="text" value={beerName} onChange={(e) => setBeerName(e.target.value)} />
//       </div>
//       <div>
//         <label>Tagline:</label>
//         <input type="text" value={beerTagline} onChange={(e) => setBeerTagline(e.target.value)} />
//       </div>
//       <div>
//         <label>First Brewed:</label>
//         <input type="text" value={beerFirstBrewed} onChange={(e) => setBeerFirstBrewed(e.target.value)} />
//       </div>
//       <div>
//         <label>Description:</label>
//         <textarea value={beerDescription} onChange={(e) => setBeerDescription(e.target.value)} />
//       </div>
//       <div>
//         <label>Image URL:</label>
//         <input type="text" value={beerImageUrl} onChange={(e) => setBeerImageUrl(e.target.value)} />
//       </div>
//       <div>
//         <label>ABV:</label>
//         <input type="number" value={beerAbv} onChange={(e) => setBeerAbv(parseFloat(e.target.value))} />
//       </div>
//       <div>
//         <label>IBU:</label>
//         <input type="number" value={beerIbu} onChange={(e) => setBeerIbu(parseInt(e.target.value))} />
//       </div>
//       <div>
//         <label>Target FG:</label>
//         <input type="number" value={beerTargetFg} onChange={(e) => setBeerTargetFg(parseInt(e.target.value))} />
//       </div>
//       <div>
//         <label>Target OG:</label>
//         <input type="number" value={beerTargetOg} onChange={(e) => setBeerTargetOg(parseInt(e.target.value))} />
//       </div>
//       <div>
//         <label>EBC:</label>
//         <input type="number" value={beerEbc} onChange={(e) => setBeerEbc(parseInt(e.target.value))} />
//       </div>
//       <div>
//         <label>SRM:</label>
//         <input type="number" value={beerSrm} onChange={(e) => setBeerSrm(parseInt(e.target.value))} />
//       </div>
//       <div>
//         <label>pH:</label>
//         <input type="number" step="0.1" value={beerPh} onChange={(e) => setBeerPh(parseFloat(e.target.value))} />
//       </div>
//       <div>
//         <label>Attenuation Level:</label>
//         <input
//           type="number"
//           step="0.01"
//           value={beerAttenuationLevel}
//           onChange={(e) => setBeerAttenuationLevel(parseFloat(e.target.value))}
//         />
//       </div>
//       <div>
//         <label>Volume:</label>
//         <input
//           type="number"
//           value={beerVolume.value}
//           onChange={(e) => setBeerVolume({ ...beerVolume, value: parseInt(e.target.value) })}
//         />
//         <input
//           type="text"
//           value={beerVolume.unit}
//           onChange={(e) => setBeerVolume({ ...beerVolume, unit: e.target.value })}
//         />
//       </div>
//       <div>
//         <label>Boil Volume:</label>
//         <input
//           type="number"
//           value={beerBoilVolume.value}
//           onChange={(e) => setBeerBoilVolume({ ...beerBoilVolume, value: parseInt(e.target.value) })}
//         />
//         <input
//           type="text"
//           value={beerBoilVolume.unit}
//           onChange={(e) => setBeerBoilVolume({ ...beerBoilVolume, unit: e.target.value })}
//         />
//       </div>
//       <div>
//         <label>Mash Temp:</label>
//         {beerMashTemp.map((temp, index) => (
//           <div key={index}>
//             <input
//               type="number"
//               placeholder="Temp"
//               value={temp.value}
//               onChange={(e) => handleMashTempChange(index, 'value', parseInt(e.target.value))}
//             />
//             <input
//               type="text"
//               placeholder="Unit"
//               value={temp.unit}
//               onChange={(e) => handleMashTempChange(index, 'unit', e.target.value)}
//             />
//             <button type="button" onClick={() => handleRemoveMashTemp(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddMashTemp}>
//           Add Mash Temp
//         </button>
//       </div>
//       <div>
//         <label>Fermentation Temp:</label>
//         <input
//           type="number"
//           value={beerFermentationTemp.value}
//           onChange={(e) => setBeerFermentationTemp({ ...beerFermentationTemp, value: parseInt(e.target.value) })}
//         />
//         <input
//           type="text"
//           value={beerFermentationTemp.unit}
//           onChange={(e) => setBeerFermentationTemp({ ...beerFermentationTemp, unit: e.target.value })}
//         />
//       </div>
//       <div>
//         <label>Twist:</label>
//         <input type="text" value={beerTwist} onChange={(e) => setBeerTwist(e.target.value)} />
//       </div>
//       <div>
//         <label>Malts:</label>
//         {beerMalts.map((malt, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               placeholder="Name"
//               value={malt.name}
//               onChange={(e) => handleMaltChange(index, 'name', e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={malt.amount.value}
//               onChange={(e) => handleMaltChange(index, 'amount', 'value', parseInt(e.target.value))}
//             />
//             <input
//               type="text"
//               placeholder="Unit"
//               value={malt.amount.unit}
//               onChange={(e) => handleMaltChange(index, 'amount', 'unit', e.target.value)}
//             />
//             <button type="button" onClick={() => handleRemoveMalt(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddMalt}>
//           Add Malt
//         </button>
//       </div>
//       <div>
//         <label>Hops:</label>
//         {beerHops.map((hop, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               placeholder="Name"
//               value={hop.name}
//               onChange={(e) => handleHopChange(index, 'name', e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               value={hop.amount.value}
//               onChange={(e) => handleHopChange(index, 'amount', 'value', parseInt(e.target.value))}
//             />
//             <input
//               type="text"
//               placeholder="Unit"
//               value={hop.amount.unit}
//               onChange={(e) => handleHopChange(index, 'amount', 'unit', e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Add"
//               value={hop.add}
//               onChange={(e) => handleHopChange(index, 'add', e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Attribute"
//               value={hop.attribute}
//               onChange={(e) => handleHopChange(index, 'attribute', e.target.value)}
//             />
//             <button type="button" onClick={() => handleRemoveHop(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddHop}>
//           Add Hop
//         </button>
//       </div>
//       <div>
//         <label>Yeast:</label>
//         <input type="text" value={beerYeast} onChange={(e) => setBeerYeast(e.target.value)} />
//       </div>
//       <div>
//         <label>Food Pairings:</label>
//         {beerFoodPairings.map((pairing, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               value={pairing}
//               onChange={(e) => handleFoodPairingChange(index, e.target.value)}
//             />
//             <button type="button" onClick={() => handleRemoveFoodPairing(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddFoodPairing}>
//           Add Food Pairing
//         </button>
//       </div>
//       <div>
//         <label>Brewers Tips:</label>
//         <input
//           type="text"
//           value={beerBrewersTips}
//           onChange={(e) => setBeerBrewersTips(e.target.value)}
//         />
//       </div>
//       <button type="submit">Add Beer</button>
//       <button type="button" onClick={handleResetForm}>
//         Reset Form
//       </button>
//     </form>
//   );
  
// };

// export default AddBeerForm;