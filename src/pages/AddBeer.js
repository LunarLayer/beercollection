import React, { useContext } from 'react';
import { useForm, useFieldArray } from "react-hook-form";

import { AppContext } from '../context/AppContext';

import placeholder_image from '../assets/placeholder_image.png'

import './AddBeer.scss';

const AddBeer = () => {
  const context = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { fields: foodPairings, append: appendFoodPairing, remove: removeFoodPairing } = useFieldArray({
    control,
    name: 'food_pairing',
  });

  const { fields: comments, append: appendComment, remove: removeComment } = useFieldArray({
    control,
    name: 'comment',
  });

  const { fields: mash_temps, append: appendMashTemp, remove: removeMashTemp } = useFieldArray({
    control,
    name: "method.mash_temp",
  });

  const { fields: hops, append: appendHop, remove: removeHop } = useFieldArray({
    control,
    name: "ingredients.hops",
  });

  const { fields: malts, append: appendMalt, remove: removeMalt } = useFieldArray({
    control,
    name: "ingredients.malt",
  });

  const onSubmit = (beer) => {
    const newBeerId = context.beers.length + 1;
    const foodPairingsStringArray = beer.food_pairing.map((pairing) => pairing.value);
    const commentsStringArray = beer.comment.map((comment) => comment.value);
    const newBeer = { ...beer, id: newBeerId, food_pairing: foodPairingsStringArray, comments: commentsStringArray };

    context.addBeer(newBeer)
  };

  const ShowcaseFields = () => {
    return (
      <div className='showcase form'>
        <div className='wrapper-image-rating'>
          <div className='beerImage'>
            <img src={placeholder_image} alt="a beer" />
          </div>
          <div className='star-rating'>
            ✪✪✪✪✪
          </div>
        </div>

        <div className='wrapper-details'>
          <div className='subject-foodPairings'>
            <div className='subject'>
              <h2>Subject</h2>
              <label htmlFor="formName">Name</label>
              <input id="formName" {...register("name", { required: true })} />
              {errors.name && <span>This field is required</span>}
              <label htmlFor="formTagline">Tagline</label>
              <textarea id="formTagline"
                {...register("tagline")} rows={1} onInput={(e) => {
                  e.target.rows = 1;
                  e.target.rows = Math.ceil(e.target.scrollHeight / 20);
                }}
              />
              <label htmlFor="formFirstBrewed">First brewed (MM/YYYY)</label>
              <input id="formFirstBrewed" {...register("first_brewed")} />
            </div>
            <div className='foodPairings'>
              <h2>Food pairing</h2>
              <div className='flex-container'>
                {foodPairings.map((field, index) => (
                  <div className='foodPairing' key={field.id}>
                    <input {...register(`food_pairing.${index}.value`, { required: true })} />
                    <button type="button" onClick={() => removeFoodPairing(index)}>Remove</button>
                    {errors.food_pairing && errors.food_pairing[index] && ( // TODO: This is placed oddly
                      <span>Can't add empty food pairing</span>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => appendFoodPairing({ value: '' })}>
                  Add Food Pairing
                </button>
              </div>
            </div>
          </div>

          <div className='description'>
            <h2>Description</h2>
            <textarea placeholder="Description"
              {...register("description")} rows={1} onInput={(e) => {
                e.target.rows = 1;
                e.target.rows = Math.ceil(e.target.scrollHeight / 20);
              }}
            />
          </div>

          <div className='brewersTip-comments'>
            <div className='brewersTip'>
              <h2>Brewers tip</h2>
              <textarea
                {...register("brewers_tips")} rows={1} onInput={(e) => {
                  e.target.rows = 1;
                  e.target.rows = Math.ceil(e.target.scrollHeight / 20);
                }} />
            </div>
            <div className='comments'>
              <h2>Comments</h2>
              <div className='flex-container'>
                {comments.map((field, index) => (
                  <div className='comment' key={field.id}>
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
              </div>
            </div>
          </div>

          <div className='method-amount'>
            <div className='method'>
              <h2>Method</h2>
              {mash_temps.map((field, index) => (
                <div key={field.id} className='mash-entry'>
                  <div className='mash-temperature'>
                    <input placeholder="Mash temperature" {...register(`method.mash_temp.${index}.temp.value`, { required: true })} />
                    <select defaultValue="celsius" {...register(`method.mash_temp.${index}.temp.unit`)} >
                      <option value="celsius">°C</option>
                      <option value="fahrenheit">°F</option>
                    </select>
                  </div>
                  <input placeholder="Duration" {...register(`method.mash_temp.${index}.duration`, { required: true })} />
                  <button type="button" onClick={() => removeMashTemp(index)}>
                    Remove
                  </button>
                  {errors.method?.mash_temp?.[index] && (
                    <span className='errorMessage'>Fill out all fields or remove</span>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => appendMashTemp({ temp: { value: "", unit: "celsius" }, duration: "" })}>
                Add Mash Temp
              </button>
              <div className='fermentation-temperature'>
                <label htmlFor="formFermentationTemperature">Fermentation temperature</label>
                <div className='flex-container'>
                  <input id="formFermentationTemperature" className='fermentation-info' {...register(`method.fermentation.temp.value`)} />
                  <select defaultValue="celsius" {...register("method.fermentation.temp.unit")}>
                    <option value="celsius">°C</option>
                    <option value="fahrenheit">°F</option>
                  </select>
                </div>
              </div>
              <label htmlFor="formTwist">Twist</label>
              <textarea id="formTwist" className='twist-info'
                {...register(`method.twist`)} rows={1} onInput={(e) => {
                  e.target.rows = 1;
                  e.target.rows = Math.ceil(e.target.scrollHeight / 20);
                }} />
            </div>
            <div className='amount'>
              <h2>Amount</h2>
              <div className='flex-container'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="formABV">ABV:</label>
                        <input id="formABV" {...register(`abv`)} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="formIBU">IBU:</label>
                        <input id="formIBU" {...register(`ibu`)} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="formEBC">EBC:</label>
                        <input id="formEBC" {...register(`ebc`)} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="formSRM">SRM:</label>
                        <input id="formSRM" {...register(`srm`)} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="formPH">pH:</label>
                        <input id="formPH" {...register(`ph`)} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="formTargetFG">Target FG:</label>
                        <input id="formTargetFG" {...register(`target_fg`)} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="formTargetOG">Target OG:</label>
                        <input id="formTargetOG" {...register(`target_og`)} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="formVolume">Volume:</label>
                        <div className='formVolumeWrapper'>
                          <input id="formVolume" {...register(`volume.value`)} />
                          <select {...register(`volume.unit`)}>
                            <option value="liters">Litres</option>
                            <option value="decilitre">Decilitres</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="formBoilVolume">Boil Volume:</label>
                          <input id="formBoilVolume" {...register(`boil_volume.value`)} />
                          <select {...register(`boil_volume.unit`)}>
                            <option value="liters">Litres</option>
                            <option value="decilitre">Decilitres</option>
                          </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="formAttenuationLevel">Attenuation level:</label>
                        <input id="formAttenuationLevel" {...register(`attenuation_level`)} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='hops-malts'>
            <div className='hops'>
              <h2>Hops</h2>
              {hops.map((field, index) => (
                <div className="hops-entry" key={field.id}>
                  <input placeholder="Name" {...register(`ingredients.hops.${index}.name`)} />
                  <input placeholder="Amount" {...register(`ingredients.hops.${index}.amount.value`)} />
                  <select {...register(`ingredients.hops.${index}.amount.unit`)}>
                    <option value="Kilograms">Kilograms</option>
                    <option value="Grams">Grams</option>
                  </select>
                  <select placeholder="Add" {...register(`ingredients.hops.${index}.add`)}>
                    <option value="Start">Start</option>
                    <option value="Middle">Middle</option>
                    <option value="End">End</option>
                    <option value="Dry hop">Dry hop</option>
                  </select>
                  <select placeholder="Attribute" {...register(`ingredients.hops.${index}.attribute`)}>
                    <option value="Bitter">Bitter</option>
                    <option value="Flavour">Flavour</option>
                    <option value="Aroma">Aroma</option>
                  </select>
                  <button type="button" onClick={() => removeHop(index)}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => appendHop({})}>Add Hop</button>
            </div>

            <div className="malts">
              <h2>Malts</h2>
              {malts.map((field, index) => (
                <div className="malts-entry" key={field.id}>
                  <input placeholder="Name" {...register(`ingredients.malt.${index}.name`)} />
                  <input placeholder="Amount" {...register(`ingredients.malt.${index}.amount.value`)} />
                  <select {...register(`ingredients.malt.${index}.amount.unit`)}>
                    <option value="Kilograms">Kilograms</option>
                    <option value="Grams">Grams</option>
                  </select>
                  <button type="button" onClick={() => removeMalt(index)}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => appendMalt({})}>Add Malt</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className="add-beer" onSubmit={handleSubmit(onSubmit)}>
      <ShowcaseFields />
      <input className="submitButton" type="submit" />
    </form>
  );
};

export default AddBeer;
