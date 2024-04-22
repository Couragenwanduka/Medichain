import axios from 'axios';
export const reverseGeocodeWithOpenCage= async(latitude, longitude)=>{
    try {
        latitude="9° 03' 5.00"
        longitude="7° 29' 40.99"
        // Make a GET request to the OpenCage Geocoding API for reverse geocoding
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=cb3db393783a4ebeabe39068d1edb0fd`);

        // Extract address components from the response
        console.log(response);
        const { results } = response.data;
        if (results.length > 0) {
            const { components } = results[0];
            return components;
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}