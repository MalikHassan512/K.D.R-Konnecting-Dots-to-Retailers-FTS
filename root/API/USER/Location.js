import axios from 'axios';
const API_KEY = 'AIzaSyAu1gwHCSzLG9ACacQqLk-LG8oJMkarNF0'; 
const fetchAddressData=async(Latitude,Longitude)=>{
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${Latitude},${Longitude}&key=${API_KEY}`;
const locationData = {
    address: "",
    city: "",
    state: "",
    country: "",
    post_code: "",
  };
return fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Parse the response to get location data
    const result = data.results[0]; 
    const addressComponents = result.address_components;
        locationData.address = result.formatted_address;
    addressComponents.forEach((component) => {
        if (component.types.includes('locality')) {
          locationData.city = component.long_name;
        } else if (component.types.includes('administrative_area_level_1')) {
          locationData.state = component.long_name;
        } else if (component.types.includes('country')) {
          locationData.country = component.long_name;
        } else if (component.types.includes('postal_code')) {
          locationData.post_code = component.long_name;
        }
      });
  
    return locationData
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
const getRelatedAddresses = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching related addresses: ${response.statusText}`);
    }

    const data = await response.json();
    return data.predictions;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getCitiesLocation = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching related addresses: ${response.statusText}`);
    }

    const data = await response.json();

    // Filter predictions to include only cities
    const cityPredictions = data.predictions.filter(prediction => {
      // Check if the prediction contains "locality" in its types
      return prediction.types.includes('locality');
    });

    return cityPredictions;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getPlaceDetails = async (placeId) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching place details: ${response.statusText}`);
    }

    const data = await response.json();
    // The data variable now contains detailed information about the place, including coordinates.
    // You can access the coordinates like this:
    const location = data.result.geometry.location;
    const latitude = location.lat;
    const longitude = location.lng;

    return {
      latitude,
      longitude,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};


export {fetchAddressData,getRelatedAddresses,getCitiesLocation,getPlaceDetails}