import axios from 'axios';

export const getAllBeers = async () => {
  try {
    const response = await axios.get('https://api.punkapi.com/v2/beers');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it at the component level if needed
  }
};