/**
 * Core utility to verify if the user's current location is in India.
 * Uses browser Geolocation API and reverse geocoding.
 */

// Bounding box approximate coordinates for India
// Latitude: ~8.4 N to ~37.6 N
// Longitude: ~68.7 E to ~97.25 E
export function isWithinIndiaBoundingBox(latitude, longitude) {
  return (
    latitude >= 8.4 &&
    latitude <= 37.6 &&
    longitude >= 68.7 &&
    longitude <= 97.25
  );
}

/**
 * Prompt user for geolocation and determine if they are in India.
 * Resolves to true if location is in India, false otherwise.
 * Rejects if permission is denied or an error occurs.
 */
export async function getIsIndianLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds timeout
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`User coordinates: Lat ${latitude}, Lon ${longitude}`);

        const fallbackResult = isWithinIndiaBoundingBox(latitude, longitude);

        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          if (!response.ok) {
            console.warn('Reverse geocoding API failed. Falling back to bounding box.');
            resolve(fallbackResult);
            return;
          }

          const data = await response.json();
          if (data && data.countryCode) {
            const isIndia = data.countryCode.toUpperCase() === 'IN';
            console.log(`Detected country code: ${data.countryCode} (Is India: ${isIndia})`);
            resolve(isIndia);
          } else {
            console.warn('Country code not found in response. Falling back to bounding box.');
            resolve(fallbackResult);
          }
        } catch (err) {
          console.error('Reverse geocoding fetch error. Falling back to bounding box:', err);
          resolve(fallbackResult);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMsg = 'Could not retrieve your location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = 'Location permission is required to sign in. Please allow location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = 'Location information is currently unavailable. Please ensure your device location is turned on.';
            break;
          case error.TIMEOUT:
            errorMsg = 'Location request timed out. Please try signing in again.';
            break;
        }
        reject(new Error(errorMsg));
      },
      options
    );
  });
}
