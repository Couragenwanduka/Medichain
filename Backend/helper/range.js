export const increaseDistance=(latitude, longitude, distanceInKm)=>{
    // Convert latitude and longitude to meters
    const latInMeters = latitude * 111000; // Approx. 111 kilometers per degree of latitude
    const longInMeters = longitude * (111000 * Math.cos(latitude * Math.PI / 180)); // Approx. 111 km at equator, decreases as you move towards poles

    // Calculate distance in meters
    const distanceInMeters = distanceInKm * 1000;

    // Calculate new latitude and longitude in meters
    const newLatInMeters = latInMeters + (distanceInMeters / 111000); // 1 degree of latitude is approx. 111km
    const newLongInMeters = longInMeters + (distanceInMeters / (111000 * Math.cos(latitude * Math.PI / 180))); // Adjusted for longitude distance at given latitude

    // Convert meters back to latitude and longitude
    const newLatitude = newLatInMeters / 111000;
    const newLongitude = newLongInMeters / (111000 * Math.cos(latitude * Math.PI / 180));

    return { newLatitude, newLongitude };
}


