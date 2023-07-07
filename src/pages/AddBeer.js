import React, { useContext, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";

import { AppContext } from '../context/AppContext';

import PlaceholderImage from '../assets/placeholder_image.png'

import './AddBeer.scss';

const AddBeer = () => {
  const context = useContext(AppContext);

  const [selectedImage, setSelectedImage] = useState(null);

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
    const newBeer = { ...beer, id: newBeerId, food_pairing: foodPairingsStringArray, comments: commentsStringArray, image_url: selectedImage };

    context.addBeer(newBeer)
  };

  const handleImageUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(file);
    };
    fileInput.click();
  };

  const ShowcaseFields = () => {
    return (
      <div className='showcase form'>
        <div className='wrapper-image-rating'>
          <div className='beerImage'>
            {selectedImage ? (
              <>
              <img src={URL.createObjectURL(selectedImage)} alt="a beer bottle or beer keg" />
              <button type="button" className="upload-button" onClick={handleImageUpload}>
                Change Image
              </button>
              </>
            ) : (
              <>
              <img src={PlaceholderImage} alt="a beer with a question mark on the label, indicating the need to upload a beer image" />
              <button type="button" className="upload-button" onClick={handleImageUpload}>
                Upload Image
              </button>
              </>
            )}
          </div>
          <div className='star-rating'>
            ✪✪✪✪✪
          </div>
        </div>

        <div className='wrapper-details'>
          <div className='subject-foodPairings'>
            <div className='subject'>
              <h2>Subject</h2>
              <div className='flex-container'>
                <label htmlFor="formName">
                  Name <input id="formName" {...register("name", { required: true })} />
                </label>
                {errors.name && <span>This field is required</span>}
                <label htmlFor="formTagline">
                  Tagline
                  <textarea id="formTagline"
                    {...register("tagline")} rows={1} onInput={(e) => {
                      e.target.rows = 1;
                      e.target.rows = Math.ceil(e.target.scrollHeight / 20);
                    }}
                  />
                </label>
                <label htmlFor="formFirstBrewed">
                  First brew
                  <input placeholder="Month / Year (MM/YYYY)" id="formFirstBrewed" {...register("first_brewed")} />
                </label>
              </div>
            </div>
            <div className='foodPairings'>
              <h2>Food pairing</h2>
              <div className='flex-container'>
                {foodPairings.map((field, index) => (
                  <>
                    <div className='foodPairing' key={field.id}>
                      <input {...register(`food_pairing.${index}.value`, { required: true })} />
                      <button className='removeButton' type="button" onClick={() => removeFoodPairing(index)}>-</button>
                    </div>
                    {errors.food_pairing && errors.food_pairing[index] && ( // TODO: This is placed oddly
                      <span>Can't add empty food pairing</span>
                    )}
                  </>
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
                  <>
                    <div className='comment' key={field.id}>
                      <input
                        {...register(`comment.${index}.value`, { required: true })}
                        defaultValue={field.value}
                      />
                      <button className='removeButton' type="button" onClick={() => removeComment(index)}>
                        -
                      </button>
                    </div>
                    {errors.comment && errors.comment[index] && ( // TODO: This is placed oddly
                      <span className='errorText'>Can't add empty comment</span>
                    )}
                  </>
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
              <div className='flex-container'>
                <table>
                  <thead>
                    <tr>
                      <th>Mash temperature</th>
                      <th>Unit</th>
                      <th>Duration</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mash_temps.map((field, index) => (
                      <React.Fragment key={field.id}>
                        <tr>
                          <td><input {...register(`method.mash_temp.${index}.temp.value`, { required: true })} /></td>
                          <td>
                            <select defaultValue="celsius" {...register(`method.mash_temp.${index}.temp.unit`)} >
                              <option value="celsius">°C</option>
                              <option value="fahrenheit">°F</option>
                            </select>
                          </td>
                          <td>
                            <input {...register(`method.mash_temp.${index}.duration`, { required: true })} />
                          </td>
                          <td>
                            <button className='removeButton' type="button" onClick={() => removeMashTemp(index)}>
                              -
                            </button>
                          </td>
                        </tr>
                        {errors.method?.mash_temp?.[index] && (
                          <tr>
                            <td colSpan={4} className='errorMessage'>
                              <span className='errorText'>Fill out all fields or remove</span>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                    <tr>
                      <td colSpan={4}>
                        <button type="button" onClick={() => appendMashTemp({ temp: { value: "", unit: "celsius" }, duration: "" })}>
                          Add Mash Temp
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='fermentation-temperature'>
                  <label>Fermentation temperature</label>
                  <input id="formFermentationTemperature" className='fermentation-info' {...register(`method.fermentation.temp.value`)} />
                  <select defaultValue="celsius" {...register("method.fermentation.temp.unit")}>
                    <option value="celsius">°C</option>
                    <option value="fahrenheit">°F</option>
                  </select>
                </div>
                <label htmlFor="formTwist">
                  Twist
                  <textarea id="formTwist" className='twist-info'
                    {...register(`method.twist`)} rows={1} onInput={(e) => {
                      e.target.rows = 1;
                      e.target.rows = Math.ceil(e.target.scrollHeight / 20);
                    }} />
                </label>
              </div>
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
                        <input id="formVolume" {...register(`volume.value`)} />
                        <select {...register(`volume.unit`)}>
                          <option value="liters">L</option>
                          <option value="decilitre">dl</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="formBoilVolume">Boil Volume:</label>
                        <input id="formBoilVolume" {...register(`boil_volume.value`)} />
                        <select {...register(`boil_volume.unit`)}>
                          <option value="liters">L</option>
                          <option value="decilitre">dl</option>
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
              <table className='hops-table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Add</th>
                    <th>Attribute</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {hops.map((field, index) => (
                    <React.Fragment key={field.id}>
                      <tr>
                        <td>
                          <input placeholder="Name" {...register(`ingredients.hops.${index}.name`)} />
                        </td>
                        <td>
                          <input placeholder="Amount" {...register(`ingredients.hops.${index}.amount.value`)} />
                        </td>
                        <td>
                          <select placeholder="Add" {...register(`ingredients.hops.${index}.add`)}>
                            <option value="Start">Start</option>
                            <option value="Middle">Middle</option>
                            <option value="End">End</option>
                            <option value="Dry hop">Dry hop</option>
                          </select>
                        </td>
                        <td>
                          <select placeholder="Attribute" {...register(`ingredients.hops.${index}.attribute`)}>
                            <option value="Bitter">Bitter</option>
                            <option value="Flavour">Flavour</option>
                            <option value="Aroma">Aroma</option>
                          </select>
                        </td>
                        <td>
                          <button className="removeButton" type="button" onClick={() => removeHop(index)}>-</button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                  <tr>
                    <td colSpan={6}>
                      <button type="button" onClick={() => appendHop({})}>Add Hop</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="malts">
              <h2>Malts</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Unit</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {malts.map((field, index) => (
                    <React.Fragment key={field.id}>
                      <tr>
                        <td>
                          <input placeholder="Name" {...register(`ingredients.malt.${index}.name`)} />
                        </td>
                        <td>
                          <input placeholder="Amount" {...register(`ingredients.malt.${index}.amount.value`)} />
                        </td>
                        <td>
                          <select {...register(`ingredients.malt.${index}.amount.unit`)}>
                            <option value="Kilograms">Kg</option>
                            <option value="Grams">G</option>
                          </select>
                        </td>
                        <td>
                          <button className='removeButton' type="button" onClick={() => removeMalt(index)}>-</button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                  <tr>
                    <td colSpan={4}>
                      <button type="button" onClick={() => appendMalt({})}>Add Malt</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        <input className="submitButton" type="submit" placeholder='test' />
        </div>
      </div>
    )
  }

  return (
    <form className="add-beer" onSubmit={handleSubmit(onSubmit)}>
      <ShowcaseFields />
      
    </form>
  );
};

export default AddBeer;
