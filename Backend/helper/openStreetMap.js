export const getAddressInfo= async(latitude, longitude)=>{
    const baseUrl = 'https://nominatim.openstreetmap.org/reverse';
    const format = 'json'; // You can also use 'xml'
    const params = new URLSearchParams({
        lat: latitude,
        lon: longitude,
        format: format,
        addressdetails: 1,
        zoom: 18 // Adjust the zoom level as needed
    });

    const url = `${baseUrl}?${params}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.address) {
            const streetNumber = data.address.house_number || '';
            const streetName = data.address.road || '';

            return { streetNumber, streetName };
        } else {
            throw new Error('No address found for the provided coordinates');
        }
    } catch (error) {
        throw new Error('Error fetching address information: ' + error.message);
    }
}